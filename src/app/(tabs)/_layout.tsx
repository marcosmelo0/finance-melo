import colors from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarStyle: { backgroundColor: colors.zinc } }}>
      <Tabs.Screen
        name="home/screen"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={34} name="home" color={colors.green} />,
        }}
      />
    </Tabs>
  );
}
