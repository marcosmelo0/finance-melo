import React, { useEffect, useState } from "react";
import { DivBalance } from "./styles";
import { Text } from "@/styles/container/style";
import { useAuth } from "@/contexts/AuthContext";
import colors from "@/constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from "react-native";

export default function Balance() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [showBalance, setShowBalance] = useState(true)

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const formattedBalance = user?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <DivBalance>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Text color={colors.zinc} size={16} fontWeight="bold">Saldo disponível: </Text>
                <Text style={{ alignText: 'center' }} color={colors.zinc} size={showBalance ? 16 : 22} fontWeight="bold">{showBalance ? formattedBalance : '*******'}</Text>
                <Ionicons
                    name={showBalance ? "eye-off-outline" : "eye"}
                    size={24}
                    color="black"
                    onPress={() => setShowBalance(!showBalance)}
                />
            </View>
        </DivBalance>
    )
}