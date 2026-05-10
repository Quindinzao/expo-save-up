import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../styles/theme";

const { width } = Dimensions.get("window");

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: width - theme.spacing.s32,
    },
    label: {
        marginBottom: theme.spacing.s08,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.s08,
    },
    trigger: {
        flex: 1,
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
    text: {
        color: theme.colors.text,
    },
    placeholder: {
        color: theme.colors.placeholder,
    },
    clearButton: {
        padding: theme.spacing.s08,
        height: theme.spacing.s54,
        borderWidth: theme.spacing.s01,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.item,
        justifyContent: 'center',

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.s16,
        width: width - theme.spacing.s48,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});
