import React from "react";
import { Text, View } from "react-native";
import { Form, Container, Label, Input, Button, ButtonText } from "./styles";
import Header from "@/components/header/header";
import { Link } from "expo-router";

export default function Login() {
    return (
        <Container>
            <Header />
            <Form>
                <View>
                    <Label>Email</Label>
                    <Input placeholder='Digite seu email...' />
                </View>
                <View>
                    <Label>Senha</Label>
                    <Input placeholder='Digite sua senha...' secureTextEntry />
                </View>

                <Button>
                    <ButtonText>Acessar</ButtonText>
                </Button>
                <Link style={{marginTop: 16, textAlign: 'center'}} href="/(auth)/signup/page">
                    <Text>Ainda não pussui uma conta? Cadastre-se</Text>
                </Link>
            </Form>
        </Container>
    )
}