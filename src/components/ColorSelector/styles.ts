import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const width = Dimensions.get('window').width;

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width - theme.spacing.s32,
        gap: theme.spacing.s12,
    },
    colorsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.s16,
        padding: theme.spacing.s24,
        backgroundColor: theme.colors.item,
        borderRadius: theme.radius.md,
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        justifyContent: 'space-between',
    },
    colorButton: {
        width: theme.spacing.s48,
        height: theme.spacing.s48,
        borderRadius: theme.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: theme.spacing.s02,
        borderColor: 'transparent',
    },
    selectedColorButton: {
        borderColor: theme.colors.text,
    },
});
