import colors from '@/constants/colors';
import { router, Tabs } from 'expo-router';
import { Ionicons, Feather, FontAwesome, FontAwesome6, Octicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {

  return (
    <View style={{ flex: 1, backgroundColor: colors.zinc, justifyContent: 'center' }}>
      <Tabs screenOptions={{ tabBarActiveTintColor: colors.green, tabBarStyle: { backgroundColor: '#212121', height: 55, paddingTop: 5, borderWidth: 1.3, marginHorizontal: 15, borderRadius: 20, marginBottom: 15 } }}>
        <Tabs.Screen
          name="home/screen"
          options={{
            title: 'Home',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => <FontAwesome size={34} name="home" color={focused ? colors.green : colors.white} />,
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
            headerRight: () => (
              <FontAwesome6
                name="money-bill-transfer"
                size={24}
                style={{ paddingRight: 14, top: 3 }}
                color="#999999"
              />
            ),
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, focused }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 32, borderRadius: 999, top: 3.5 }}>
                <FontAwesome6 size={31} name="money-bill-transfer" color={focused ? colors.green : colors.white} />
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
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, focused }) => (
              <View style={{ borderRadius: 999, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, top: 3 }} >
                <FontAwesome size={42} name="plus-circle" color={focused ? colors.green : colors.white} />
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
          name="goals/screen"
          options={{
            title: 'Metas e objetivos',
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: `${colors.white}`,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, focused }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 32, borderRadius: 999, top: 3 }}>
                <Feather size={32} name="pie-chart" color={focused ? colors.green : colors.white} />
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
          name="creditCard/addCard"
          options={{
            title: 'Adicionar cartão',
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: `${colors.white}`,
            tabBarStyle: { display: 'none' },
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
        <Tabs.Screen
          name="creditCard/infoCard"
          options={{
            title: 'Meu cartão',
            tabBarShowLabel: false,
            headerStyle: { backgroundColor: colors.zinc, borderBottomWidth: 1, borderColor: "#ddd6" },
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: `${colors.white}`,
            tabBarStyle: { display: 'none' },
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

