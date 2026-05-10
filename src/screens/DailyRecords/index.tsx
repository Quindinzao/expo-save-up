import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import { recordsRepository } from "../../database/repositories/recordsRepository";
import Header from "../../components/Header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DailyRecordsRouteProp = RouteProp<{ DailyRecords: { date: string } }, 'DailyRecords'>;

interface RecordWithCategory {
    id: string;
    name: string;
    amount: number;
    type: "incoming" | "outgoing";
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

export default function DailyRecords() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<DailyRecordsRouteProp>();
    const { date } = route.params;

    const [records, setRecords] = useState<RecordWithCategory[]>([]);

    function loadRecords() {
        const result = recordsRepository.getByDate(date) as RecordWithCategory[];
        setRecords(result);
    }

    useEffect(() => {
        loadRecords();
    }, [date]);

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                title="Registros do Dia" 
                onBack={() => navigation.goBack()} 
                rightAction={{
                    icon: "plus",
                    onPress: () => navigation.navigate("AddRecord", { date: date })
                }}
            />
            <Typography variant="h2" style={[styles.title, { paddingHorizontal: 16, marginTop: 8 }]}>
                {formatDate(date)}
            </Typography>

            <FlatList<RecordWithCategory>
                style={styles.list}
                contentContainerStyle={records.length === 0 ? { flex: 1 } : styles.listContent}
                data={records}
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
                        <Typography 
                            variant="h4" 
                            style={[
                                styles.amount, 
                                { color: item.type === "incoming" ? "#4CAF50" : theme.colors.text }
                            ]}
                        >
                            {item.type === "incoming" ? "+" : "-"} {formatCurrency(item.amount)}
                        </Typography>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" style={styles.emptyText}>
                            Nenhum registro encontrado neste dia
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
