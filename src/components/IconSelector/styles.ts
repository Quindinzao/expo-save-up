import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const width = Dimensions.get('window').width;

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width - theme.spacing.s32,
        gap: theme.spacing.s08,
    },
    iconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.s08,
        padding: theme.spacing.s12,
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        justifyContent: 'space-between',
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedIconButton: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.background,
    },
});
