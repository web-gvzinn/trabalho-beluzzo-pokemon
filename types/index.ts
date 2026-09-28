import { NavigatorScreenParams } from '@react-navigation/native';

export type PokemonResumo = {
  id: number;
  nome: string;
  imagem: string;
};

export type Pokemon = {
  id: number;
  nome: string;
  imagem: string;
  tipos: string[];
  altura: number;
  peso: number;
};

export type InicioStackParamList = {
  Lista: undefined;
  Detalhes: { id: number };
  Favoritar: { id: number; nome: string; imagem: string };
};

export type TabParamList = {
  InicioStack: NavigatorScreenParams<InicioStackParamList>;
  Favoritos: undefined;
};

export type DrawerParamList = {
  Principal: NavigatorScreenParams<TabParamList>;
  Sobre: undefined;
};
