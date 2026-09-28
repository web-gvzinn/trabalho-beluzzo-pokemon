import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';
import InicioStack from './InicioStack';
import FavoritosScreen from '../screens/FavoritosScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => null,
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#b91c1c' },
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="InicioStack" component={InicioStack} options={{ title: 'Pokédex' }} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} options={{ title: 'Meu time' }} />
    </Tab.Navigator>
  );
}
