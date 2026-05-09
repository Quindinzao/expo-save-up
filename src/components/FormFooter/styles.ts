import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    footer: {
        alignItems: 'center',
        gap: theme.spacing.s16,
        paddingTop: theme.spacing.s08,
    }
});
