import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    scroll: {
        flex: 1,
    },
    body: {
        gap: theme.spacing.s16,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        paddingVertical: theme.spacing.s08,
    },
});