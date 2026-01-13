import { test, expect } from '@playwright/test';

test.describe('ViralVault Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should navigate to the correct pages when links are clicked', async ({ page }) => {
    // Click "Explore" link
    await page.click('nav a:has-text("Explore")');
    await expect(page).toHaveURL('http://localhost:3001/explore');
    await page.goBack();

    // Click "Create" link
    await page.click('nav a:has-text("Create")');
    await expect(page).toHaveURL('http://localhost:3001/create');
    await page.goBack();

    // Click "Invest" link
    await page.click('nav a:has-text("Invest")');
    await expect(page).toHaveURL('http://localhost:3001/invest');
    await page.goBack();

    // Click "Tokenize Content" button
    await page.click('a:has-text("Tokenize Content")');
    await expect(page).toHaveURL('http://localhost:3001/create');
    await page.goBack();

    // Click "Browse Opportunities" button
    await page.click('a:has-text("Browse Opportunities")');
    await expect(page).toHaveURL('http://localhost:3001/explore');
  });

  test('should show the wallet connection modal when "Connect Wallet" is clicked', async ({ page }) => {
    await page.click('button:has-text("Connect Wallet")');
    // The wallet modal is rendered in a shadow DOM, so we need to inspect it differently.
    // This is a basic check to see if the modal container is visible.
    const modalVisible = await page.isVisible('w3m-modal');
    expect(modalVisible).toBe(true);
    await page.screenshot({ path: 'frontend/tests/e2e/wallet-modal.png' });
  });
});
