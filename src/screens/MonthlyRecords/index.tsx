import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import AccessButton from "../../components/AccessButton";
import Typography from "../../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { recordsRepository } from "../../database/repositories/recordsRepository";
import Header from "../../components/Header";
import Selector from "../../components/Selector";
import SummaryCard from "../../components/SummaryCard";

type DayEntry = { date: string; totalIncome: number; totalOutcome: number };

function formatDay(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
    });
}

function formatCurrency(value: number): string {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export default function MonthlyRecords() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [days, setDays] = useState<DayEntry[]>([]);
    const [monthTotals, setMonthTotals] = useState({ income: 0, outcome: 0 });

    function loadData() {
        const monthStr = selectedDate.toISOString().slice(0, 7);
        const daysResult = recordsRepository.getDaysByMonth(monthStr);
        const totals = recordsRepository.getTotalsByMonth(monthStr);

        setDays(daysResult);
        setMonthTotals(totals);
    }

    useEffect(() => {
        loadData();
    }, [selectedDate]);

    const changeMonth = (offset: number) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setSelectedDate(newDate);
    };

    const monthLabel = selectedDate.toLocaleString("pt-BR", { month: "long" });
    const yearLabel = selectedDate.getFullYear().toString();

    const balance = monthTotals.income - monthTotals.outcome;

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Registros do Mês" onBack={() => navigation.goBack()} />

            <View style={styles.header}>
                <View style={styles.selectors}>
                    <Selector
                        label={`${monthLabel} ${yearLabel}`}
                        onPrev={() => changeMonth(-1)}
                        onNext={() => changeMonth(1)}
                    />
                </View>

                <SummaryCard
                    label="Saldo no mês"
                    value={formatCurrency(balance)}
                    style={styles.totalCard}
                />
            </View>

            <FlatList<DayEntry>
                style={styles.list}
                contentContainerStyle={days.length === 0 ? { flex: 1 } : styles.listContent}
                data={days}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <AccessButton
                        day={formatDay(item.date)}
                        onPress={() => navigation.navigate("DailyRecords", { date: item.date })}
                    >
                        {formatCurrency(item.totalIncome - item.totalOutcome)}
                    </AccessButton>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" style={styles.emptyText}>
                            Nenhum registro este mês
                        </Typography>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
