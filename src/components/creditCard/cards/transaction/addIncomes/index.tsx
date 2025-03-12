import React, { useState } from "react";
import { Keyboard, ScrollView, } from "react-native";
import { MainTransaction } from "../historyTransaction/styles";
import { DivDate } from "../addExpenses/styles";
import Icon from "react-native-vector-icons/Feather";
import colors from "@/constants/colors";
import { Text } from "@/styles/container/style";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "@/styles/signin/style";
import { Picker } from "@react-native-picker/picker";
import { Category } from "@/constants/supabase";
import { TextInputMask } from "react-native-masked-text";
import Toast from "react-native-toast-message";
import { Button } from "../../addCard/styles";
import { toastConfigTransactions } from "@/constants/toastconfigs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function AddIncomes() {
    const { user } = useAuth()
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleSubmit = async () => {
        try {
            Keyboard.dismiss();
            const unmaskedValue = value ? parseFloat(value.replace(/[^\d]/g, '')) / 100 : 0;
            if (unmaskedValue <= 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'A receita deve ser maior que zero.',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                return;
            }

            const { data, error } = await supabase
                .from('incomes')
                .insert([
                    {
                        user_id: user?.user_id,
                        category: selectedCategory,
                        value: unmaskedValue,
                        title: description,
                        date: date,
                    }
                ]);

            Toast.show({
                type: 'success',
                text1: 'Ótimo!',
                text2: 'Receita cadastrada com sucesso!',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 70,
                bottomOffset: 40,
            });

            setDescription(""); // Certifique-se de que não há espaços em branco
            setSelectedCategory('');
            setValue('');
            setDate(new Date());

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao adicionar a receita.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            console.error('Error inserting new income:', error.message);
        }
    };

    return (
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, zIndex: 1 }}>
            <MainTransaction>
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
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={{ marginTop: 15, color: colors.zinc, backgroundColor: 'aliceblue' }}
                >
                    <Picker.Item color={colors.zinc} label="Selecionar categoria" value="" enabled={false} />
                    {Object.values(Category).map((category) => (
                        <Picker.Item style={{ backgroundColor: selectedCategory === category ? 'aliceblue' : colors.zinc, color: colors.white }} key={category} label={category} value={category} />
                    ))}
                </Picker>

                {description && (
                    <Text color={colors.white} fontWeight="bold" style={{ marginTop: 15 }}>
                        Descrição:
                    </Text>
                )}

                <Input
                    value={description}
                    onChangeText={setDescription}
                    placeholder="De onde veio o dinheiro?"
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue', color: colors.zinc }}
                />

                {value && (
                    <Text color={colors.white} fontWeight="bold" style={{ marginTop: 15 }}>
                        Valor:
                    </Text>
                )}

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
                    placeholder="Quanto recebi?"
                    placeholderTextColor={colors.zinc}
                    style={{ marginTop: 15, padding: 10, borderWidth: 1, borderColor: colors.zinc, borderRadius: 10, backgroundColor: 'aliceblue', color: colors.zinc }}
                    keyboardType="numeric"
                />

                <Button style={{ marginTop: 20 }} onPress={handleSubmit}>
                    <Text size={17} color={colors.white} fontWeight="bold">Salvar</Text>
                </Button>
                <Toast config={toastConfigTransactions} />
            </MainTransaction>
        </ScrollView>
    );
}