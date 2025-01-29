import React from "react";
import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { Form, Container, Label, Input, Button, ButtonText } from "./styles";
import Header from "@/components/header/header";
import { Link, router } from "expo-router";
import colors from "@/constants/colors";
import { supabase } from "@/lib/supabase";

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(panel)/profile/page');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
                <Container>
                    <Header title="Controle suas despesas" />
                    <Form>
                        <View>
                            <Label>Email</Label>
                            <Input placeholder='Digite seu email...' onChangeText={setEmail} />
                        </View>
                        <View>
                            <Label>Senha</Label>
                            <Input placeholder='Digite sua senha...' secureTextEntry onChangeText={setPassword} />
                        </View>

                        <Button onPress={handleSignIn}>
                            <ButtonText>{loading ? 'Carregando' : 'Acessar'}</ButtonText>
                        </Button>
                        <Link style={{ marginTop: 16, textAlign: 'center' }} href="/(auth)/signup/page">
                            <Text>Ainda não pussui uma conta? <Text style={{ color: 'blue' }}>Criar conta</Text></Text>
                        </Link>
                    </Form>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}