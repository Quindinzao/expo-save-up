import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scroll: {
        flex: 1,
    },
    body: {
        gap: theme.spacing.s16,
        padding: theme.spacing.s24,
        alignItems: 'center',
    },
    title: {
        paddingHorizontal: theme.spacing.s24,
        paddingTop: theme.spacing.s24,
    },
    footer: {
        padding: theme.spacing.s24,
        alignItems: 'center',
        gap: theme.spacing.s16,
    }
});
