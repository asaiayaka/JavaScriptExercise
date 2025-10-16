import { test, expect } from '@playwright/test';

test.describe('Product List Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/index.html'); // http-server の URL
  });

  test('初期状態ですべてのアイテムが表示される', async ({ page }) => {
    const items = await page.locator('#productList li');
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toBeVisible();
    await expect(items.nth(1)).toBeVisible();
    await expect(items.nth(2)).toBeVisible();
  });

  test('食品を選択すると食品だけが表示される', async ({ page }) => {
    await page.selectOption('#category-select', 'food');
    const foodItem = page.locator('[data-testid="food1"]');
    const stationeryItems = page.locator('[data-category="stationery"]');

    await expect(foodItem).toBeVisible();
    await expect(stationeryItems.nth(0)).not.toBeVisible();
    await expect(stationeryItems.nth(1)).not.toBeVisible();
  });

  test('文房具を選択すると文房具だけが表示される', async ({ page }) => {
    await page.selectOption('#category-select', 'stationery');
    const stationeryItems = page.locator('[data-category="stationery"]');
    const foodItem = page.locator('[data-testid="food1"]');

    await expect(stationeryItems.nth(0)).toBeVisible();
    await expect(stationeryItems.nth(1)).toBeVisible();
    await expect(foodItem).not.toBeVisible();
  });

});
