import { test, expect } from '@playwright/test';

const testCases = [
  { amount: '40000', expectedDecision: 'Approved' },
  { amount: '100000', expectedDecision: 'Declined' },
  { amount: '50000', expectedDecision: 'Undecided' },
];

for (const { amount, expectedDecision } of testCases) {
  test(`Loan decision should be "${expectedDecision}" for amount ${amount}`, async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.fill('input[name="taxId"]', '123456789');
    await page.fill('input[name="businessName"]', 'Test Business');
    await page.fill('input[name="requestedAmount"]', amount);

    await page.click('button[type="submit"]');

    await page.waitForSelector('.swal2-popup');

    const alertText = await page.locator('.swal2-title').textContent();
    const decisionText = await page.locator('.swal2-html-container').textContent();

    expect(alertText).toContain('Loan Decision');
    expect(decisionText).toBe(expectedDecision);
  });
}
