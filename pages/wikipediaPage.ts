import { BasePage } from './basePage';
import { Locator } from '@playwright/test';

export class WikipediaPage extends BasePage {
  // Locators
  readonly pokemonImage: Locator;
  readonly pokemonTitle: Locator;
  readonly pokemonArtWorkName: Locator;

  constructor(page: any) {
    super(page);
    this.pokemonImage = page.locator('.infobox.ib-character').first();
    this.pokemonTitle = page.locator('.mw-page-title-main').first();
    this.pokemonArtWorkName = page.locator('.infobox-caption a');
  }

  async searchPokemon(pokemonName: string) {
    await this.navigateTo(`https://en.wikipedia.org/wiki/${pokemonName}`);
  }

  async verifyPokemonImage() {
    return await this.pokemonImage.isVisible();
  }

  async getPokemonTitle() {
    return await this.pokemonTitle.textContent();
  }

  async getArtWorkName() {
    return await this.pokemonArtWorkName.textContent();
  }
}