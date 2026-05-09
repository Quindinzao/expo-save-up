import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";
import { ScrollView } from "react-native";

export default function FormBody({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    );
}