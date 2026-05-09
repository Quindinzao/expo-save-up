import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        marginHorizontal: theme.spacing.s16,
        marginVertical: theme.spacing.s16,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        paddingHorizontal: theme.spacing.s16,
        paddingBottom: theme.spacing.s32,
    },
    dayCard: {
        width: '100%',
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.s16,
        paddingVertical: theme.spacing.s12,
        marginBottom: theme.spacing.s12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayLabel: {},
    dayTotal: {
        color: theme.colors.primary,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing.s48,
    },
    emptyText: {
        color: theme.colors.placeholder,
    },
    footer: {
        paddingHorizontal: theme.spacing.s16,
        paddingBottom: theme.spacing.s16,
    },
});