# Pokédex

Trabalho prático de ARQAPMO (IFSP): app Expo/React Native que consome uma API, usa navegação Drawer, Tabs, Stack e Modal, e salva os favoritos no celular com AsyncStorage.

## Contexto escolhido

**Pokémon**: lista de Pokémon → detalhes (tipo, altura, peso, imagem). O usuário pode favoritar seus preferidos e montar o seu time.

## API usada

[PokéAPI](https://pokeapi.co/), grátis e sem chave.

- Lista: `https://pokeapi.co/api/v2/pokemon?limit=20`
- Detalhes: `https://pokeapi.co/api/v2/pokemon/{id}`

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o projeto:

   ```bash
   npx expo start
   ```

3. Leia o QR Code com o app **Expo Go** no celular.

## Estrutura

```
navigation/   Drawer, Tabs e Stack
screens/      Lista, Detalhes, Modal de favoritar, Favoritos (Meu time) e Sobre
services/     Chamadas da API (fetch) e funções do AsyncStorage
types/        Tipos do TypeScript
```

## O que o app faz

- **API:** a lista busca os Pokémon com `fetch()` dentro de um `useEffect`, mostra "Carregando..." e mostra uma mensagem de erro se a API falhar. A tela de detalhes faz uma segunda chamada pelo `id`.
- **Stack:** Lista → Detalhes passando o `id` por `route.params`, botão de voltar com `goBack()` e dois botões que mostram a diferença entre `navigate()` e `push()`.
- **Tabs:** aba "Pokédex" (Stack) e aba "Meu time" (favoritos). Tocar num favorito abre os detalhes dele com `navigation.navigate('InicioStack', { screen: 'Detalhes', params: { id } })`.
- **Modal:** o botão "Favoritar" abre uma tela com `presentation: 'modal'` que salva o favorito no AsyncStorage antes de fechar.
- **AsyncStorage:** a lista de ids favoritos fica salva no celular, mesmo depois de fechar o app.

### Bônus

- Cache da última lista baixada, que aparece mesmo sem internet.
- `navigation.getParent()` na tela de detalhes para ir até a aba "Meu time".
- Puxar a lista para baixo para atualizar (`RefreshControl`).
- Drawer, Tabs, Stack e Modal ao mesmo tempo.

## Vídeo

Link do vídeo: https://youtu.be/xB2THVwOjU0
