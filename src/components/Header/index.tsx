import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Typography from '../Typography';
import { useTheme } from '../../hooks/useTheme';
import { createStyles } from './styles';

interface ScreenHeaderProps {
    title: string;
    onBack?: () => void;
    rightAction?: {
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
        onPress: () => void;
    };
}

export default function Header({ title, onBack, rightAction }: ScreenHeaderProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
            )}
            <Typography variant="h1" style={styles.title}>
                {title}
            </Typography>
            {rightAction && (
                <TouchableOpacity onPress={rightAction.onPress} style={styles.rightButton}>
                    <MaterialCommunityIcons name={rightAction.icon} size={24} color={theme.colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
}
