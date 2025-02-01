import React from "react";
import { Container } from "./styles";
import { ActivityIndicator } from "react-native";
import colors from "../../constants/colors";

export default function Index() {


    return (
        <Container>
            <ActivityIndicator size={44} color={colors.green} />
        </Container>
    )
}