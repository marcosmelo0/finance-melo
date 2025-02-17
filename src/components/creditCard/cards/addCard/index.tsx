import React, { useState } from 'react';
import { Form, Input, Button } from './styles';
import { Text } from '@/styles/container/style';
import { Picker } from '@react-native-picker/picker';
import colors from '@/constants/colors';
import { ActivityIndicator, Keyboard, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ImageCard } from '../styles';
import { TextInputMask } from 'react-native-masked-text';
import { toastConfigTransactions } from '@/constants/toastconfigs';
import { CardType, ExpiryDate } from '@/constants/supabase';

export default function AddCreditCardComponent() {
    const [CardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState<string | undefined>(undefined);
    const [limit, setLimit] = useState('');
    const [cardType, setCardType] = useState<CardType | undefined>(undefined);
    const [isPickerOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const { user } = useAuth();

    const handleSubmit = async () => {
        setLoading(true)
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
            setLoading(false)
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
            console.log(error)
            setLoading(false)
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
                    <Text fontWeight='500' style={{ position: 'absolute', left: 75, top: 125, zIndex: 10 }}>Limite: {limit}</Text>
                    <Text fontWeight='500' style={{ position: 'absolute', left: 75, top: 145, zIndex: 10 }}>Nome: <Text fontWeight='600' size={12}>{CardName.toUpperCase()}</Text></Text>
                    <Text fontWeight='500' style={{ position: 'absolute', left: 75, top: 165, zIndex: 10 }}>Dia da Fatura: {expiryDate}</Text>
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
                        style={{ backgroundColor: 'aliceblue', color: colors.zinc }}
                        key={type} label={type} value={type} />
                ))}
            </Picker>
            <Input
                placeholder="Nome do Titular"
                placeholderTextColor={colors.gray}
                value={CardName}
                onChangeText={setCardName}
            />
            <Picker
                selectedValue={expiryDate}
                onValueChange={(itemValue: string) => setExpiryDate(itemValue)}
                style={{ color: colors.zinc, backgroundColor: 'aliceblue' }}
            >
                <Picker.Item
                    style={{ backgroundColor: isPickerOpen ? colors.zinc : 'transparent', color: isPickerOpen ? colors.lightGray : colors.zinc }}
                    label="Selecionar Dia da Fatura"
                    value=""
                    enabled={false} />
                {Object.values(ExpiryDate).map((date) => (
                    <Picker.Item
                        style={{ backgroundColor: 'aliceblue', color: colors.zinc }}
                        key={date} label={date} value={date} />
                ))}
            </Picker>
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
            <Button onPress={handleSubmit} disabled={loading}>
                {!loading ? (
                    <Text fontWeight='bold' size={16} style={{ textAlign: 'center', color: colors.white }}>Criar Cartão</Text>
                ) : (
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Text fontWeight='bold' color={colors.white} size={16}>
                            Criando...
                        </Text>
                        <ActivityIndicator style={{ marginLeft: 10 }} color={colors.white} />
                    </View>
                )}
            </Button>
            <Toast config={toastConfigTransactions} />
        </Form>
    );
}