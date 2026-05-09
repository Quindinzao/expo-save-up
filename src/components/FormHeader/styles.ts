import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    title: {
        paddingHorizontal: theme.spacing.s16,
        paddingVertical: theme.spacing.s08,
    },
});
