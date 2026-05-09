import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";

interface IconSelectorProps {
    label: string;
    value: keyof typeof MaterialCommunityIcons.glyphMap | string;
    onSelect: (name: string) => void;
}

const COMMON_ICONS: (keyof typeof MaterialCommunityIcons.glyphMap)[] = [
    "cart", "food", "home", "car", "gift", "heart", "star", "school",
    "airplane", "hammer", "camera", "cog", "bank", "cash", "credit-card",
    "account", "chart-pie", "lightbulb", "medical-bag", "phone",
    "television", "controller-classic", "tshirt-crew", "soccer", "bus",
    "train", "bike", "dog", "cat"
];

export default function IconSelector({ label, value, onSelect }: IconSelectorProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <Typography variant="h5">{label}</Typography>
            <View style={styles.iconsContainer}>
                {COMMON_ICONS.map((iconName) => (
                    <TouchableOpacity
                        key={iconName}
                        style={[
                            styles.iconButton,
                            value === iconName && styles.selectedIconButton
                        ]}
                        onPress={() => onSelect(iconName)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name={iconName}
                            size={24}
                            color={value === iconName ? theme.colors.primary : theme.colors.text}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
