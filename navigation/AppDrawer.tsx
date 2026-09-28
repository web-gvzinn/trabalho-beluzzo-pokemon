import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '../types';
import AppTabs from './AppTabs';
import SobreScreen from '../screens/SobreScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#b91c1c' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#b91c1c',
      }}
    >
      <Drawer.Screen name="Principal" component={AppTabs} options={{ title: 'Pokédex' }} />
      <Drawer.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o app' }} />
    </Drawer.Navigator>
  );
}
