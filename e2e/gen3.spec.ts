import { test, expect } from '@playwright/test';

test('Gen 3 uses historical types, restricts the pool, applies recommendations and preserves saves', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/games/gen-3');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Gen 3 Pokémon Team Builder');
  await page.getByRole('button', {name: 'Add Pokémon to slot 1', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Filter Fairy', exact: true})).toHaveCount(0);
  await page.getByRole('searchbox').fill('garchomp');
  await expect(page.getByRole('button', {name: 'Choose Garchomp', exact: true})).toHaveCount(0);
  await page.getByRole('searchbox').fill('gardevoir');
  await expect(page.getByRole('button', {name: 'Choose Gardevoir', exact: true}).locator('.type-badge')).toHaveText(['Psychic']);
  await page.getByRole('button', {name: 'Choose Gardevoir', exact: true}).click();
  await expect(page.getByTestId('slot-0').locator('.type-badge')).toHaveText(['Psychic']);
  await page.getByText('Detailed type analysis · all 17 types', {exact: true}).click();
  await expect(page.locator('.detail-panel tbody tr')).toHaveCount(17);
  const suggestion = page.getByTestId('recommendation').first();
  const expectedScore = await suggestion.getAttribute('data-new-score');
  await suggestion.getByRole('button').click();
  await expect(page.getByTestId('team-score')).toHaveText(`${expectedScore}/ 100`);
  await page.locator('.saved-teams > summary').click();
  await page.getByRole('textbox', {name: 'Team name'}).fill('Gen 3 test');
  await page.getByRole('button', {name: 'Save current team', exact: true}).click();
  await page.getByRole('button', {name: 'Clear team', exact: true}).click();
  await page.reload();
  await page.locator('.saved-teams > summary').click();
  await page.getByRole('button', {name: 'Load Gen 3 test', exact: true}).click();
  await expect(page.getByTestId('slot-0').locator('.type-badge')).toHaveText(['Psychic']);
  await expect(page.locator('.format-settings > summary')).toContainText('Gen 3');
  expect(new URL(page.url()).search).toBe('');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('switching generations keeps valid members, updates types and removes later species', async ({ page }) => {
  await page.goto('/?team=gardevoir,garchomp');
  await expect(page.getByTestId('slot-1').getByRole('heading')).toHaveText('Garchomp');
  await page.locator('.format-settings > summary').click();
  await page.getByRole('combobox', {name: 'Game', exact: true}).selectOption('3');
  await expect(page.getByTestId('slot-0').locator('.type-badge')).toHaveText(['Psychic']);
  await expect(page.getByRole('button', {name: 'Add Pokémon to slot 2', exact: true})).toBeVisible();
  await page.getByRole('combobox', {name: 'Game', exact: true}).selectOption('9');
  await expect(page.getByTestId('slot-0').locator('.type-badge')).toHaveText(['Psychic', 'Fairy']);
});

test('desktop Gen 3 roster and score fit above the fold', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.setViewportSize({width: 1366, height: 768});
  await page.goto('/games/gen-3');
  await page.getByRole('button', {name: 'Try example', exact: true}).click();
  const roster = (await page.locator('.team-grid').boundingBox())!;
  const score = (await page.locator('.builder > .analysis').boundingBox())!;
  expect(roster.y).toBeGreaterThan(0);
  expect(roster.y + roster.height).toBeLessThanOrEqual(768);
  expect(score.y + score.height).toBeLessThanOrEqual(768);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
