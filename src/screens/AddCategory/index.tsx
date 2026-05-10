import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import { categoriesRepository } from "../../database/repositories/categoryRepository";
import TextField from "../../components/TextField";
import IconSelector from "../../components/IconSelector";
import ColorSelector from "../../components/ColorSelector";
import FormFooter from "../../components/FormFooter";
import FormBody from "../../components/FormBody";
import Header from "../../components/Header";

import Dropdown, { DropdownOption } from "../../components/Dropdown";

export default function AddCategory() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const [type, setType] = useState<"incoming" | "outgoing">("outgoing");
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [color, setColor] = useState("");

    const typeOptions: DropdownOption[] = [
        { label: "Saída (Despesa)", value: "outgoing" },
        { label: "Entrada (Receita)", value: "incoming" },
    ];

    function handleAddCategory() {
        const trimmedName = name.trim();
        if (!trimmedName) {
            Alert.alert("Campo obrigatório", "Informe o nome da categoria.");
            return;
        }

        try {
            categoriesRepository.insert({
                id: String(Date.now()),
                name: trimmedName,
                icon: icon.trim() || "tag",
                color: color.trim() || "#FFB700",
                type: type,
            });

            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar a categoria. Tente novamente.");
            console.error(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title="Nova Categoria" onBack={navigation.goBack} />

            <FormBody>
                <Dropdown
                    label="Tipo de Categoria"
                    options={typeOptions}
                    value={type}
                    onChange={(opt) => setType(opt.value as any)}
                />

                <TextField
                    label="Nome da Categoria"
                    placeholder="Ex: Alimentação"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                />

                <IconSelector
                    label="Ícone"
                    value={icon}
                    onSelect={setIcon}
                />

                <ColorSelector
                    label="Cor"
                    value={color}
                    onSelect={setColor}
                />
            </FormBody>

            <FormFooter
                textButton="Salvar Categoria"
                textCancel="Cancelar"
                onPressButton={handleAddCategory}
                onPressCancel={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
}
