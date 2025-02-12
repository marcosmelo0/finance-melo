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
import { TextInputMask } from 'react-native-masked-text';

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

    const formattedLimit = limit ? Number(limit.replace(/[^0-9,-]+/g, '').replace(',', '.')).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';


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
                    <Text fontWeight='500' style={{ position: 'absolute', left: 77, top: 120, zIndex: 10 }}>Nome: {CardName}</Text>
                    <Text fontWeight='500' style={{ position: 'absolute', left: 77, top: 145, zIndex: 10 }}>Dia da fatura: {expiryDate}</Text>
                    <Text fontWeight='500' style={{ position: 'absolute', left: 77, top: 170, zIndex: 10 }}>Limite: {formattedLimit}</Text>
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
            <View>
                <Picker
                    selectedValue={expiryDate}
                    onValueChange={(itemValue: string) => setExpiryDate(itemValue)}
                    style={{ color: colors.white, backgroundColor: colors.black }}
                >
                    <Picker.Item label="Dia do vencimento" value="" enabled={false} />
                    {[...Array(31)].map((_, i) => (
                        <Picker.Item key={i} label={(i < 9 ? `0${i + 1}` : `${i + 1}`).toString()} value={(i < 9 ? `0${i + 1}` : `${i + 1}`).toString()} />
                    ))}
                </Picker>
                <Ionicons name="arrow-down" size={24} color={colors.white} style={{ position: 'absolute', right: 10, top: 15 }} />
            </View>
            <TextInputMask
                type={'money'}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$ ',
                    suffixUnit: ''
                }}
                customTextInput={Input}
                customTextInputProps={{
                    placeholder: "Limite do cartão",
                    placeholderTextColor: colors.gray,
                    keyboardType: "numeric"
                }}
                value={limit}
                onChangeText={setLimit}
            />
            <Button onPress={handleSubmit}>
                <Text fontWeight='bold' size={16} style={{ textAlign: 'center', color: colors.white }}>Criar Cartão</Text>
            </Button>
            <Toast config={toastConfig} />
        </Form>
    );
}