import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import TextField from "../../components/TextField";
import Dropdown, { DropdownOption } from "../../components/Dropdown";
import { recordsRepository, TransactionRecord } from "../../database/repositories/recordsRepository";
import { categoriesRepository } from "../../database/repositories/categoryRepository";
import FormBody from "../../components/FormBody";
import FormFooter from "../../components/FormFooter";
import Header from "../../components/Header";
import DateField from "../../components/DateField";
import { formatCurrency } from "../../utils/masks";

/** Retorna a data de hoje no formato YYYY-MM-DD (compatível com as queries do banco) */
function todayISO(): string {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function AddRecord() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: { date?: string; record?: TransactionRecord } }>>();
    const editingRecord = route.params?.record;

    const [type, setType] = useState<"incoming" | "outgoing">(editingRecord?.type || "outgoing");
    const [name, setName] = useState(editingRecord?.name || "");
    const [amountText, setAmountText] = useState(editingRecord?.amount ? formatCurrency(editingRecord.amount.toFixed(2)) : "");
    const [categoryId, setCategoryId] = useState(editingRecord?.category_id || "");
    const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([]);
    const [date, setDate] = useState(editingRecord?.date || route.params?.date || todayISO());
    const [repeat, setRepeat] = useState<string | null>(editingRecord?.repeat || null);
    const [repeatUntil, setRepeatUntil] = useState<string | null>(editingRecord?.repeat_until || null);

    const typeOptions: DropdownOption[] = [
        { label: "Saída (Despesa)", value: "outgoing" },
        { label: "Entrada (Receita)", value: "incoming" },
    ];

    const repeatOptions: DropdownOption[] = [
        { label: "Não se repete", value: "none" },
        { label: "Diariamente", value: "daily" },
        { label: "Mensalmente", value: "monthly" },
        { label: "Anualmente", value: "yearly" },
    ];

    useEffect(() => {
        const cats = categoriesRepository.getByType(type);
        setCategoryOptions(cats.map((c) => ({ label: c.name, value: c.id })));
        
        // Se estivermos editando e o tipo não mudou, mantém a categoria atual
        if (editingRecord && editingRecord.type === type && !categoryId) {
            setCategoryId(editingRecord.category_id);
        } else if (cats.length > 0 && !categoryId) {
            setCategoryId(cats[0].id);
        }
    }, [type]);

    function handleSaveRecord() {
        const trimmedName = name.trim();
        if (!trimmedName) {
            Alert.alert("Campo obrigatório", "Informe o nome do registro.");
            return;
        }

        if (!categoryId) {
            Alert.alert("Campo obrigatório", "Selecione uma categoria.");
            return;
        }

        const parsed = parseFloat(amountText.replace(/\./g, "").replace(",", "."));
        if (isNaN(parsed) || parsed <= 0) {
            Alert.alert("Valor inválido", "Informe um valor maior que zero.");
            return;
        }

        try {
            if (editingRecord) {
                recordsRepository.update({
                    ...editingRecord,
                    category_id: categoryId,
                    name: trimmedName,
                    amount: parsed,
                    type: type,
                    date: date,
                    repeat: repeat === "none" ? null : (repeat as any),
                    repeat_until: repeat === "none" ? null : repeatUntil,
                });
            } else {
                recordsRepository.insert({
                    id: String(Date.now()),
                    user_id: "1",
                    category_id: categoryId,
                    name: trimmedName,
                    description: "",
                    amount: parsed,
                    type: type,
                    date: date,
                    repeat: repeat === "none" ? null : (repeat as any),
                    repeat_until: repeat === "none" ? null : repeatUntil,
                    created_at: new Date().toISOString(),
                    edited_at: "",
                });
            }

            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar o registro. Tente novamente.");
            console.error(e);
        }
    }

    function handleDeleteRecord() {
        if (!editingRecord) return;

        Alert.alert(
            "Excluir Registro",
            "Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive",
                    onPress: () => {
                        try {
                            recordsRepository.delete(editingRecord.id);
                            navigation.goBack();
                        } catch (e) {
                            Alert.alert("Erro", "Não foi possível excluir o registro.");
                            console.error(e);
                        }
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header 
                title={editingRecord ? "Editar Registro" : "Novo Registro"} 
                onBack={navigation.goBack} 
                rightAction={editingRecord ? {
                    icon: "trash-can-outline",
                    onPress: handleDeleteRecord
                } : undefined}
            />

            <FormBody>
                <Dropdown
                    label="Tipo de Registro"
                    options={typeOptions}
                    value={type}
                    onChange={(opt) => setType(opt.value as any)}
                />

                <TextField
                    label="Nome"
                    placeholder={type === "outgoing" ? "Ex: Aluguel" : "Ex: Salário"}
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                />

                <TextField
                    label="Valor (R$)"
                    placeholder="0,00"
                    keyboardType="number-pad"
                    mask="currency"
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

                <DateField
                    label="Data do Registro"
                    value={date}
                    onChange={setDate}
                />

                <Dropdown
                    label="Repetição"
                    options={repeatOptions}
                    value={repeat || "none"}
                    onChange={(opt) => setRepeat(opt.value)}
                />

                {repeat && repeat !== "none" && (
                    <DateField
                        label="Repetir até"
                        placeholder="Sem data de término"
                        value={repeatUntil}
                        onChange={setRepeatUntil}
                        onClear={() => setRepeatUntil(null)}
                    />
                )}
            </FormBody>


            <FormFooter
                textButton={editingRecord ? "Salvar Alterações" : "Salvar Registro"}
                textCancel="Cancelar"
                onPressButton={handleSaveRecord}
                onPressCancel={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
}
