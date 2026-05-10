import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { usersRepository } from "../../database/repositories/usersRepositories";

type RouteParams = {
    params: {
        name: string;
    };
};

export default function OnboardingProfession() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { name } = route.params;

    const [profession, setProfession] = useState("");

    function handleFinish() {
        if (!profession.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, informe sua profissão para concluir.");
            return;
        }

        try {
            usersRepository.update({
                id: "1",
                name: name,
                profession: profession.trim()
            });

            // Navega para a Home resetando a pilha para que o usuário não volte para o onboarding
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (e) {
            Alert.alert("Erro", "Não foi possível salvar seus dados. Tente novamente.");
            console.error(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <View style={styles.content}>
                    <View>
                        <Typography variant="h1" style={styles.title}>Prazer, {name}!</Typography>
                        <Typography variant="h2" style={styles.title}>Qual a sua profissão?</Typography>
                    </View>

                    <TextField
                        label="Sua profissão"
                        placeholder="Ex: Desenvolvedor, Estudante"
                        value={profession}
                        onChangeText={setProfession}
                        autoFocus
                        returnKeyType="done"
                        onSubmitEditing={handleFinish}
                        style={styles.input}
                    />

                    <View style={styles.footer}>
                        <Button variant="primary" onPress={handleFinish}>
                            Finalizar
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
