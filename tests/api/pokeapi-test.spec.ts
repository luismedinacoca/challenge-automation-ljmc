import { test, expect } from '../../fixture/secret.fixture';
import { ExcelReader } from '../../utils/excelReader';
import { AbilityResponse, PokemonApiResponse, PokemonTestData } from '../../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const reader = new ExcelReader('./data/Datos-pruebas.xlsx')
const data: PokemonTestData[] = reader.readPokemonData();

test.describe('PokeApi Test using excel data', () => {
  for (const pokemon of data) {
    test(`👉🏽 [ID] ${pokemon.name} (${pokemon.id}) - GET request by ID`, async ({ request, encryptedSecret, testTime }) => {
      const response = await request.get(`${POKEAPI_BASE_URL}/pokemon/${pokemon.id}`);
      await validatePokemonResponse(response, pokemon.id, pokemon.name, pokemon.abilities);
    });

    test(`👉🏽 [NAME] ${pokemon.name} - GET request by NAME`, async ({ request, encryptedSecret, testTime }) => {
      const response = await request.get(`${POKEAPI_BASE_URL}/pokemon/${pokemon.name}`);
      await validatePokemonResponse(response, pokemon.id, pokemon.name, pokemon.abilities);
    });
  }
});


// validate pokemon response
async function validatePokemonResponse(
  response: any,
  expectedId: number,
  expectedName: string,
  expectedAbilities: string
) {
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const body: PokemonApiResponse = await response.json();

  expect(body.id).toBe(expectedId);
  expect(body.name).toBe(expectedName);

  await test.step('Extract and Verify Abilities', async () => {
    const expectedAbilitiesSorted = expectedAbilities.split(', ').sort();
    const actualAbilitiesSorted = body.abilities
      .map((a: AbilityResponse) => a.ability.name.toLowerCase())
      .sort();
    expect(actualAbilitiesSorted).toEqual(expectedAbilitiesSorted);
  });
}

// test.describe('Pruebas de PokeAPI usando datos de Excel', async () => {
//   for (const pokemon of data) {
//     test(`GET request for Pokemon con ID: ${pokemon.id}`, async ({ request }) => {
//       const response = await request.get(`${POKEAPI_BASE_URL}/pokemon/${pokemon.id}`)
//       expect(response.ok()).toBeTruthy();
//       expect(response.status()).toBe(200);
//       const body: PokemonApiResponse = await response.json();
//       expect(body.name).toBe(pokemon.name)

//       await test.step('Extraer & Verificar Habilidades', async () => {
//         const pokemonAbilities = pokemon.abilities.split(", ").sort();
//         const currentPokemonAbilities = body.abilities.map((able: AbilityResponse) => able.ability.name.toLowerCase()).sort();
//         expect(currentPokemonAbilities).toEqual(pokemonAbilities);
//       })
//     })

//     test(`GET request for Pokemon with NAME: ${pokemon.name}`, async ({ request }) => {
//       const response = await request.get(`${POKEAPI_BASE_URL}/pokemon/${pokemon.name}`)
//       expect(response.ok()).toBeTruthy();
//       expect(response.status()).toBe(200);
//       const body: PokemonApiResponse = await response.json();
//       expect(body.id).toBe(pokemon.id);

//       await test.step('Extraer & Verificar Habilidades', async () => {
//         const pokemonAbilities = pokemon.abilities.split(", ").sort();
//         const currentPokemonAbilities = body.abilities.map((able: AbilityResponse) => able.ability.name.toLowerCase()).sort();
//         expect(currentPokemonAbilities).toEqual(pokemonAbilities);
//       })
//     })
//   }
// })
