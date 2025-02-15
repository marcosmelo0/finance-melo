import React from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "@/constants/colors";
import { Container } from "@/styles/container/style";

export default function Index() {


    return (
        <Container>
            <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <ActivityIndicator size={44} color={colors.green} />
            </View>
        </Container>
    )
}