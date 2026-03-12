import { test, expect } from '../fixtures';

test('displays app title in header', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByRole('link', { name: 'Film Tracker' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Film Tracker' })).toHaveAttribute('href', '/');
});

test('shows user initials in header', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByRole('button', { name: 'TU' })).toBeVisible();
});

test('shows user name in popup', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await page.getByRole('button', { name: 'TU' }).click();
  await expect(page.getByText('Test User')).toBeVisible();
});

test('displays watched films section', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByRole('heading', { name: 'Watched Films' })).toBeVisible();
});

test('displays a film from database', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByText('Inception')).toBeVisible();
  await expect(page.getByText('2010')).toBeVisible();
  await expect(page.getByText('Leonardo DiCaprio, Tom Hardy')).toBeVisible();
  await expect(page.getByText('9/10')).toBeVisible();
});

test('can add a new film', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await page.getByRole('button', { name: 'Add Film' }).click();
  await page.getByLabel('Title').fill('The Matrix');
  await page.getByLabel('Year').fill('1999');
  await page.getByLabel('Actor 1').fill('Keanu Reeves');
  await page.getByLabel('Actor 2').fill('Laurence Fishburne');
  await page.getByLabel('Score').click();
  await page.getByRole('option', { name: '8/10' }).click();
  await page.getByRole('button', { name: 'Save Film' }).click();
  await expect(page.getByText('The Matrix')).toBeVisible();
});

test('displays favorite actors section', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByRole('heading', { name: 'Favorite Actors' })).toBeVisible();
});

test('displays next film to watch section', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await expect(page.getByRole('heading', { name: 'Next Film to Watch' })).toBeVisible();
});

test('can generate AI suggestion', async ({ page }) => {
  await page.goto('http://localhost:8180');
  await page.getByRole('button', { name: 'Get AI Suggestion' }).click();
  await expect(page.getByText('The Shawshank Redemption')).toBeVisible();
  await expect(page.getByText('1994')).toBeVisible();
});
