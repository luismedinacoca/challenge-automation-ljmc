export interface Pokemon {
  id: number;
  name: string;
  abilities: string;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  abilities: AbilityResponse[];
}

export interface AbilityResponse {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}


export interface PokemonTestData {
  id: number;
  name: string;
  abilities: string;
}