import InfoCardComponent from "@/components/creditCard/cards/infoCard";
import { Container, Text } from "@/styles/container/style";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { handleDeleteCard } from "@/constants/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function infoCard() {
    const { user } = useAuth()
    const { id } = useLocalSearchParams();
    const cardId = Number(id)

    return (
        <Container>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 10, top: -42, right: 0 }} onPress={() => handleDeleteCard(cardId)}>
                <Ionicons
                    name="trash"
                    size={24}
                    style={{ paddingRight: 14 }}
                    color={colors.white}
                />
            </TouchableOpacity>
            <ScrollView>
                <InfoCardComponent cardId={cardId} />
                
            </ScrollView>
        </Container>
    )
}