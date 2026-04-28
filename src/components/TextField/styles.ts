import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const width = Dimensions.get('window').width;

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width - theme.spacing.s32,
    },
    input: {
        height: theme.spacing.s54,
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.s16,
        color: theme.colors.text,
        backgroundColor: theme.colors.item,
    },
});
