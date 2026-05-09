import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import AccessButton from "../../components/AccessButton";
import Typography from "../../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { expensesRepository } from "../../database/repositories/expensesRepository";

type DayEntry = { date: string; total: number };

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

export default function Home() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [days, setDays] = useState<DayEntry[]>([]);

    function loadDays() {
        const month = new Date().toISOString().slice(0, 7); // "2026-04"
        const result = expensesRepository.getDaysByMonth(month);
        setDays(result);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadDays);
        return unsubscribe;
    }, [navigation]);

    const monthLabel = new Date().toLocaleString("pt-BR", { month: "long" });

    return (
        <SafeAreaView style={styles.container}>
            <Typography variant="h1" style={styles.title}>
                Despesas de {monthLabel}
            </Typography>

            <FlatList<DayEntry>
                style={styles.list}
                contentContainerStyle={days.length === 0 ? { flex: 1 } : styles.listContent}
                data={days}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <AccessButton
                        day={formatDay(item.date)}
                        onPress={() => navigation.navigate("DailyExpenses", { date: item.date })}
                    >
                        {formatCurrency(item.total)}
                    </AccessButton>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" style={styles.emptyText}>
                            Nenhuma despesa este mês
                        </Typography>
                    </View>
                }
            />

            <View style={styles.footer}>
                <AccessButton
                    icon="cash-multiple"
                    onPress={() => navigation.navigate("AddExpense")}
                >
                    Adicionar despesa
                </AccessButton>
                <AccessButton
                    icon="tag-plus"
                    onPress={() => navigation.navigate("AddCategory")}
                >
                    Nova categoria
                </AccessButton>
            </View>
        </SafeAreaView>
    );
}