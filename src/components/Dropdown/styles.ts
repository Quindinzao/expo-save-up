import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const width = Dimensions.get('window').width;

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width - theme.spacing.s32,
    },
    trigger: {
        height: theme.spacing.s54,
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.s16,
        backgroundColor: theme.colors.item,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    triggerText: {
        color: theme.colors.text,
        fontSize: 14,
        flex: 1,
    },
    placeholderText: {
        color: theme.colors.placeholder,
        fontSize: 14,
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    dropdown: {
        position: 'absolute',
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.item,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
        overflow: 'hidden',
    },
    option: {
        height: theme.spacing.s48,
        paddingHorizontal: theme.spacing.s16,
        justifyContent: 'center',
    },
    optionText: {
        color: theme.colors.text,
        fontSize: 14,
    },
    optionSelected: {
        backgroundColor: theme.colors.border,
    },
    separator: {
        height: theme.spacing.s01,
        backgroundColor: theme.colors.border,
    },
});
