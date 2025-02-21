import InfoCardComponent from "@/components/creditCard/cards/infoCard";
import { Container } from "@/styles/container/style";
import React from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from 'expo-router';

export default function infoCard() {
    const { id } = useLocalSearchParams();
    const cardId = Number(id)

    return (
        <Container>
            <ScrollView>
                <InfoCardComponent cardId={cardId} />
            </ScrollView>
        </Container>
    )
}