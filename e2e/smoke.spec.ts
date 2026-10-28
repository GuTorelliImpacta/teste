import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('CTAs de WhatsApp abrem com a mensagem certa', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#hero').getByRole('link', { name: 'Pedir orçamento' })
  const href = (await hero.getAttribute('href')) ?? ''
  const url = new URL(href)
  expect(url.origin + url.pathname).toBe('https://wa.me/5511946221978')
  expect(url.searchParams.get('text')).toBe(
    'Olá! Vim pelo site da Damadi e gostaria de um orçamento.',
  )
  expect(await hero.getAttribute('rel')).toContain('noopener')
})

test('Ligar e Como chegar', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Ligar' }).first()).toHaveAttribute(
    'href',
    'tel:+5511946221978',
  )
  await expect(page.getByRole('link', { name: 'Como chegar' })).toHaveAttribute(
    'href',
    /google\.com\/maps/,
  )
})

test('página de ambiente com mensagem do ambiente e navegação sem recarregar', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => ((window as unknown as { marca: number }).marca = 1))
  await page.getByRole('link', { name: 'Cozinha' }).first().click()
  await expect(page).toHaveURL(/\/portfolio\/cozinha\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Cozinha planejada')
  expect(await page.evaluate(() => (window as unknown as { marca?: number }).marca)).toBe(1)
  const href = await page
    .getByRole('link', { name: /Pedir orçamento de cozinha/ })
    .getAttribute('href')
  expect(new URL(href ?? '').searchParams.get('text')).toContain('orçamento de Cozinha')
})

test('barra fixa aparece depois do hero no mobile', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('region', { name: 'Contato rápido' })).toHaveCount(0)
  await page.evaluate(() => window.scrollTo(0, 1200))
  await expect(page.getByRole('region', { name: 'Contato rápido' })).toBeVisible()
})

for (const caminho of ['/', '/portfolio/cozinha/', '/sobre/', '/privacidade/']) {
  test(`axe sem violações sérias em ${caminho}`, async ({ page }) => {
    await page.goto(caminho)
    await page.evaluate(() => document.documentElement.classList.remove('reveal-ready'))
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(graves.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([])
  })
}
