import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InicioStackParamList } from '../types';
import ListaScreen from '../screens/ListaScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import FavoritarModal from '../screens/FavoritarModal';

const Stack = createNativeStackNavigator<InicioStackParamList>();

export default function InicioStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fee2e2' },
        headerTintColor: '#b91c1c',
      }}
    >
      <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Pokémon' }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Ficha do Pokémon' }} />
      <Stack.Screen
        name="Favoritar"
        component={FavoritarModal}
        options={{ presentation: 'modal', title: 'Capturar Pokémon' }}
      />
    </Stack.Navigator>
  );
}
