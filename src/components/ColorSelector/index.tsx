import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../Typography";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./styles";

interface ColorSelectorProps {
    label: string;
    value: string;
    onSelect: (color: string) => void;
}

const COMMON_COLORS = [
    "#FF5733", "#C70039", "#900C3F", "#581845", "#FFC300",
    "#DAF7A6", "#33FF57", "#33FFBD", "#33DBFF", "#3357FF",
    "#8333FF", "#F333FF", "#FF33A8", "#FF3333", "#FF8633",
    "#75FF33", "#33FF75", "#3375FF", "#A833FF", "#FFB700",
    "#00BFA5", "#00C853", "#6200EA", "#C51162", "#212121"
];

export default function ColorSelector({ label, value, onSelect }: ColorSelectorProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <Typography variant="h5">{label}</Typography>
            <View style={styles.colorsContainer}>
                {COMMON_COLORS.map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            styles.colorButton,
                            { backgroundColor: color },
                            value === color && styles.selectedColorButton
                        ]}
                        onPress={() => onSelect(color)}
                        activeOpacity={0.7}
                    >
                        {value === color && (
                            <MaterialCommunityIcons
                                name="check"
                                size={24}
                                color={theme.colors.background}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
