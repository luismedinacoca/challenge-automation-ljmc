import { test as base } from './secret.fixture';
import { BasePage } from '../pages/basePage';
import { WikipediaPage } from '../pages/wikipediaPage';

export const test = base.extend<{
  basePage: BasePage;
  wikipediaPage: WikipediaPage;
}>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

  wikipediaPage: async ({ page }, use) => {
    const wikipediaPage = new WikipediaPage(page);
    await use(wikipediaPage);
  },
});

export { expect } from './secret.fixture';