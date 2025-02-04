import colors from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
      <Tabs.Screen
        name="creditCard/screen"
        options={{
          title: 'Adicionar cartão',
          tabBarShowLabel: false,
          headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: `${colors.white}`,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              style={{ paddingLeft: 14 }}
              color={colors.white}
              onPress={() => router.back()}
              
            />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
