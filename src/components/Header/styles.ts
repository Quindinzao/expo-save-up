import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.s16,
        paddingVertical: theme.spacing.s16,
    },
    backButton: {
        marginRight: theme.spacing.s16,
    },
    title: {
        flex: 1,
    },
});
