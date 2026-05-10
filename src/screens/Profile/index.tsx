import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { usersRepository } from "../../database/repositories/usersRepositories";
import FormFooter from "../../components/FormFooter";
import FormBody from "../../components/FormBody";

export default function Profile() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");

    useEffect(() => {
        const user = usersRepository.getById("1") as any;
        if (user) {
            setName(user.name);
            setProfession(user.profession);
        }
    }, []);

    function handleSave() {
        const trimmedName = name.trim();
        const trimmedProfession = profession.trim();

        if (!trimmedName) {
            Alert.alert("Campo obrigatório", "Por favor, informe seu nome.");
            return;
        }

        if (!trimmedProfession) {
            Alert.alert("Campo obrigatório", "Por favor, informe sua profissão.");
            return;
        }

        try {
            usersRepository.update({
                id: "1",
                name: trimmedName,
                profession: trimmedProfession
            });
            Alert.alert("Sucesso", "Seus dados foram atualizados com sucesso.");
            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", "Não foi possível atualizar seus dados.");
            console.error(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Meu Perfil" onBack={() => navigation.goBack()} />

            <FormBody>
                <TextField
                    label="Nome"
                    placeholder="Seu nome"
                    value={name}
                    onChangeText={setName}
                />

                <TextField
                    label="Profissão"
                    placeholder="Sua profissão"
                    value={profession}
                    onChangeText={setProfession}
                />
            </FormBody>

            <FormFooter
                onPressButton={handleSave}
                onPressCancel={() => navigation.goBack()}
                textButton="Salvar Alterações"
                textCancel="Cancelar"
            />
        </SafeAreaView>
    );
}
