import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useIsFocused, useNavigationState } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList, Pokemon } from '../types';
import { buscarPokemon } from '../services/api';
import { carregarFavoritos, removerFavorito } from '../services/favoritos';

type Props = NativeStackScreenProps<InicioStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const telaFocada = useIsFocused();
  const telasNaPilha = useNavigationState((state) => state.routes.length);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro('');
        const dados = await buscarPokemon(id);
        setPokemon(dados);
      } catch {
        setErro('Não foi possível carregar este Pokémon.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  useEffect(() => {
    async function verificarFavorito() {
      const favoritos = await carregarFavoritos();
      setFavorito(favoritos.includes(id));
    }
    if (telaFocada) {
      verificarFavorito();
    }
  }, [telaFocada, id]);

  async function desfavoritar() {
    await removerFavorito(id);
    setFavorito(false);
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#b91c1c" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro || !pokemon) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro || 'Pokémon não encontrado.'}</Text>
        <Pressable style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.fundo} contentContainerStyle={styles.container}>
      <View style={styles.ficha}>
        <Text style={styles.numero}>#{pokemon.id}</Text>
        <Image source={{ uri: pokemon.imagem }} style={styles.imagem} />
        <Text style={styles.nome}>{pokemon.nome}</Text>

        <View style={styles.linhaTipos}>
          {pokemon.tipos.map((tipo) => (
            <Text key={tipo} style={styles.tipo}>
              {tipo}
            </Text>
          ))}
        </View>

        <View style={styles.linhaMedidas}>
          <View style={styles.medida}>
            <Text style={styles.medidaValor}>{pokemon.altura} m</Text>
            <Text style={styles.medidaTexto}>Altura</Text>
          </View>
          <View style={styles.medida}>
            <Text style={styles.medidaValor}>{pokemon.peso} kg</Text>
            <Text style={styles.medidaTexto}>Peso</Text>
          </View>
        </View>
      </View>

      {favorito ? (
        <Pressable style={[styles.botao, styles.botaoCinza]} onPress={desfavoritar}>
          <Text style={styles.botaoTexto}>Remover do meu time</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.botao, styles.botaoAmarelo]}
          onPress={() => navigation.navigate('Favoritar', { id: pokemon.id, nome: pokemon.nome, imagem: pokemon.imagem })}
        >
          <Text style={[styles.botaoTexto, styles.textoEscuro]}>Favoritar</Text>
        </Pressable>
      )}

      <View style={styles.caixa}>
        <Text style={styles.subtitulo}>navigate() x push()</Text>
        <Text style={styles.info}>Telas na pilha agora: {telasNaPilha}</Text>
        <View style={styles.linhaBotoes}>
          <Pressable style={[styles.botao, styles.botaoMetade]} onPress={() => navigation.navigate('Detalhes', { id: id + 1 })}>
            <Text style={styles.botaoTexto}>navigate()</Text>
          </Pressable>
          <Pressable style={[styles.botao, styles.botaoMetade]} onPress={() => navigation.push('Detalhes', { id: id + 1 })}>
            <Text style={styles.botaoTexto}>push()</Text>
          </Pressable>
        </View>
        <Text style={styles.info}>Os dois abrem o próximo Pokémon (#{id + 1}).</Text>
      </View>

      <Pressable style={[styles.botao, styles.botaoVerde]} onPress={() => navigation.getParent()?.navigate('Favoritos')}>
        <Text style={styles.botaoTexto}>Ver meu time</Text>
      </Pressable>

      <Pressable style={[styles.botao, styles.botaoCinza]} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: '#fef2f2' },
  container: { padding: 16 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  ficha: { backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 3, borderColor: '#b91c1c' },
  numero: { alignSelf: 'flex-end', fontSize: 16, color: '#9ca3af', fontWeight: 'bold' },
  imagem: { width: 200, height: 200 },
  nome: { fontSize: 28, fontWeight: 'bold', color: '#1f2937', textTransform: 'capitalize' },
  linhaTipos: { flexDirection: 'row', marginTop: 10 },
  tipo: {
    backgroundColor: '#b91c1c',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    marginHorizontal: 4,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  linhaMedidas: { flexDirection: 'row', marginTop: 16 },
  medida: { alignItems: 'center', marginHorizontal: 24 },
  medidaValor: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  medidaTexto: { color: '#6b7280' },
  caixa: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginTop: 14 },
  subtitulo: { fontSize: 16, fontWeight: 'bold' },
  info: { color: '#6b7280', marginTop: 4 },
  linhaBotoes: { flexDirection: 'row', gap: 10 },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  botao: { backgroundColor: '#b91c1c', padding: 12, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  botaoMetade: { flex: 1 },
  botaoAmarelo: { backgroundColor: '#facc15' },
  botaoVerde: { backgroundColor: '#15803d' },
  botaoCinza: { backgroundColor: '#6b7280' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  textoEscuro: { color: '#1f2937' },
});
