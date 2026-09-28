import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon, PokemonResumo } from '../types';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const CHAVE_CACHE = 'cache_pokemons';

function montarImagem(id: number): string {
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';
}

export async function buscarPokemons(): Promise<PokemonResumo[]> {
  try {
    const resposta = await fetch(API_URL + '?limit=20');

    if (!resposta.ok) {
      throw new Error('Erro ' + resposta.status);
    }

    const dados = await resposta.json();
    const pokemons: PokemonResumo[] = dados.results.map((item: { name: string; url: string }) => {
      const partes = item.url.split('/');
      const id = Number(partes[partes.length - 2]);
      return { id: id, nome: item.name, imagem: montarImagem(id) };
    });

    await AsyncStorage.setItem(CHAVE_CACHE, JSON.stringify(pokemons));
    return pokemons;
  } catch (erro) {
    const cache = await AsyncStorage.getItem(CHAVE_CACHE);
    if (cache) {
      return JSON.parse(cache);
    }
    throw erro;
  }
}

export async function buscarPokemon(id: number): Promise<Pokemon> {
  const resposta = await fetch(API_URL + '/' + id);

  if (!resposta.ok) {
    throw new Error('Erro ' + resposta.status);
  }

  const dados = await resposta.json();
  return {
    id: dados.id,
    nome: dados.name,
    imagem: dados.sprites.other['official-artwork'].front_default ?? montarImagem(dados.id),
    tipos: dados.types.map((item: { type: { name: string } }) => item.type.name),
    altura: dados.height / 10,
    peso: dados.weight / 10,
  };
}
