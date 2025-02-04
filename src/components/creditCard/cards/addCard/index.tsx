import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from './styles';
import { Text } from '@/styles/container/style';
import { Picker } from '@react-native-picker/picker';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Keyboard } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ImageCard } from '../styles';

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', bottom: 55 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold'
            }}
            text2Style={{
                fontSize: 13,
                color: 'gray'
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold'
            }}
            text2Style={{
                fontSize: 13,
                color: 'gray'
            }}
        />
    )
};

enum CardType {
    Nubank = 'Nubank',
    Inter = 'Inter',
    BrasilCard = 'Brasil Card'
}

export default function AddCreditCardComponent() {
    const [CardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [limit, setLimit] = useState('');
    const [cardType, setCardType] = useState<CardType | string>('');
    const { user } = useAuth();

    const handleSubmit = async () => {
        Keyboard.dismiss();

        const cardData = {
            user_id: user?.id,
            limit: limit,
            due_date: expiryDate,
            name: CardName,
            bank: cardType
        };

        try {
            const { error } = await supabase
                .from('cards')
                .insert([cardData]);

            if (error) throw error;

            setCardName('');
            setExpiryDate('');
            setLimit('');
            setCardType('');

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Parabéns, você criou um cartão!',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao adicionar cartão',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            console.error('Erro ao adicionar cartão:', error);
        }
    };

    const getCardImage = (bank: string) => {
        switch (bank) {
            case CardType.Nubank:
                return require('@/assets/images/card_nubank.png');
            case CardType.Inter:
                return require('@/assets/images/card_inter.png');
            case CardType.BrasilCard:
                return require('@/assets/images/brasil_card.png');
            default:
                return null;
        }
    };

    return (
        <Form>
            {cardType && cardType !== '' && (
                <>
                    <Text fontWeight='500' style={{position: 'absolute', left: 30, top: 30, zIndex: 10}}>Limite: {limit}</Text>
                    <ImageCard style={{ width: '100%' }} source={getCardImage(cardType)} />
                </>
            )}
            <View>
                <Picker
                    selectedValue={cardType}
                    onValueChange={(itemValue: string) => setCardType(itemValue)}
                    style={{ color: colors.white, backgroundColor: colors.black }}
                >
                    <Picker.Item label="Selecionar Banco" value="" enabled={false} />
                    <Picker.Item label="Nubank" value={CardType.Nubank} />
                    <Picker.Item label="Inter" value={CardType.Inter} />
                    <Picker.Item label="Brasil Card" value={CardType.BrasilCard} />
                </Picker>
                <Ionicons name="arrow-down" size={24} color={colors.white} style={{ position: 'absolute', right: 10, top: 15 }} />
            </View>
            <Input
                placeholder="Nome do Titular"
                placeholderTextColor={colors.gray}
                value={CardName}
                onChangeText={setCardName}
            />
            <Input
                placeholder="Dia do vencimento ex: 01"
                placeholderTextColor={colors.gray}
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
            />
            <Input
                placeholder="Limite do cartão"
                placeholderTextColor={colors.gray}
                value={limit}
                onChangeText={setLimit}
                keyboardType="numeric"
            />
            <Button onPress={handleSubmit}>
                <Text fontWeight='bold' size={16} style={{ textAlign: 'center', color: colors.white }}>Criar Cartão</Text>
            </Button>
            <Toast config={toastConfig} />
        </Form>
    );
}