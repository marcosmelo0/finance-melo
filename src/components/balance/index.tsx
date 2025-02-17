import React, { useEffect, useState } from "react";
import { DivBalance } from "./styles";
import { Text } from "@/styles/container/style";
import { useAuth } from "@/contexts/AuthContext";

export default function Balance() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const formattedBalance = user?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <DivBalance>
            <Text size={16} fontWeight="bold">Saldo: </Text>
            <Text size={16} fontWeight="bold">{formattedBalance}</Text>
        </DivBalance>
    )
}