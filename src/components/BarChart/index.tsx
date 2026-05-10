import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Typography from '../Typography';
import { useTheme } from '../../hooks/useTheme';
import { createStyles } from './styles';

export type BarChartData = {
    label: string;
    value: number;
};

interface BarChartProps {
    title: string;
    data: BarChartData[];
    maxTotal: number;
    style?: StyleProp<ViewStyle>;
}

export default function BarChart({ title, data, maxTotal, style }: BarChartProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Typography variant="h3">{title}</Typography>
                <MaterialCommunityIcons name="chart-bar" size={24} color={theme.colors.primary} />
            </View>

            <View style={styles.chartContainer}>
                {data.map((item, index) => {
                    const barHeight = (item.value / maxTotal) * 100;
                    return (
                        <View key={index} style={styles.barContainer}>
                            <View style={[styles.bar, { height: `${barHeight}%` }]} />
                            <Typography variant="caption" style={styles.barLabel}>{item.label}</Typography>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
