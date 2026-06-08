import { TextInput, View, TextInputProps, StyleProp, ViewStyle } from "react-native";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";
import { formatCurrency } from "../../utils/masks";

interface TextFieldProps extends TextInputProps {
    label: string;
    style?: StyleProp<ViewStyle>;
    mask?: "currency";
}

export default function TextField({ label, style, mask, value, onChangeText, keyboardType, ...props }: TextFieldProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const handleChangeText = (text: string) => {
        if (mask === "currency") {
            const formatted = formatCurrency(text);
            onChangeText?.(formatted);
        } else {
            onChangeText?.(text);
        }
    };

    const displayValue = mask === "currency" && value ? formatCurrency(value) : value;
    const finalKeyboardType = mask === "currency" ? "number-pad" : keyboardType;

    return (
        <View style={[styles.container, style]}>
            <Typography variant="h5">{label}</Typography>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
                value={displayValue}
                onChangeText={handleChangeText}
                keyboardType={finalKeyboardType}
                {...props}
            />
        </View>
    )
}