import { useTheme } from "../../hooks/useTheme";
import Typography from "../Typography";
import { createStyles } from "./styles";

interface FormHeaderProps {
    title: string
}

export default function FormHeader({ title }: FormHeaderProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Typography variant="h1" style={styles.title}>
            {title}
        </Typography>
    );
}