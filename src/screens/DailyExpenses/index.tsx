import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { expensesRepository } from "../../database/repositories/expensesRepository";

type DailyExpensesRouteProp = RouteProp<{ DailyExpenses: { date: string } }, 'DailyExpenses'>;

interface ExpenseWithCategory {
    id: string;
    name: string;
    amount: number;
    category_name: string;
    category_icon: string;
    category_color: string;
}

function formatCurrency(value: number): string {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

export default function DailyExpenses() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();
    const route = useRoute<DailyExpensesRouteProp>();
    const { date } = route.params;

    const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);

    function loadExpenses() {
        const result = expensesRepository.getByDate(date) as ExpenseWithCategory[];
        setExpenses(result);
    }

    useEffect(() => {
        loadExpenses();
    }, [date]);

    return (
        <SafeAreaView style={styles.container}>
            <Typography variant="h1" style={styles.title}>
                Gastos de {formatDate(date)}
            </Typography>

            <FlatList<ExpenseWithCategory>
                style={styles.list}
                contentContainerStyle={expenses.length === 0 ? { flex: 1 } : styles.listContent}
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <View style={[styles.iconContainer, { backgroundColor: item.category_color + '20' }]}>
                            <MaterialCommunityIcons
                                name={item.category_icon as any}
                                size={24}
                                color={item.category_color}
                            />
                        </View>
                        <View style={styles.content}>
                            <Typography variant="h4" style={styles.expenseName}>{item.name}</Typography>
                            <Typography variant="caption">{item.category_name}</Typography>
                        </View>
                        <Typography variant="h4" style={styles.amount}>{formatCurrency(item.amount)}</Typography>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" style={styles.emptyText}>
                            Nenhum gasto registrado neste dia
                        </Typography>
                    </View>
                }
            />

            <View style={styles.footer}>
                <Button variant="primary" onPress={() => navigation.goBack()}>
                    Voltar
                </Button>
            </View>
        </SafeAreaView>
    );
}
