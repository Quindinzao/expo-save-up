import { Text, StyleProp, TextStyle, TextProps } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";

interface TypographyProps extends TextProps {
    children: React.ReactNode;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
    style?: StyleProp<TextStyle>;
}

export default function Typography({ children, variant, style }: TypographyProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Text style={[styles[variant], style]}>{children}</Text>
    )
}