import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useEffect } from "react";
import { MainTransaction } from "../historyTransaction/styles";
import Icon from 'react-native-vector-icons/Feather';
import colors from "@/constants/colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { DivCard, DivDate } from "./styles";
import { Text } from "@/styles/container/style";
import { Button, Input } from "@/components/creditCard/cards/addCard/styles";
import { categories_expenses } from "@/constants/supabase";
import { Picker } from '@react-native-picker/picker';
import GetCard from "@/components/creditCard/cards/getCard";
import { ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { TextInputMask } from 'react-native-masked-text';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#00c853',
                borderLeftWidth: 10,
                backgroundColor: 'aliceblue',
                borderRadius: 10,
                margin: 5,
                shadowColor: '#00c853',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                top: 50
            }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.zinc
            }}
            text2Style={{
                fontSize: 14,
                color: colors.zinc
            }}
            renderLeadingIcon={() => (
                <Icon name="check-circle" size={24} color="#00c853" style={{ marginRight: 10 }} />
            )}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: '#d50000',
                borderLeftWidth: 5,
                backgroundColor: '#1b1b1b',
                borderRadius: 10,
                margin: 10,
                shadowColor: '#d50000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                top: 50
            }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'red'
            }}
            text2Style={{
                fontSize: 14,
                color: 'aliceblue'
            }}
            renderLeadingIcon={() => (
                <Icon name="alert-circle" size={24} color="red" style={{ marginRight: 10 }} />
            )}
        />
    )
};

enum Installments {
    One = "1x",
    Two = "2x",
    Three = "3x",
    Four = "4x",
    Five = "5x",
    Six = "6x",
    Seven = "7x",
    Eight = "8x",
    Nine = "9x",
    Ten = "10x",
    Eleven = "11x",
    Twelve = "12x"
}

export default function AddExpenseTransaction() {
    const { user } = useAuth();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCard, setSelectedCard] = useState("");
    const [cards, setCards] = useState<any[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [value, setValue] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [installments, setInstallments] = useState<string>('');

    useEffect(() => {
        if (user?.id) {
            GetCard({ userId: user.id }).then((result) => {
                result && setCards(result);
            });
        }
    }, []);

    useEffect(() => {
        paymentMethod === 'Pix' && setSelectedCard('');
    }, [paymentMethod]);

    const handleSubmit = async () => {
        try {
            const unmaskedValue = value ? parseFloat(value.replace(/[^\d]/g, '')) / 100 : 0;
            if (unmaskedValue <= 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'A despesa deve ser maior que zero.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                return;
            }

            const numericInstallments = installments ? parseInt(installments.replace(/[^\d]/g, '')) : 0;
            const { data, error } = await supabase
                .from('expenses')
                .insert([
                    {
                        user_id: user?.id,
                        type_payment: paymentMethod,
                        value: unmaskedValue,
                        title: description,
                        category: selectedCategory,
                        card_id: selectedCard,
                        date: date,
                        installments: numericInstallments
                    }
                ]);

            Toast.show({
                type: 'success',
                text1: 'Ótimo!',
                text2: 'Despesa cadastrada com sucesso!',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });

            setPaymentMethod('');
            setSelectedCard('');
            setInstallments('');
            setSelectedCategory('');
            setValue('');
            setDescription('');
            setDate(new Date());
            setDescription('');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao adicionar despesa.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            console.error('Error inserting new expense:', error.message);
        }
    }

    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, zIndex: 1 }}>
            <MainTransaction style={{ zIndex: 1 }}>

                <DivDate onPress={() => setShowPicker(true)}>
                    <Icon name="calendar" size={20} color={colors.zinc} />
                    <Text color={colors.zinc} fontWeight="bold">
                        {date.getDate()}/{(date.getMonth() + 1).toString().padStart(2, '0')}/{date.getFullYear()}
                    </Text>
                </DivDate>

                {showPicker && (
                    <RNDateTimePicker
                        maximumDate={new Date()}
                        display="calendar"
                        mode="date"
                        value={date}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setShowPicker(false);
                            setDate(currentDate);
                        }}
                    />
                )}
                <Picker
                    selectedValue={paymentMethod}
                    onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                    style={{ marginTop: 15, color: colors.zinc, backgroundColor: 'aliceblue' }}
                >
                    <Picker.Item color={colors.zinc} label="Tipo de pagamento" enabled={false} value="" />
                    <Picker.Item style={{ backgroundColor: 'aliceblue', color: colors.zinc }} label="Pix" value="Pix" />
                    <Picker.Item style={{ backgroundColor: 'aliceblue', color: colors.zinc }} label="Cartão" value="Cartão de crédito" />
                </Picker>

                {paymentMethod === 'Cartão de crédito' && (
                    <DivCard>
                        <Picker
                            selectedValue={selectedCard}
                            onValueChange={(itemValue) => setSelectedCard(itemValue)}
                            style={{ flex: 1, color: colors.zinc, backgroundColor: 'aliceblue' }}
                        >
                            <Picker.Item color={colors.zinc} label="Cartão..." value="" enabled={false} />
                            {cards.map((card) => (
                                <Picker.Item style={{ backgroundColor: selectedCard === card.id ? 'aliceblue' : colors.zinc, color: colors.white }} key={card.id} label={`${card.name} - ${card.bank}`} value={card.id} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={installments}
                            onValueChange={(itemValue) => setInstallments(itemValue)}
                            style={{ flex: 1, color: colors.zinc, backgroundColor: 'aliceblue' }}
                        >
                            <Picker.Item color={colors.zinc} label="Parcelas..." value="" enabled={false} />
                            {Object.values(Installments).map((installment) => (
                                <Picker.Item style={{ backgroundColor: installments === installment ? 'aliceblue' : colors.zinc, color: colors.white }} key={installment} label={installment} value={installment} />
                            ))}
                        </Picker>
                    </DivCard>
                )}

                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={{ marginTop: 15, color: colors.zinc, backgroundColor: 'aliceblue' }}
                >
                    <Picker.Item color={colors.zinc} label="Selecionar categoria" value="" enabled={false} />
                    {Object.values(categories_expenses).map((category) => (
                        <Picker.Item style={{ backgroundColor: selectedCategory === category ? 'aliceblue' : colors.zinc, color: colors.white }} key={category} label={category} value={category} />
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
                    value={value}
                    onChangeText={text => setValue(text)}
                    placeholder="Valor..."
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue', color: colors.zinc }}
                    keyboardType="numeric"
                />

                <Input
                    placeholder="Com o que foi minha despesa?..."
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue', color: colors.zinc }}
                    onChangeText={setDescription}
                />

                <Button style={{ marginTop: 20 }} onPress={handleSubmit}>
                    <Text size={17} color={colors.white} fontWeight="bold">Salvar</Text>
                </Button>

                <Toast config={toastConfig} />
            </MainTransaction>
        </ScrollView>
    )
}