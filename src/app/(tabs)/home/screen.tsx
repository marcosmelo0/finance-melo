import React from "react";
import { Text } from "react-native";
import { supabase } from "@/lib/supabase";
import { Container } from "./styles";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {

    const { user } = useAuth();

    function handleLogout() {
        supabase.auth.signOut();
    }

    return (
        <Container>
            <Text style={{color: 'white'}} onPress={handleLogout}>{user?.id}</Text>
        </Container>
    )
}