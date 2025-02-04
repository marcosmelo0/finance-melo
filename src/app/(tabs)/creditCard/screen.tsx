import AddCreditCardComponent from "@/components/creditCard/cards/addCard";
import { Container } from "@/styles/container/style";
import React from "react";
import { ScrollView } from "react-native";

export default function AddCreditCard() {
    return (
        <Container>
            <ScrollView>
                <AddCreditCardComponent />
            </ScrollView>
        </Container>
    )
}