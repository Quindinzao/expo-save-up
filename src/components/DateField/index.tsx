import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Typography from '../Typography';
import Calendar from '../Calendar';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../styles/theme';
import { createStyles } from './styles';

interface DateFieldProps {
  label: string;
  value: string | null;
  placeholder?: string;
  onChange: (date: string) => void;
  onClear?: () => void;
}

export default function DateField({ label, value, placeholder = "Selecione uma data", onChange, onClear }: DateFieldProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <View style={styles.container}>
      <Typography variant="h5" style={styles.label}>{label}</Typography>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.trigger}
          activeOpacity={0.7}
          onPress={() => setShowCalendar(true)}
        >
          <Typography
            variant="body"
            style={value ? styles.text : styles.placeholder}
          >
            {value ? formatDate(value) : placeholder}
          </Typography>
          <Feather name="calendar" size={theme.spacing.s20} color={theme.colors.placeholder} />
        </TouchableOpacity>

        {value && onClear && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
          >
            <Feather name="x" size={theme.spacing.s20} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={(day: any) => {
                onChange(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={value ? {
                [value]: { selected: true }
              } : {}}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}