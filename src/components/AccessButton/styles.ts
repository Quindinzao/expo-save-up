import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../styles/theme";

const { width } = Dimensions.get("window");

export const createStyles = (theme: Theme, variant: "default" | "error") => {
    return StyleSheet.create({
        wrapper: {
            width: width - theme.spacing.s32,
            alignItems: "center",
            justifyContent: "center",
        },
        container: {
            backgroundColor: variant === "error" ? theme.colors.error + "10" : theme.colors.item,
            borderRadius: theme.radius.md,
            padding: theme.spacing.s12,
            marginBottom: theme.spacing.s08,
            flexDirection: "row",
            alignItems: "center",

            borderWidth: theme.spacing.s01,
            borderColor: variant === "error" ? theme.colors.error + "50" : theme.colors.border,
        },
        dayText: {
            color: variant === "error" ? theme.colors.error : theme.colors.primary,
        },
        iconContainer: {
            width: theme.spacing.s48,
            height: theme.spacing.s48,
            borderRadius: theme.radius.full,
            backgroundColor:
                variant === "error" ? theme.colors.error + "10" : theme.colors.primary + "20",
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.s16,
        },
        content: {
            flex: 1,
        },
        title: {
            color: variant === "error" ? theme.colors.error : theme.colors.text,
        },
        description: {
            marginTop: theme.spacing.s02,
        },
        chevron: {
            marginLeft: theme.spacing.s08,
        },
    });
};