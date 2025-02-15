import React, { useRef, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Alert, Animated } from "react-native";
import { Form, InputGroup, Label, Input, Button, ButtonText } from "@/styles/signin/style";
import Header from "@/components/header/auth/header";
import { Link, router } from "expo-router";
import colors from "@/constants/colors";
import { supabase } from "@/lib/supabase";
import { Container } from "@/styles/container/style";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailLabelAnimation = useRef(new Animated.Value(email ? 1 : 0)).current;
    const passwordLabelAnimation = useRef(new Animated.Value(password ? 1 : 0)).current;

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

    const handleSignIn = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(tabs)/home/screen');
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
                    <Header title="Entrar" />
                    <Form>
                        <InputGroup>
                            <Input
                                placeholder=' '
                                value={email}
                                autoCapitalize="none"
                                onChangeText={setEmail}
                                onFocus={() => handleFocus(emailLabelAnimation)}
                                onBlur={() => handleBlur(emailLabelAnimation, email)}
                            />
                            <Label style={getFloatingLabelStyle(emailLabelAnimation)}>
                                Email
                            </Label>
                        </InputGroup>
                        <InputGroup>
                            <Input
                                placeholder=' '
                                value={password}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={setPassword}
                                onFocus={() => handleFocus(passwordLabelAnimation)}
                                onBlur={() => handleBlur(passwordLabelAnimation, password)}
                            />
                            <Label style={getFloatingLabelStyle(passwordLabelAnimation)}>
                                Senha
                            </Label>
                        </InputGroup>

                        <Button onPress={handleSignIn}>
                            <ButtonText>{loading ? 'Carregando' : 'Acessar'}</ButtonText>
                        </Button>
                        <Link style={{ marginTop: 16, textAlign: 'center' }} href="/(auth)/signup/page">
                            <Text>Ainda não possui uma conta? <Text style={{ color: 'blue' }}>Criar conta</Text></Text>
                        </Link>
                    </Form>
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
}