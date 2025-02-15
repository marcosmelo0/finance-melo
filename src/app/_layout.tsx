import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setAuth(session.user);
        router.replace('/(tabs)/home/screen');
        return;
      }
      setAuth(null);
      router.replace('/(auth)/signin/page');
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />
    </Stack>
  )
}