import React, { useRef, useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Form, InputGroup, Label, Input, Button, ButtonText, ErrorText } from "@/styles/signin/style";
import Header from "@/components/header/auth/header";
import { router } from "expo-router";
import colors from "@/constants/colors";
import { supabase } from "@/lib/supabase";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/styles/container/style";

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
    image: string | null;
}

export default function Signup() {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        resolver: zodResolver(schema)
    });
    const [loading, setLoading] = useState(false);

    const nameLabelAnimation = useRef(new Animated.Value(0)).current;
    const emailLabelAnimation = useRef(new Animated.Value(0)).current;
    const passwordLabelAnimation = useRef(new Animated.Value(0)).current;
    const confirmPasswordLabelAnimation = useRef(new Animated.Value(0)).current;

    const handleFocus = (animation: Animated.Value): void => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = (animation: Animated.Value, value: string) => {
        if (!value) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleSignUp = async (data: SignUpData): Promise<void> => {
        setLoading(true);
        console.log(data)
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.confirmPassword,
            options: {
                data: {
                    name: data.name,
                    image: null,
                }
            }
        });

        if (error) {
            Alert.alert('Error', error.message);
            console.log(error)
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(auth)/signin/page');
    };

    const getFloatingLabelStyle = (animation: Animated.Value) => ({
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [14, -10],
        }),
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
                <Container>
                    <Pressable style={{ backgroundColor: 'rgba(255,255,255,0.55)', alignSelf: 'flex-start', padding: 8, borderRadius: 8, marginBottom: 8 }} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Header title="Criar conta" />
                    <Form>
                        <InputGroup>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            placeholder=' '
                                            onBlur={() => { onBlur(); handleBlur(nameLabelAnimation, value); }}
                                            onFocus={() => handleFocus(nameLabelAnimation)}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                        <Label style={getFloatingLabelStyle(nameLabelAnimation)}>
                                            Nome completo
                                        </Label>
                                    </>
                                )}
                            />
                            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                        </InputGroup>
                        <InputGroup>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            placeholder=' '
                                            autoCapitalize="none"
                                            onBlur={() => { onBlur(); handleBlur(emailLabelAnimation, value); }}
                                            onFocus={() => handleFocus(emailLabelAnimation)}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                        <Label style={getFloatingLabelStyle(emailLabelAnimation)}>
                                            Email
                                        </Label>
                                    </>
                                )}
                            />
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </InputGroup>
                        <InputGroup>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            placeholder=' '
                                            secureTextEntry
                                            autoCapitalize="none"
                                            onBlur={() => { onBlur(); handleBlur(passwordLabelAnimation, value); }}
                                            onFocus={() => handleFocus(passwordLabelAnimation)}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                        <Label style={getFloatingLabelStyle(passwordLabelAnimation)}>
                                            Senha
                                        </Label>
                                    </>
                                )}
                            />
                            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                        </InputGroup>
                        <InputGroup>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            placeholder=' '
                                            secureTextEntry
                                            autoCapitalize="none"
                                            onBlur={() => { onBlur(); handleBlur(confirmPasswordLabelAnimation, value); }}
                                            onFocus={() => handleFocus(confirmPasswordLabelAnimation)}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                        <Label style={getFloatingLabelStyle(confirmPasswordLabelAnimation)}>
                                            Confirmar senha
                                        </Label>
                                    </>
                                )}
                            />
                            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                        </InputGroup>

                        <Button onPress={handleSubmit(handleSignUp)}>
                            <ButtonText>{loading ? 'Carregando...' : 'Criar conta'}</ButtonText>
                        </Button>
                    </Form>
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
}