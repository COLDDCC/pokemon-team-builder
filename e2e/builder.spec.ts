import { featuredPokemonIds } from '../src/config/seo-pages';
import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
test('edit six slots, prevent duplicates, replace, remove and restore a shared team', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const names = ['Pikachu', 'Charizard', 'Venusaur', 'Blastoise', 'Gengar', 'Dragonite'];
  for (const [index, name] of names.entries()) {
    await page.getByRole('button', { name: `Add Pokémon to slot ${index + 1}`, exact: true }).click();
    await page.getByRole('searchbox').fill(name);
    await page.getByRole('button', { name: `Choose ${name}`, exact: true }).click();
    await expect(page.getByTestId(`slot-${index}`).getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await page.getByRole('button', { name: 'Replace Charizard', exact: true }).click();
  await page.getByRole('searchbox').fill('Pikachu');
  await expect(page.getByRole('button', { name: 'Pikachu, already in team', exact: true })).toBeDisabled();
  await page.getByRole('searchbox').fill('Garchomp');
  await page.getByRole('button', { name: 'Choose Garchomp', exact: true }).click();
  await page.getByRole('button', { name: 'Remove Venusaur', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Add Pokémon to slot 3', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Share team', exact: false }).click();
  const link = await page.getByRole('textbox', { name: 'Your team link' }).inputValue();
  const other = await context.newPage();
  await other.goto(link);
  await expect(other.getByTestId('slot-0').getByRole('heading', { name: 'Pikachu', exact: true })).toBeVisible();
  await expect(other.getByTestId('slot-1').getByRole('heading', { name: 'Garchomp', exact: true })).toBeVisible();
  await expect(other.getByRole('button', { name: 'Add Pokémon to slot 3', exact: true })).toBeVisible();
  await expect(other.getByTestId('slot-5').getByRole('heading', { name: 'Dragonite', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Clear team', exact: true }).click();
  await expect(page.getByRole('button', { name: /Add Pokémon to slot/ })).toHaveCount(6);
  expect(errors).toEqual([]);
});
test('search and filters work with keyboard dialog dismissal and no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const add = page.getByRole('button', { name: 'Add Pokémon to slot 1', exact: true });
  await expect(add).toBeEnabled();
  await add.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('searchbox')).toBeFocused();
  await page.getByRole('searchbox').fill('#025');
  await expect(page.getByRole('button', { name: 'Choose Pikachu', exact: true })).toBeVisible();
  await page.getByRole('searchbox').fill('');
  await page.getByRole('button', {name:'Filters',exact:true}).click();
  await page.getByRole('button', {name:'Filter Fire',exact:true}).click();
  await page.getByLabel('Generation', { exact: true }).selectOption('1');
  await expect(page.getByRole('button', { name: 'Choose Charmander', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Choose Pikachu', exact: true })).toHaveCount(0);
  await page.getByRole('searchbox').fill('zzzzzz');
  await expect(page.getByText('No Pokémon match these filters.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(add).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
test('malformed links repair safely and blocked clipboard has a manual fallback', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('blocked')) }, configurable: true }));
  await page.goto('/?v=1&format=unknown&team=pikachu,pikachu,nope');
  await expect(page.getByText('Some invalid or duplicate entries in this link were removed.', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pikachu', exact: true })).toHaveCount(1);
  await page.getByRole('button', { name: 'Share team', exact: false }).click();
  await expect(page.getByText('Copy the team link below to share your team.', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your team link' })).toHaveValue(/team=pikachu/);
});
test('analysis updates live and exposes the damage matrix and methodology', async ({ page }) => {
  await page.goto('/?v=1&team=charizard,moltres,hooh');
  await page.getByText('Key insights', {exact:true}).click();
  await expect(page.getByText('Rock attacks threaten 3 of 3 teammates, with no teammate resisting them by type.', { exact: true })).toBeVisible();
  const before = Number(await page.getByTestId('score-defense').textContent());
  await page.getByRole('button', { name: 'Add Pokémon to slot 4', exact: true }).click();
  await page.getByRole('searchbox').fill('Excadrill');
  await page.getByRole('button', { name: 'Choose Excadrill', exact: true }).click();
  await expect.poll(async () => Number(await page.getByTestId('score-defense').textContent())).toBeGreaterThan(before);
  await page.getByText('Detailed type analysis · all 18 types', { exact: true }).click();
  const rock = page.getByRole('row').filter({ has: page.getByRole('rowheader', { name: 'Rock', exact: true }) });
  await expect(rock.getByRole('cell', { name: '4×', exact: true })).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByText('How is the score calculated?', { exact: true }).click();
  await expect(page.getByText('Small teams are provisional', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Clear team', exact: true }).click();
  await expect(page.getByTestId('team-score')).toHaveText('0/ 100');
});
test('recommendations apply the displayed score and target an explicit replacement slot', async ({ page }) => {
  await page.goto('/?v=1&team=charizard,moltres,hooh');
  await expect(page.getByLabel('Slot to optimize', { exact: true })).toHaveValue('auto');
  const first = page.getByTestId('recommendation').first();
  await expect(first).toBeVisible();
  const addedId = await first.getAttribute('data-pokemon');
  const expected = await first.getAttribute('data-new-score');
  await first.getByRole('button').click();
  await expect(page.getByTestId('team-score')).toHaveText(`${expected}/ 100`);
  expect(new URL(page.url()).searchParams.get('team')?.split(',')[3]).toBe(addedId);
  await page.getByLabel('Slot to optimize', { exact: true }).selectOption('0');
  await expect(page.getByText('Replacing Charizard in slot 1.', { exact: false })).toBeVisible();
  const replacement = page.getByTestId('recommendation').first();
  const replacementId = await replacement.getAttribute('data-pokemon');
  const replacementScore = await replacement.getAttribute('data-new-score');
  await replacement.getByRole('button').click();
  await expect(page.getByTestId('team-score')).toHaveText(`${replacementScore}/ 100`);
  const ids = new URL(page.url()).searchParams.get('team')?.split(',');
  expect(ids?.[0]).toBe(replacementId); expect(ids?.[1]).toBe('moltres'); expect(ids?.[3]).toBe(addedId);
});
test('SEO routes prefill their Pokémon, honor explicit share state and expose metadata', async ({ page, request }) => {
  await page.goto('/pokemon/garchomp/best-teammates');
  await expect(page.getByTestId('slot-0').getByRole('heading', { name: 'Garchomp', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Garchomp Teammate Suggestions');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://superpokemonteambuilder.com/pokemon/garchomp/best-teammates');
  await page.goto('/pokemon/garchomp/best-teammates?v=1&team=pikachu');
  await expect(page.getByTestId('slot-0').getByRole('heading', { name: 'Pikachu', exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://superpokemonteambuilder.com/pokemon/garchomp/best-teammates');
  const structured = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
  expect(structured['@type']).toBe('WebApplication');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://superpokemonteambuilder.com/og.png');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true); expect(await sitemap.text()).toContain('/pokemon/garchomp/best-teammates');
  expect(await sitemap.text()).not.toContain('?team=');
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://superpokemonteambuilder.com/sitemap.xml');
  expect((await request.get('/og.png')).ok()).toBe(true);
  await page.goto('/weakness-calculator?v=1&team=charizard');
  await expect(page.getByRole('table')).toBeVisible();
});

test('accessible empty, populated and picker states', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Add Pokémon to slot 1', exact: true })).toBeEnabled();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.goto('/pokemon/garchomp');
  await expect(page.getByTestId('slot-0').getByRole('heading', {name:'Garchomp',exact:true})).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('button', {name:'Add Pokémon to slot 2',exact:true}).click();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
});
test('unknown routes and unsupported URL versions have safe fallbacks', async ({page}) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', {level:1})).toHaveText('That page wandered off.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
  await page.goto('/?v=99&team=pikachu');
  await expect(page.getByRole('button', {name:/Add Pokémon to slot/})).toHaveCount(6);
  await expect(page.getByTestId('team-score')).toHaveText('0/ 100');
});

test('saved teams survive reload and load, clear and recommendations can be restored', async ({ page }) => {
  await page.goto('/?v=1&team=pikachu,,,gengar');
  await page.getByText('Saved teams · 0', {exact:true}).click();
  await page.getByRole('textbox', {name:'Team name',exact:true}).fill('Adventure');
  await page.getByRole('button', {name:'Save current team',exact:true}).click();
  await expect(page.getByRole('button', {name:'Load Adventure',exact:true})).toBeVisible();
  await page.getByRole('button', {name:'Clear team',exact:true}).click();
  await expect(page.getByRole('button', {name:/Add Pokémon to slot/})).toHaveCount(6);
  await page.getByRole('button', {name:'Load Adventure',exact:true}).click();
  await expect(page.getByTestId('slot-3').getByRole('heading', {name:'Gengar',exact:true})).toBeVisible();
  await page.reload();
  await page.getByText('Saved teams · 1', {exact:true}).click();
  await page.getByRole('button', {name:'Clear team',exact:true}).click();
  await page.getByRole('button', {name:'Load Adventure',exact:true}).click();
  await expect(page.getByTestId('slot-0').getByRole('heading', {name:'Pikachu',exact:true})).toBeVisible();
  await expect(page.getByRole('button', {name:'Add Pokémon to slot 2',exact:true})).toBeVisible();
  const previousScore = await page.getByTestId('team-score').textContent();
  await page.getByTestId('recommendation').first().getByRole('button').click();
  await page.getByRole('button', {name:'Load Adventure',exact:true}).click();
  await expect(page.getByTestId('team-score')).toHaveText(previousScore!);
  await page.getByRole('button', {name:'Delete Adventure',exact:true}).click();
  await expect(page.getByText('No saved teams yet.', {exact:true})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('blocked storage keeps editing and sharing usable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {get() {throw new Error('blocked');}});
  });
  await page.goto('/?v=1&team=pikachu');
  await page.getByText('Saved teams · 0', {exact:true}).click();
  await page.getByRole('textbox', {name:'Team name',exact:true}).fill('Backup');
  await page.getByRole('button', {name:'Save current team',exact:true}).click();
  await expect(page.getByRole('status').filter({hasText:'Browser storage is unavailable or full.'})).toBeVisible();
  await page.getByRole('button', {name:'Share team',exact:false}).click();
  await expect(page.getByRole('textbox', {name:'Your team link',exact:true})).toHaveValue(/team=pikachu/);
});

test('continuous building fills six slots without reopening and permits stopping early', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name:'Build team',exact:true}).click();
  for (const [index, name] of ['Pikachu','Charizard','Venusaur','Blastoise','Gengar','Dragonite'].entries()) {
    await expect(page.getByRole('heading', {name:`Choose Pokémon · Slot ${index + 1}`,exact:true})).toHaveText(`Choose Pokémon · Slot ${index + 1}`);
    await page.getByRole('searchbox').fill(name);
    await page.getByRole('button', {name:`Choose ${name}`,exact:true}).click();
    if(index < 5) await expect(page.getByRole('dialog')).toBeVisible();
  }
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', {name:'Build team',exact:true})).toBeDisabled();
  await expect(page.locator('.score-change')).toContainText('points');
  await page.getByRole('button', {name:'Clear team',exact:true}).click();
  await page.getByRole('button', {name:'Build team',exact:true}).click();
  await page.getByRole('searchbox').fill('Pikachu');
  await page.getByRole('button', {name:'Choose Pikachu',exact:true}).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.getByRole('searchbox').fill('Pikachu');
  await expect(page.getByRole('button', {name:'Pikachu, already in team',exact:true})).toBeDisabled();
  await page.getByRole('button', {name:'Done · 1/6',exact:true}).click();
  await expect(page.getByRole('button', {name:'Build team',exact:true})).toBeFocused();
  await page.getByRole('button', {name:'Replace Pikachu',exact:true}).click();
  await page.getByRole('searchbox').fill('Raichu');
  await page.getByRole('button', {name:'Choose Raichu',exact:true}).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('compact picker resets filters and follows a shortened visual viewport', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.addInitScript(() => {
    const viewport = Object.assign(new EventTarget(), {height:844,offsetTop:0,scale:1});
    Object.defineProperty(window, 'visualViewport', {value:viewport,configurable:true});
  });
  await page.goto('/');
  await page.getByRole('button', {name:'Build team',exact:true}).click();
  await expect(page.getByRole('button', {name:'Filter Fire',exact:true})).toBeVisible();
  await page.getByRole('searchbox').fill('zzzzzz');
  await page.getByRole('button', {name:'Reset search and filters',exact:true}).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.getByRole('button', {name:'Filters',exact:true}).click();
  await page.getByRole('button', {name:'Filter Fire',exact:true}).click();
  await page.getByRole('button', {name:'Filters',exact:true}).click();
  await expect(page.getByRole('button', {name:'Filter Fire',exact:true})).toBeVisible();
  await expect(page.getByRole('button', {name:'Choose Pikachu',exact:true})).toHaveCount(0);
  await page.getByRole('button', {name:'Reset filters',exact:true}).click();
  await page.getByRole('searchbox').fill('Pikachu');
  await page.getByRole('searchbox').fill('');
  await page.evaluate(() => {
    Object.assign(window.visualViewport!, {height:420,offsetTop:30});
    window.visualViewport!.dispatchEvent(new Event('resize'));
  });
  await expect.poll(async () => (await page.getByRole('dialog').boundingBox())?.height).toBe(420);
  const footer = await page.locator('.picker-footer').boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(451);
  const results = await page.locator('.picker-results-scroll').boundingBox();
  expect(results!.height).toBeGreaterThan(50);
  await page.getByRole('searchbox').fill('Pikachu');
  await page.getByRole('button', {name:'Choose Pikachu',exact:true}).click();
  await expect(page.locator('.picker-footer')).toContainText('Team score');
  await page.getByRole('button', {name:'Done · 1/6',exact:true}).click();
  expect(await page.evaluate(()=>document.body.style.overflow)).toBe('');
  await expect(page.getByRole('button', {name:'Build team',exact:true})).toBeFocused();
});

test('sprites appear in team, picker and recommendations with a safe image failure fallback', async ({page}) => {
  await page.route('https://cdn.jsdelivr.net/gh/PokeAPI/sprites@*/sprites/pokemon/other/official-artwork/*.png', route => route.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aXioAAAAASUVORK5CYII=','base64')}));
  await page.goto('/?v=1&team=pikachu');
  const selected = page.getByTestId('slot-0').locator('img');
  await expect(selected).toHaveAttribute('src', /\/official-artwork\/25\.png$/);
  await expect.poll(()=>selected.evaluate((el:HTMLImageElement)=>el.complete && el.naturalWidth>0)).toBe(true);
  await expect(page.getByTestId('recommendation').first().locator('img')).toHaveCount(1);
  await page.getByRole('button',{name:'Add Pokémon to slot 2',exact:true}).click();
  await page.getByRole('searchbox').fill('Charizard');
  await expect(page.getByRole('button',{name:'Choose Charizard',exact:true}).locator('img')).toHaveAttribute('src',/\/6\.png$/);
  await page.getByRole('button',{name:'Close Pokémon picker',exact:true}).click();
  await page.unroute('https://cdn.jsdelivr.net/gh/PokeAPI/sprites@*/sprites/pokemon/other/official-artwork/*.png');
  await page.route('https://cdn.jsdelivr.net/gh/PokeAPI/sprites@*/sprites/pokemon/other/official-artwork/*.png', route=>route.abort());
  await page.reload();
  await expect(page.getByTestId('slot-0').locator('.sprite-fallback')).toHaveText('#25');
  await expect(page.getByTestId('slot-0').getByRole('heading',{name:'Pikachu',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Replace Pikachu',exact:true}).click();
  await page.getByRole('searchbox').fill('Charizard');
  await page.getByRole('button',{name:'Choose Charizard',exact:true}).click();
  await expect(page.getByTestId('slot-0').locator('.sprite-fallback')).toHaveText('#6');
});

test('desktop core tools fit the first screen and an example can be cleared', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.setViewportSize({width:1366,height:768});
  await page.goto('/');
  await page.getByRole('button',{name:'Try example',exact:true}).click();
  await expect(page.getByTestId('slot-5').getByRole('heading')).toHaveText('Dragonite');
  const button=page.getByTestId('recommendation').first().getByRole('button');
  await expect(button).toBeVisible();
  const bounds=await button.boundingBox();
  expect(bounds!.y+bounds!.height).toBeLessThanOrEqual(768);
  expect(await page.evaluate(()=>window.scrollY)).toBe(0);
  await page.getByRole('button',{name:'Clear team',exact:true}).click();
  await expect(page.getByTestId('team-score')).toHaveText('0/ 100');
});

test('automatic replacements preserve locked favorites and unlock restores suggestions', async ({ page }) => {
  await page.goto('/?team=charizard,moltres,hooh,talonflame,articuno,butterfree&v=1');
  await expect(page.getByLabel('Slot to optimize', {exact:true})).toHaveValue('auto');
  const names=['Charizard','Moltres','Ho-Oh','Talonflame','Articuno','Butterfree'];
  for (const name of names) await page.getByRole('button',{name:`Lock ${name}`,exact:true}).click();
  await expect(page.getByTestId('recommendation')).toHaveCount(0);
  await page.getByRole('button',{name:'Unlock Butterfree',exact:true}).click();
  const first=page.getByTestId('recommendation').first();
  await expect(first.getByRole('button')).toHaveText('Replace Butterfree ↗');
  const score=await first.getAttribute('data-new-score');
  await first.getByRole('button').click();
  await expect(page.getByTestId('team-score')).toHaveText(`${score}/ 100`);
  for (const name of names.slice(0,5)) await expect(page.getByRole('button',{name:`Unlock ${name}`,exact:true})).toHaveAttribute('aria-pressed','true');
});

test('official type assets load and selection feedback respects reduced motion', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Build team',exact:true}).click();
  await page.getByRole('button',{name:'Filters',exact:true}).click();
  const icons=page.locator('.type-icon-filters img');
  await expect(icons).toHaveCount(18);
  await expect.poll(() => icons.evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.getByRole('searchbox').fill('Pikachu');
  await page.getByRole('button',{name:'Choose Pikachu',exact:true}).click();
  await page.getByRole('button',{name:/Done/}).click();
  await expect(page.getByTestId('slot-0').locator('.selection-flash')).toHaveCount(1);
  await expect(page.locator('.score-value')).toHaveCSS('animation-name','score-bounce');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.score-value')).toHaveCSS('animation-name','none');
  await expect(page.locator('.selection-flash')).toHaveCSS('animation-name','none');
});

test('guide directory, disclaimer and feedback draft are reachable', async ({ page }) => {
  await page.goto('/pokemon');
  await expect(page.locator('.guide-card')).toHaveCount(featuredPokemonIds.length);
  await page.locator('.guide-card[href="/pokemon/pikachu"]').click();
  await expect(page.getByRole('heading',{name:'Pikachu Build Guide',exact:true})).toBeVisible();
  await expect(page.locator('footer')).toContainText('not affiliated with or endorsed');
  await page.getByRole('link',{name:'Feedback',exact:true}).click();
  await page.getByLabel('Your feedback', {exact:true}).fill('The type icons could be easier to recognize.');
  const download=page.waitForEvent('download');
  await page.getByRole('button',{name:'Download feedback',exact:true}).click();
  expect((await download).suggestedFilename()).toBe('pokemon-team-builder-feedback.txt');
  await expect(page.getByRole('status')).toHaveText('Feedback downloaded. It has not been sent.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
