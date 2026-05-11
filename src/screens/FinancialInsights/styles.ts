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
    content: {
        padding: theme.spacing.s16,
        gap: theme.spacing.s24,
    },
    aiCard: {
        backgroundColor: theme.colors.primary + '15',
        borderRadius: theme.radius.md,
        padding: theme.spacing.s20,
        borderWidth: 1,
        borderColor: theme.colors.primary + '30',
        flexDirection: 'row',
        gap: theme.spacing.s16,
    },
    aiIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aiContent: {
        flex: 1,
        gap: theme.spacing.s08,
    },
    aiTitle: {
        color: theme.colors.primary,
    },
    sectionTitle: {
        marginBottom: theme.spacing.s16,
    },
    categoryCard: {
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.s12,
        marginBottom: theme.spacing.s12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryInfo: {
        flex: 1,
    },
    categoryAmount: {
        fontWeight: 'bold',
    },
    suggestionCard: {
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
        gap: theme.spacing.s08,
        marginBottom: theme.spacing.s12,
    }
});
