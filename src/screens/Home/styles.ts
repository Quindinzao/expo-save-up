import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: theme.spacing.s32,
    },
    header: {
        paddingHorizontal: theme.spacing.s16,
        paddingVertical: theme.spacing.s24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting: {
        color: theme.colors.placeholder,
    },
    title: {
        fontSize: 32,
    },
    chartSection: {
        marginHorizontal: theme.spacing.s16,
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        marginBottom: theme.spacing.s24,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s24,
    },
    chartContainer: {
        height: 200,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.s16,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bar: {
        width: '60%',
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        minHeight: 2,
    },
    barLabel: {
        marginTop: theme.spacing.s08,
        fontSize: 10,
        color: theme.colors.placeholder,
    },
    aiLabel: {
        marginLeft: theme.spacing.s12,
    },
    aiCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        marginBottom: theme.spacing.s24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: "center"
    },
    aiIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.s12,
    },
    aiContent: {
        flex: 1,
    },
    aiTitle: {
        marginBottom: theme.spacing.s08,
        color: theme.colors.text,
    },
    menuSection: {
        paddingHorizontal: theme.spacing.s16,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.s12,
    },
    menuItem: {
        width: '48%', // Approx half
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
    },
    menuIcon: {
        marginBottom: theme.spacing.s08,
    },
    menuLabel: {
        textAlign: 'center',
    },
});