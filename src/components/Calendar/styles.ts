import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.s16,
    },
    calendar: {
        width: '100%',
        borderRadius: theme.radius.md,
    }
});
