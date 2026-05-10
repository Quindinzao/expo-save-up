import React from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Typography from '../Typography';
import { useTheme } from '../../hooks/useTheme';
import { createStyles } from './styles';

interface SelectorProps {
    label: string;
    onPrev: () => void;
    onNext: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function Selector({ label, onPrev, onNext, style }: SelectorProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPrev}>
                <MaterialCommunityIcons name="chevron-left" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <Typography
                variant="h4"
                style={styles.label}
            >
                {label}
            </Typography>
            <TouchableOpacity onPress={onNext}>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
        </View>
    );
}
