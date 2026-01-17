import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async getElementText(selector: string): Promise<string | null> {
    const element = this.page.locator(selector).first();
    return await element.textContent();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector).first();
    return await element.isVisible();
  }
}