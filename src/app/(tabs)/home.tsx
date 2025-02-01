import React from "react";
import { Text } from "react-native";
import Container from "./styles";
import { supabase } from "@/lib/supabase";

export default function Home() {

    function handleLogout() {
        supabase.auth.signOut();
    }

    return (
        <Container>
            <Text onPress={handleLogout}>Home</Text>
        </Container>
    )
}