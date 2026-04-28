import { TextInput, View, TextInputProps, StyleProp, ViewStyle } from "react-native";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";

interface TextFieldProps extends TextInputProps {
    label: string;
    style?: StyleProp<ViewStyle>;
}

export default function TextField({ label, style, ...props }: TextFieldProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <Typography variant="h5">{label}</Typography>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
                {...props}
            />
        </View>
    )
}