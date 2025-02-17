import React, { useState } from 'react';
import { Form, Input, Button } from './styles';
import { Text } from '@/styles/container/style';
import { Picker } from '@react-native-picker/picker';
import colors from '@/constants/colors';
import { Keyboard } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ImageCard } from '../styles';
import { TextInputMask } from 'react-native-masked-text';

export const toastConfig = {
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
    const [cardType, setCardType] = useState<CardType | undefined>(undefined);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const { user } = useAuth();

    const handleSubmit = async () => {
        Keyboard.dismiss();

        const unmaskedLimit = limit.replace(/[R$\s.]/g, '').replace(',', '.');

        const cardData = {
            user_id: user?.user_id,
            limit: unmaskedLimit,
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
            setCardType(undefined);

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
            {cardType && cardType !== undefined && (
                <>
                    <Text fontWeight='500' style={{ position: 'absolute', left: 30, top: 30, zIndex: 10 }}>Limite: {limit}</Text>
                    <ImageCard style={{ width: '100%' }} source={getCardImage(cardType)} />
                </>
            )}

            <Picker
                selectedValue={cardType}
                onValueChange={(itemValue: CardType) => setCardType(itemValue as CardType)}
                style={{ color: colors.zinc, backgroundColor: 'aliceblue' }}
            >
                <Picker.Item
                    style={{ backgroundColor: isPickerOpen ? colors.zinc : 'transparent', color: isPickerOpen ? colors.lightGray : colors.zinc }}
                    label="Selecionar Banco"
                    value=""
                    enabled={false} />
                {Object.values(CardType).map((type) => (
                    <Picker.Item
                        style={{ backgroundColor: colors.zinc, color: colors.white }}
                        key={type} label={type} value={type} />
                ))}
            </Picker>
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
            <TextInputMask
                type={'money'}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$ ',
                    suffixUnit: ''
                }}
                placeholder="Limite do cartão"
                placeholderTextColor={colors.gray}
                value={limit}
                onChangeText={setLimit}
                customTextInput={Input}
                customTextInputProps={{
                    keyboardType: 'numeric'
                }}
            />
            <Button onPress={handleSubmit}>
                <Text fontWeight='bold' size={16} style={{ textAlign: 'center', color: colors.white }}>Criar Cartão</Text>
            </Button>
            <Toast config={toastConfig} />
        </Form>
    );
}