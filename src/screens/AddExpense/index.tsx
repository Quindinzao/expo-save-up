import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import TextField from "../../components/TextField";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { expensesRepository } from "../../database/repositories/expensesRepository";
import { categoriesRepository } from "../../database/repositories/categoryRepository";
import FormBody from "../../components/FormBody";
import FormFooter from "../../components/FormFooter";
import Header from "../../components/Header";

/** Retorna a data de hoje no formato YYYY-MM-DD (compatível com as queries do banco) */
function todayISO(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function AddExpense() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [amountText, setAmountText] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([]);

    useEffect(() => {
        const cats = categoriesRepository.getAll();
        setCategoryOptions(cats.map((c) => ({ label: c.name, value: c.id })));
        if (cats.length > 0) setCategoryId(cats[0].id);
    }, []);

    function handleAddExpense() {
        const trimmedName = name.trim();
        if (!trimmedName) {
            Alert.alert("Campo obrigatório", "Informe o nome da despesa.");
            return;
        }

        if (!categoryId) {
            Alert.alert("Campo obrigatório", "Selecione uma categoria.");
            return;
        }

        const parsed = parseFloat(amountText.replace(",", "."));
        if (isNaN(parsed) || parsed <= 0) {
            Alert.alert("Valor inválido", "Informe um valor maior que zero.");
            return;
        }

        try {
            expensesRepository.insert({
                id: String(Date.now()),
                user_id: "1",
                category_id: categoryId,
                name: trimmedName,
                description: "",
                amount: parsed,
                date: todayISO(),
                created_at: new Date().toISOString(),
                edited_at: "",
            });

            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar a despesa. Tente novamente.");
            console.error(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title="Nova Despesa" onBack={navigation.goBack} />

            <FormBody>
                <TextField
                    label="Nome da Despesa"
                    placeholder="Ex: Aluguel"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                />

                <TextField
                    label="Valor (R$)"
                    placeholder="0,00"
                    keyboardType="decimal-pad"
                    value={amountText}
                    onChangeText={setAmountText}
                    returnKeyType="done"
                />

                <Dropdown
                    label="Categoria"
                    options={categoryOptions}
                    value={categoryId}
                    placeholder="Selecione uma categoria..."
                    onChange={(opt) => setCategoryId(opt.value)}
                />
            </FormBody>

            <FormFooter
                textButton="Salvar Despesa"
                textCancel="Cancelar"
                onPressButton={handleAddExpense}
                onPressCancel={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
}
