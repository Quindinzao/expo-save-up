import { StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.s16,
        justifyContent: 'center',
    },
    content: {
        width: '100%',
    },
    input: {
        marginTop: theme.spacing.s16,
        marginVertical: theme.spacing.s12,
        width: '100%'
    },
    titleBox: {
        textAlign: 'left',
        width: '100%',
        marginBottom: theme.spacing.s24
    }
});
