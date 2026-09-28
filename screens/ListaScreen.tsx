import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList, PokemonResumo } from '../types';
import { buscarPokemons } from '../services/api';

type Props = NativeStackScreenProps<InicioStackParamList, 'Lista'>;

export default function ListaScreen({ navigation }: Props) {
  const [pokemons, setPokemons] = useState<PokemonResumo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      setErro('');
      const dados = await buscarPokemons();
      setPokemons(dados);
    } catch {
      setErro('Não foi possível carregar os Pokémon. Verifique sua internet.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function atualizar() {
    setAtualizando(true);
    carregar();
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#b91c1c" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
        <Pressable style={styles.botao} onPress={atualizar}>
          <Text style={styles.botaoTexto}>Tentar de novo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.fundo}
      data={pokemons}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.lista}
      refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar} />}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum Pokémon encontrado.</Text>}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => navigation.navigate('Detalhes', { id: item.id })}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          <Text style={styles.numero}>#{item.id}</Text>
          <Text style={styles.nome}>{item.nome}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: '#fef2f2' },
  lista: { padding: 6 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  vazio: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  imagem: { width: 96, height: 96 },
  numero: { fontSize: 13, color: '#9ca3af' },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', textTransform: 'capitalize' },
  botao: { backgroundColor: '#b91c1c', padding: 12, borderRadius: 20 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
