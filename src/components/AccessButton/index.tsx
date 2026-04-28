import React from "react";
import { TouchableOpacity, StyleProp, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";

import { createStyles } from "./styles";

interface AccessButtonProps {
    title?: string;
    children?: string;
    description?: string | null;
    day?: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    variant?: "default" | "error";
}

export default function AccessButton({
    title,
    children,
    description,
    day,
    icon,
    onPress,
    style,
    variant = "default",
}: AccessButtonProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme, variant);

    const displayTitle = title || children;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                disabled={!onPress}
                style={[styles.container, style]}
            >
                {(icon || day) && (
                    <View style={styles.iconContainer}>
                        {icon && <MaterialCommunityIcons
                            name={icon}
                            size={theme.spacing.s32}
                            color={variant === "error" ? theme.colors.error : theme.colors.primary}
                        />}
                        {day && <Typography variant="h3" style={styles.dayText}>{day}</Typography>}
                    </View>
                )}
                <View style={styles.content}>
                    <Typography variant="h4" style={styles.title}>{displayTitle}</Typography>
                    {description && (
                        <Typography variant="caption" numberOfLines={1}>{description}</Typography>
                    )}
                </View>
                {onPress && (
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color={variant === "error" ? theme.colors.error : theme.colors.primary}
                        style={styles.chevron}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}