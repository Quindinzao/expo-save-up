import { lightColors } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const theme = {
    colors: lightColors,
    radius,
    spacing,
}

export type Theme = typeof theme;