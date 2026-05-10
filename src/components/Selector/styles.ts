import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.s08,
        paddingVertical: theme.spacing.s08,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    label: {
        flex: 1,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
});
