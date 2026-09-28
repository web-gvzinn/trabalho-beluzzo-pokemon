import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList } from '../types';
import { adicionarFavorito } from '../services/favoritos';

type Props = NativeStackScreenProps<InicioStackParamList, 'Favoritar'>;

export default function FavoritarModal({ navigation, route }: Props) {
  const { id, nome, imagem } = route.params;

  async function confirmar() {
    await adicionarFavorito(id);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.texto}>Adicionar {nome} ao seu time de favoritos?</Text>

      <Pressable style={[styles.botao, styles.botaoVermelho]} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Sim, adicionar</Text>
      </Pressable>

      <Pressable style={[styles.botao, styles.botaoCinza]} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  imagem: { width: 160, height: 160 },
  texto: { fontSize: 20, textAlign: 'center', marginVertical: 20, color: '#1f2937', textTransform: 'capitalize' },
  botao: { width: '100%', padding: 14, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  botaoVermelho: { backgroundColor: '#b91c1c' },
  botaoCinza: { backgroundColor: '#6b7280' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
