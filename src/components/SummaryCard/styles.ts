import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    label: {
        color: theme.colors.placeholder,
        marginBottom: theme.spacing.s04,
    },
    value: {
        color: theme.colors.primary,
    },
});
