import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import FormFooter from "../../components/FormFooter";

export default function OnboardingName() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<any>();
    const [name, setName] = useState("");

    function handleNext() {
        if (!name.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, diga-nos o seu nome para continuar.");
            return;
        }
        navigation.navigate("OnboardingProfession", { name: name.trim() });
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <View style={styles.content}>
                    <View style={styles.titleBox}>
                        <Typography variant="h1">Olá!</Typography>
                        <Typography variant="h2">Como podemos te chamar?</Typography>
                    </View>

                    <TextField
                        label="Seu nome"
                        placeholder="Ex: João Silva"
                        value={name}
                        onChangeText={setName}
                        autoFocus
                        returnKeyType="next"
                        onSubmitEditing={handleNext}
                        style={styles.input}
                    />
                    <FormFooter
                        onPressButton={handleNext}
                        textButton="Próximo"
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
