import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DivCard, ImageAddCard, ImageCart, MainCard, ScrollContainer, TitleAddCard } from "./styles";
import { Text } from "@/styles/container/style";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { object } from "zod";
import Index from "@/app";
import { View } from "react-native";

export default function Carts() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <MainCard>
            <ScrollContainer horizontal contentContainerStyle={{ flexDirection: 'row' }}>
                <DivCard>
                    {user?.cart ? (
                        <>
                            <ShimmerPlaceHolder
                                visible={!loading}
                                style={{ width: '90%', height: 200, borderRadius: 20 }}
                            >
                                <ImageCart source={require('@/assets/images/card_nubank.png')} />
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 97, left: 60 }}>
                                <Text fontWeight='bold'>{user?.cart?.name}</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 75, left: 60 }}>
                                <Text>Fatura:</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: 55, left: 60 }}>
                                <Text>{user?.cart?.due_date}</Text>
                            </ShimmerPlaceHolder>
                        </>
                    ) : (
                        <View style={{ height: 200 }}>
                            <Index />
                        </View>
                    )}
                </DivCard>
                <DivCard>
                    {user?.cart ? (
                        <>
                            <TitleAddCard>Adicionar Cartão</TitleAddCard>
                            <ImageAddCard source={require('@/assets/images/add_cart.png')} />
                        </>

                    ) : (
                        <View style={{ height: 200 }}>
                            <Index />
                        </View>
                    )}
                </DivCard>
            </ScrollContainer>
        </MainCard>
    )
}