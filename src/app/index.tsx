import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "@/constants/colors";
import { Container } from "@/styles/container/style";

export default function Index() {


    return (
        <Container>
            <ActivityIndicator size={44} color={colors.green} />
        </Container>
    )
}