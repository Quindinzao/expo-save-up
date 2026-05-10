import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        padding: theme.spacing.s16,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    header: {
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
});
