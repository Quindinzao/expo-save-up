import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.s24,
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        gap: theme.spacing.s32,
    },
    input: {
        marginTop: theme.spacing.s16,
    },
    footer: {
        marginTop: theme.spacing.s48,
    }
});
