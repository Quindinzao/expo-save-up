import React from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar, LocaleConfig, CalendarProps as RNCalendarProps } from 'react-native-calendars';
import { useTheme } from '../../hooks/useTheme';
import { createStyles } from './styles';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

interface CalendarProps extends RNCalendarProps {
  containerStyle?: any;
}

export default function Calendar({ containerStyle, ...rest }: CalendarProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <RNCalendar
        theme={{
          backgroundColor: theme.colors.background,
          calendarBackground: theme.colors.background,
          textSectionTitleColor: theme.colors.primary,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.fixedText,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.text,
          textDisabledColor: theme.colors.border,
          dotColor: theme.colors.primary,
          selectedDotColor: theme.colors.fixedText,
          arrowColor: theme.colors.primary,
          monthTextColor: theme.colors.text,
          indicatorColor: theme.colors.primary,
          textDayFontFamily: 'Montserrat-Regular',
          textMonthFontFamily: 'Montserrat-Bold',
          textDayHeaderFontFamily: 'Montserrat-SemiBold',
          textDayFontSize: theme.spacing.s16,
          textMonthFontSize: theme.spacing.s16,
          textDayHeaderFontSize: theme.spacing.s12,
        }}
        {...rest}
        style={[styles.calendar, rest.style]}
      />
    </View>
  );
}
