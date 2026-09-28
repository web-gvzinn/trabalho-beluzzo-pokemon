import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList, Pokemon } from '../types';
import { buscarPokemon } from '../services/api';
import { carregarFavoritos } from '../services/favoritos';

type Props = BottomTabScreenProps<TabParamList, 'Favoritos'>;

export default function FavoritosScreen({ navigation }: Props) {
  const [favoritos, setFavoritos] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const telaFocada = useIsFocused();

  useEffect(() => {
    async function carregar() {
      try {
        setErro('');
        const ids = await carregarFavoritos();
        const pokemons = await Promise.all(ids.map((id) => buscarPokemon(id)));
        setFavoritos(pokemons);
      } catch {
        setErro('Não foi possível carregar o seu time.');
      } finally {
        setCarregando(false);
      }
    }
    if (telaFocada) {
      carregar();
    }
  }, [telaFocada]);

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
      </View>
    );
  }

  return (
    <FlatList
      style={styles.fundo}
      data={favoritos}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={<Text style={styles.titulo}>Meu time ({favoritos.length})</Text>}
      ListEmptyComponent={<Text style={styles.vazio}>Seu time ainda está vazio.</Text>}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('InicioStack', { screen: 'Detalhes', params: { id: item.id } })}
        >
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          <View>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>#{item.id} - {item.tipos.join(' / ')}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: '#fef2f2' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#b91c1c', margin: 12 },
  vazio: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 16,
    borderLeftWidth: 6,
    borderLeftColor: '#b91c1c',
  },
  imagem: { width: 64, height: 64, marginRight: 12 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', textTransform: 'capitalize' },
  info: { color: '#6b7280', textTransform: 'capitalize' },
});
