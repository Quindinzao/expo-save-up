import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Typography from '../Typography';
import { useTheme } from '../../hooks/useTheme';
import { createStyles } from './styles';

interface SummaryCardProps {
    label: string;
    value: string | number;
    style?: StyleProp<ViewStyle>;
}

export default function SummaryCard({ label, value, style }: SummaryCardProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <Typography variant="caption" style={styles.label}>{label}</Typography>
            <Typography variant="h3" style={styles.value}>{value}</Typography>
        </View>
    );
}
