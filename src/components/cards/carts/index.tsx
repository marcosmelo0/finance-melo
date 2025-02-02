import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DivCard, ImageCart } from "./styles";
import { View } from "react-native";
import { Text } from "@/styles/container/style";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function Carts() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <DivCard>
            <ShimmerPlaceHolder
                visible={!loading}
                style={{ width: '90%', height: 200, borderRadius: 20 }}
            >
                <ImageCart source={require('@/assets/images/card_nubank.png')} />
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 70, left: 60 }}>
                <Text fontWeight='bold'>{user?.cart?.name}</Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 45, left: 60 }}>
                <Text>Fatura:</Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 25, left: 60 }}>
                <Text>{user?.cart?.due_date}</Text>
            </ShimmerPlaceHolder>
        </DivCard>
    )
}