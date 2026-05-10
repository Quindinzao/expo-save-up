import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        paddingHorizontal: theme.spacing.s24,
        marginBottom: theme.spacing.s16,
    },
    list: {
        flex: 1,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.s16,
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        gap: theme.spacing.s16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    expenseName: {
        color: theme.colors.text,
    },
    amount: {
        color: theme.colors.text,
    },
    listContent: {
        paddingHorizontal: theme.spacing.s16,
        paddingBottom: theme.spacing.s32,
        gap: theme.spacing.s16,
    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing.s24,
        paddingBottom: theme.spacing.s24,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: theme.colors.placeholder,
    }
});
