import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import TextField from "../../components/TextField";
import IconSelector from "../../components/IconSelector";
import ColorSelector from "../../components/ColorSelector";
import { categoriesRepository } from "../../database/repositories/categoryRepository";
import FormFooter from "../../components/FormFooter";
import FormHeader from "../../components/FormHeader";
import FormBody from "../../components/FormBody";

export default function AddCategory() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [color, setColor] = useState("");

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
            });

            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar a categoria. Tente novamente.");
            console.error(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <FormHeader title="Nova Categoria" />

            <FormBody>
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
