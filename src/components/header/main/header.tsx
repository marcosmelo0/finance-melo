import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, DivAvatar, DivWelcome, MainHeaderContainer } from "./style";
import colors from "../../../constants/colors";
import { Text } from "@/styles/container/style";
import { supabase } from "@/lib/supabase";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function MainHeader() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const getInitials = (name: string) => {
        if (!name) return "";
        const names = name.split(" ").filter(n => n.length > 3);
        return names.length >= 2 ? `${names[0][0]}${names[1][0]}` : names[0][0];
    };

    const getGreeting = () => {
        const now = new Date();
        const hours = now.getUTCHours() - 3;
        switch (true) {
            case hours >= 6 && hours < 12:
                return "Bom dia!";
            case hours >= 12 && hours < 18:
                return "Boa tarde!";
            default:
                return "Boa noite!";
        }
    };

    const initials = useMemo(() => getInitials(user?.name || ""), [user?.name]);
    const greeting = useMemo(getGreeting, []);

    if (loading) {
        return (
            <MainHeaderContainer>
                <DivAvatar>
                    <ShimmerPlaceHolder visible={!loading} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </DivAvatar>
                <DivWelcome>
                    <ShimmerPlaceHolder  visible={!loading} style={{ width: 100, height: 20, marginBottom: 5 }} />
                    <ShimmerPlaceHolder visible={!loading} style={{ width: 150, height: 20 }} />
                </DivWelcome>
                <ShimmerPlaceHolder visible={!loading} style={{ width: 65, height: 65, borderRadius: 32.5 }} />
            </MainHeaderContainer>
        );
    }

    return (
        <MainHeaderContainer>
            <DivAvatar>
                {user?.image ? (
                    <Avatar source={{ uri: user?.image }} size={40} />
                ) : (
                    <Text color={colors.zinc}>{initials}</Text>
                )}
            </DivAvatar>
            <DivWelcome>
                <Text fontWeight="bold">{user?.name}</Text>
                <Text onPress={() => supabase.auth.signOut()}>{greeting}</Text>
            </DivWelcome>
            <Avatar source={require('@/assets/images/splash_logo.png')} size={65} />
        </MainHeaderContainer>
    );
}