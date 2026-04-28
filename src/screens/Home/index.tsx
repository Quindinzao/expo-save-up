import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import AccessButton from "../../components/AccessButton";
import Typography from "../../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <Typography variant="h1" style={styles.title}>
                Despesas de {new Date().toLocaleString('pt-BR', { month: 'long' })}
            </Typography>
            <AccessButton day="01" onPress={() => { }}>
                Adicionar despesa
            </AccessButton>
            <AccessButton icon="cash-remove" onPress={() => { }}>
                Adicionar despesa
            </AccessButton>
        </SafeAreaView>
    )
}