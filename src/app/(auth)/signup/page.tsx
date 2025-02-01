import React from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Form, Container, Label, Input, Button, ButtonText, ErrorText } from "../signin/styles";
import Header from "@/components/header/auth/header";
import { router } from "expo-router";
import colors from "../../../../constants/colors";
import { supabase } from "@/lib/supabase";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }).min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.string().min(1, { message: "Email é obrigatório" }).email({ message: "Email inválido" }),
    password: z.string().min(1, { message: "Senha é obrigatória" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirmação de senha é obrigatória" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"]
});

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        resolver: zodResolver(schema)
    });
    const [loading, setLoading] = React.useState(false);

    const handleSignUp = async (data: SignUpData): Promise<void> => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name
                }
            }
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(auth)/signin/page');
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
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        placeholder='Nome completo...'
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                        </View>
                        <View>
                            <Label>Email</Label>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        placeholder='Digite seu email...'
                                        autoCapitalize="none"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </View>
                        <View>
                            <Label>Senha</Label>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        placeholder='Digite sua senha...'
                                        secureTextEntry
                                        autoCapitalize="none"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                        </View>
                        <View>
                            <Label>Confirmar senha</Label>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        placeholder='Digite sua senha...'
                                        secureTextEntry
                                        autoCapitalize="none"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                        </View>

                        <Button onPress={handleSubmit(handleSignUp)}>
                            <ButtonText>{loading ? 'Carregando...' : 'Criar conta'}</ButtonText>
                        </Button>
                    </Form>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}