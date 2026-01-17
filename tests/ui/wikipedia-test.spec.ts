import { test, expect } from '../../fixture/combined.fixture'; // Cambia solo esta línea
import { ExcelReader } from '../../utils/excelReader';
import { PokemonTestData } from '../../types/pokemon';

const reader = new ExcelReader('./data/Datos-pruebas.xlsx');
const data: PokemonTestData[] = reader.readPokemonData();

test.describe('PokeApi Test using excel data', () => {
  for (const pokemon of data) {
    test(`Searching ${pokemon.name} in Wikipedia`, async ({
      wikipediaPage,
      encryptedSecret,
      testTime
    }) => {
      await wikipediaPage.searchPokemon(pokemon.name);

      const isImageVisible = await wikipediaPage.verifyPokemonImage();
      expect(isImageVisible).toBeTruthy();

      const title = await wikipediaPage.getPokemonTitle();
      expect(title?.toLowerCase()).toBe(pokemon.name.toLowerCase());

      const artWorkName = await wikipediaPage.getArtWorkName();
      console.log(`👨🏽‍🎨 ${pokemon.name} artwork: 👉🏽 ${artWorkName} 👈🏽`);

      //await wikipediaPage.waitForTimeout(1000);
    });
  }
});

// const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

// const reader = new ExcelReader('./data/Datos-pruebas.xlsx')
// const data: PokemonTestData[] = reader.readPokemonData();

// test.describe('PokeApi Test using excel data', () => {
//   //console.log("🔥 🔥 data: ", data)
//   for (const pokemon of data) {
//     test(`Searching ${pokemon.name} in Wikipedia`, async ({ page, encryptedSecret, testTime }) => {
//       //searchPokemon method:
//       await page.goto(`https://en.wikipedia.org/wiki/${pokemon.name}`);
//       const pokeImage = page.locator('.infobox.ib-character').first();
//       await expect(pokeImage).toBeVisible();
//       //getPokemonTitle method:
//       const pokemonTitle = page.locator('.mw-page-title-main').first();
//       await expect(pokemonTitle).toHaveText(pokemon.name, { ignoreCase: true });
//       //getArtWorkName method:
//       const pokemonArtWorkName = page.locator('.infobox-caption a');
//       console.log(`👨🏽🎨 ${pokemon.name} artwork: 👉🏽 ${await pokemonArtWorkName.textContent()} 👈🏽`);
//       // waitForTimeout method:
//       await page.waitForTimeout(1000);
//     })
//   }
// });
