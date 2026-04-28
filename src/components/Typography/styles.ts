import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    h1: {
        fontSize: 24,
        fontFamily: 'Montserrat-ExtraBold',
        color: theme.colors.text,
    },
    h2: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: theme.colors.text,
    },
    h3: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: theme.colors.text,
    },
    h4: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: theme.colors.text,
    },
    h5: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: theme.colors.text,
    },
    h6: {
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        color: theme.colors.text,
    },
    body: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: theme.colors.text,
    },
    caption: {
        fontSize: 12,
        fontFamily: 'Montserrat-ThinItalic',
        color: theme.colors.text,
    },
});