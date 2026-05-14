import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";
import Button from "../Button";

interface FormFooterProps {
    textButton?: string,
    textCancel?: string,
    onPressButton?: () => void,
    onPressCancel?: () => void,
    style?: StyleProp<ViewStyle>
}

export default function FormFooter({
    textButton,
    textCancel,
    onPressButton,
    onPressCancel,
    style
}: FormFooterProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.footer}>
            {textButton && onPressButton && (
                <Button variant="primary" onPress={onPressButton}>
                    {textButton}
                </Button>
            )}
            {textCancel && onPressCancel && (
                <Button variant="transparent" onPress={onPressCancel}>
                    {textCancel}
                </Button>
            )}
        </View>
    );
}