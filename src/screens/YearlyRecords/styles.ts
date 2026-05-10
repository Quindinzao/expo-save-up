import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerTitleContainer: {
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
    header: {
        paddingHorizontal: theme.spacing.s16,
        paddingBottom: theme.spacing.s16,
    },
    selectors: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: theme.spacing.s16,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.s08,
        paddingVertical: theme.spacing.s04,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    selectorLabel: {
        marginHorizontal: theme.spacing.s08,
        minWidth: 80,
        textAlign: 'center',
    },
    totalCard: {
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
    },
    totalLabel: {
        color: theme.colors.placeholder,
        marginBottom: theme.spacing.s04,
    },
    totalValue: {
        color: theme.colors.primary,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        paddingHorizontal: theme.spacing.s16,
        paddingBottom: theme.spacing.s32,
    },
});
