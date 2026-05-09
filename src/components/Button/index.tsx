import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { createStyles } from "./styles";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";

interface ButtonProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary' | 'transparent';
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function Button({ children, variant, onPress, style }: ButtonProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            style={[styles.button, styles[variant], style]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Typography variant="h4" style={variant !== 'primary' ? styles.textOutline : styles.text}>{children}</Typography>
        </TouchableOpacity>
    )
}