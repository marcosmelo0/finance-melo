import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DivCard, ImageAddCard, ImageCard, MainCard, ScrollContainer, TitleAddCard } from "./styles";
import { Text } from "@/styles/container/style";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { router } from "expo-router";
import { TouchableOpacity } from 'react-native';

export default function Cards() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getUTCFullYear();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 200);

        const previousCardCount = user?.cards?.length || 0;

        const interval = setInterval(() => {
            if (user?.cards && user.cards.length < previousCardCount) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [user]);

    const handleAddCard = () => {
        router.replace('/(tabs)/creditCard/addCard');
    };

    const handleInfoCard = (cardId: number) => {
        router.replace({ pathname: '/(tabs)/creditCard/infoCard', params: { id: cardId } });
    };

    const getCardImage = (bank: string): any => {
        switch (bank) {
            case 'Nubank':
                return require('@/assets/images/card_nubank.png');
            case 'Inter':
                return require('@/assets/images/card_inter.png');
            case 'Brasil Card':
                return require('@/assets/images/brasil_card.png');
            default:
                return require('@/assets/images/add_cart.png');
        }
    };

    const getCardStyles = (bank: string) => {
        switch (bank) {
            case 'Nubank':
                return { topPosition: 15, bottomPosition: 70, leftPosition: 75 };
            case 'Inter':
                return { topPosition: 10, bottomPosition: 95, leftPosition: 75 };
            case 'Brasil Card':
                return { topPosition: 0, bottomPosition: 62, leftPosition: 20 };
            default:
                return { topPosition: 15, bottomPosition: 90, leftPosition: 75 };
        }
    };

    return (
        <MainCard>
            <ScrollContainer horizontal contentContainerStyle={{ flexDirection: 'row' }}>
                {user?.cards ? user.cards.map((card, index) => {
                    const formattedLimit = card.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    const formattedCurrentLimit = card.current_limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    const cardImage = getCardImage(card.bank);
                    const { topPosition, bottomPosition, leftPosition } = getCardStyles(card.bank);

                    return (
                        <TouchableOpacity onPress={() => handleInfoCard(card.id)} key={`${card.bank}-${index}`}>
                            <DivCard>
                                <ImageCard source={cardImage} />
                                <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', top: topPosition + 15, left: leftPosition, width: '50%' }}>
                                    <Text fontWeight='bold'>Limite: <Text>{formattedLimit}</Text></Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', top: topPosition + 40, left: leftPosition, width: '65%' }}>
                                    <Text fontWeight='bold'>Disponível: <Text>{formattedCurrentLimit}</Text></Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition, left: leftPosition, width: '65%' }}>
                                    <Text fontWeight='bold'>{card.name.toUpperCase()}</Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 25, left: leftPosition, width: '20%' }}>
                                    <Text fontWeight='500'>Fatura:</Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 50, left: leftPosition, width: '30%' }}>
                                    <Text>{card.due_date}/{month}/{year}</Text>
                                </ShimmerPlaceHolder>
                            </DivCard>
                        </TouchableOpacity>
                    );
                }) : null}
                <TouchableOpacity onPress={handleAddCard}>
                    <DivCard>
                        <TitleAddCard>Adicionar Cartão</TitleAddCard>
                        <ImageAddCard source={require('@/assets/images/add_cart.png')} />
                    </DivCard>
                </TouchableOpacity>
            </ScrollContainer>
        </MainCard>
    );
}