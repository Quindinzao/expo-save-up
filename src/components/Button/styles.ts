import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const width = Dimensions.get('window').width;

export const createStyles = (theme: Theme) => StyleSheet.create({
    button: {
        width: width - theme.spacing.s32,
        height: theme.spacing.s54,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: theme.colors.fixedText,
    },
    textOutline: {
        color: theme.colors.text,
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.item,
    },
    transparent: {
        backgroundColor: 'transparent',
    },
})