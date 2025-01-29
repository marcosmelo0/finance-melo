import React from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Form, Container, Label, Input, Button, ButtonText } from "../../styles";
import Header from "@/components/header/header";
import { router } from "expo-router";
import colors from "@/constants/colors";
import { supabase } from "@/lib/supabase";

export default function Signup() {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
                <Container>
                    <Pressable style={{ backgroundColor: 'rgba(255,255,255,0.55)', alignSelf: 'flex-start', padding: 8, borderRadius: 8, marginBottom: 8 }} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Header title="Criar conta" />
                    <Form>
                        <View>
                            <Label>Nome completo</Label>
                            <Input placeholder='Nome completo...' onChangeText={setName} />
                        </View>
                        <View>
                            <Label>Email</Label>
                            <Input placeholder='Digite seu email...' onChangeText={setEmail} />
                        </View>
                        <View>
                            <Label>Senha</Label>
                            <Input placeholder='Digite sua senha...' secureTextEntry onChangeText={setPassword} />
                        </View>

                        <Button onPress={handleSignUp}>
                            <ButtonText>{loading ? 'Carregando...' : 'Criar conta'}</ButtonText>
                        </Button>
                    </Form>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}