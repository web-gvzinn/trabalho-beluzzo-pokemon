import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokédex</Text>
      <Text style={styles.texto}>App feito para o trabalho de ARQAPMO do IFSP.</Text>
      <Text style={styles.texto}>Os Pokémon vêm da PokéAPI e o seu time de favoritos fica salvo no celular com AsyncStorage.</Text>
      <Text style={styles.texto}>Navegação: Drawer, Tabs, Stack e Modal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fef2f2' },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#b91c1c' },
  texto: { fontSize: 16, marginBottom: 10, color: '#1f2937' },
});
