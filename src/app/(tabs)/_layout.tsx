import colors from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {

  return (
    <View style={{ flex: 1, backgroundColor: colors.zinc }}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'yellow', tabBarStyle: { backgroundColor: '#212121', height: 55, paddingTop: 5, borderWidth: 1.3, marginHorizontal: 15, borderRadius: 20, marginBottom: 15 } }}>
        <Tabs.Screen
          name="home/screen"
          options={{
            title: 'Home',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <FontAwesome size={34} name="home" color={focused ? 'yellow' : colors.white} />,
          }}
        />
        <Tabs.Screen
          name="transactions/screen"
          options={{
            title: 'Transações',
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
            headerShown: true,
            headerTitleStyle: { color: colors.white },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ paddingLeft: 14 }}
                color={colors.white}
                onPress={() => router.back()}

              />
            ),
            tabBarIcon: ({ color, focused }) => (
              <View style={{ borderRadius: 9999, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, top: 4 }}>
                <FontAwesome size={32} name="money" color={focused ? 'yellow' : colors.white} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="addTransaction/screen"
          options={{
            title: 'Adicionar Transação',
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: `${colors.white}`,
            tabBarIcon: ({ color, focused }) => (
              <View style={{ borderRadius: 9999, alignItems: 'center', justifyContent: 'center', width: 35, height: 35, backgroundColor: focused ? colors.zinc : colors.lightGray, top: 4 }}>
                <FontAwesome size={28} name="plus" color={focused ? 'yellow' : colors.zinc} />
              </View>
            ),
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ paddingLeft: 14 }}
                color={colors.white}
                onPress={() => router.back()}

              />
            ),
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
    </View>
  );
}

