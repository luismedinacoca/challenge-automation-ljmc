import { test as base } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export const test = base.extend<{
  basePage: BasePage;
}>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});