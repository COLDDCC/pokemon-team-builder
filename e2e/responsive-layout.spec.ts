import { test, expect } from '@playwright/test';

test('ad columns and revised team layout remain usable across screen sizes', async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1366, 1920]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Try example', exact: true }).click();
    await expect(page.getByTestId('slot-5').getByRole('heading')).toHaveText('Dragonite');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const rails = page.locator('.ad-rail');
    if (width >= 1280) {
      await expect(rails.first()).toBeVisible();
      expect((await rails.first().boundingBox())!.width).toBe(width >= 1800 ? 300 : 160);
      const roster = (await page.locator('.team-grid').boundingBox())!;
      expect((await page.locator('.builder > .analysis').boundingBox())!.y).toBeGreaterThanOrEqual(roster.y + roster.height);
    } else await expect(rails.first()).toBeHidden();
    await page.getByRole('button', { name: 'Share team', exact: false }).click();
    await expect(page.getByLabel('Your team link')).toHaveValue(/team=/);
    await page.getByText('Detailed type analysis · all 18 types', { exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Replace Pikachu', exact: true }).click();
    await page.getByRole('searchbox').fill('Lucario');
    await expect(page.getByRole('button', { name: 'Done · 6/6' })).toBeVisible();
    const done = (await page.getByRole('button', { name: 'Done · 6/6' }).boundingBox())!;
    expect(done.y + done.height).toBeLessThanOrEqual(844);
    await page.getByRole('button', { name: 'Choose Lucario', exact: true }).click();
    await expect(page.getByTestId('slot-0').getByRole('heading')).toHaveText('Lucario');
    await page.getByRole('button', { name: 'Remove Lucario', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Add Pokémon to slot 1', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Clear team', exact: true }).click();
    await expect(page.getByTestId('team-score')).toHaveText('0/ 100');
  }
  expect(errors).toEqual([]);
});
