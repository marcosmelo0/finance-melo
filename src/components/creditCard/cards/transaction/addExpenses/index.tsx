import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useEffect } from "react";
import { DivFilter, Label, MainTransaction } from "../historyTransaction/styles";
import Icon from 'react-native-vector-icons/Feather';
import colors from "@/constants/colors";
import { View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { DivCard, DivDate } from "./styles";
import { Text } from "@/styles/container/style";
import { Button, Input } from "@/components/creditCard/cards/addCard/styles";
import { categories_expenses } from "@/constants/supabase";
import { Picker } from '@react-native-picker/picker';
import GetCard from "@/components/creditCard/cards/getCard";
import { ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";

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
    const [activeLabel, setActiveLabel] = useState('Despesas');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCard, setSelectedCard] = useState("");
    const [cards, setCards] = useState<any[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [value, setValue] = useState<number>();
    const [description, setDescription] = useState<string>();
    const [installments, setInstallments] = useState<string>('');

    useEffect(() => {
        GetCard().then((result) => {
            if (result) {
                setCards(result);
            }
        });
    }, []);

    useEffect(() => {
        if (paymentMethod === 'Pix') {
            setSelectedCard('');
        }
    }, [paymentMethod]);

    const handleSubmit = async () => {
        const { data, error } = await supabase
            .from('expenses')
            .insert([
                {
                    user_id: user?.id,
                    payment_method: paymentMethod,
                    value: value,
                    title: description,
                    category: selectedCategory,
                    card_id: selectedCard,
                    date: date,
                    installments: installments
                }
            ]);
    }

    console.log(selectedCard);

    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            <MainTransaction>
                <DivFilter>
                    <View style={{ position: 'absolute', backgroundColor: colors.zinc, zIndex: 10, left: 15, top: 10, borderRadius: 9999, padding: 1.5 }} >
                        <Icon name="arrow-up-right" size={20} color='red' />
                    </View>
                    <Label size={"50%"} active={activeLabel === 'Despesas'} onPress={() => setActiveLabel('Despesas')}>Despesas</Label>

                    <View style={{ position: 'absolute', backgroundColor: colors.zinc, zIndex: 10, right: 125, top: 10, borderRadius: 9999, padding: 1.5 }} >
                        <Icon name="arrow-down-left" size={20} color={colors.green} />
                    </View>
                    <Label size={"50%"} active={activeLabel === 'Receitas'} onPress={() => setActiveLabel('Receitas')}>Receitas</Label>
                </DivFilter>

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
                    <Picker.Item style={{ backgroundColor: 'aliceblue', color: colors.zinc }} label="Cartão" value="Cartão" />
                </Picker>

                {paymentMethod === 'Cartão' && (
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

                <Input
                    placeholder="Valor..."
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue' }}
                    keyboardType="numeric"
                />

                <Input
                    placeholder="Com o que foi minha despesa?..."
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue' }}
                />

                <Button style={{ marginTop: 20 }}>
                    <Text size={17} color={colors.white} fontWeight="bold">Salvar</Text>
                </Button>

            </MainTransaction>
        </ScrollView>
    )
}