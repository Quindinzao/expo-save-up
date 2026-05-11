import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import Header from "../../components/Header";
import { recordsRepository } from "../../database/repositories/recordsRepository";

interface CategoryTotal {
    name: string;
    amount: number;
    icon: string;
    color: string;
}

export default function FinancialInsights() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const [topCategories, setTopCategories] = useState<CategoryTotal[]>([]);
    const [totalOutcome, setTotalOutcome] = useState(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    function formatCurrency(value: number): string {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function generateInsights() {
        const now = new Date();
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const records = recordsRepository.getRecordsByMonthWithCategories(monthStr);

        const categoryMap: { [key: string]: CategoryTotal } = {};
        let total = 0;

        records.forEach(r => {
            if (r.type === 'outgoing') {
                total += r.total_amount;
                if (!categoryMap[r.category_id]) {
                    categoryMap[r.category_id] = {
                        name: r.category_name,
                        amount: 0,
                        icon: r.category_icon,
                        color: r.category_color
                    };
                }
                categoryMap[r.category_id].amount += r.total_amount;
            }
        });

        const sortedCategories = Object.values(categoryMap).sort((a, b) => b.amount - a.amount);
        setTopCategories(sortedCategories);
        setTotalOutcome(total);

        const newSuggestions: string[] = [];
        if (sortedCategories.length > 0) {
            const top = sortedCategories[0];
            const percent = ((top.amount / total) * 100).toFixed(1);
            newSuggestions.push(`Seus maiores gastos são com "${top.name}", representando ${percent}% do seu orçamento mensal. Tente reduzir 10% nessa categoria para economizar ${formatCurrency(top.amount * 0.1)} por mês.`);
        }

        if (total > 2000) {
            newSuggestions.push("Seu gasto total este mês está acima da média. Considere revisar seus registros fixos para encontrar oportunidades de corte.");
        }

        if (sortedCategories.find(c => c.name.toLowerCase() === 'alimentação' && c.amount > 500)) {
            newSuggestions.push("Notei que seus gastos com alimentação estão altos. Preparar marmitas em casa pode gerar uma economia de até 30% nesta categoria.");
        }

        if (newSuggestions.length === 0) {
            newSuggestions.push("Parabéns! Suas finanças parecem equilibradas. Continue acompanhando seus registros para manter o controle.");
        }

        setSuggestions(newSuggestions);
    }

    useEffect(() => {
        generateInsights();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="IA Insights" onBack={() => navigation.goBack()} />

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <View style={styles.aiCard}>
                    <View style={styles.aiIcon}>
                        <MaterialCommunityIcons name="robot" size={28} color="white" />
                    </View>
                    <View style={styles.aiContent}>
                        <Typography variant="h4" style={styles.aiTitle}>Análise do Assistente</Typography>
                        <Typography variant="body">
                            Olá! Analisei seus registros deste mês e preparei algumas sugestões para você otimizar suas finanças.
                        </Typography>
                    </View>
                </View>

                <View>
                    <Typography variant="h3" style={styles.sectionTitle}>Maiores Gastos</Typography>
                    {topCategories.slice(0, 3).map((cat, index) => (
                        <View key={index} style={styles.categoryCard}>
                            <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                                <MaterialCommunityIcons name={cat.icon as any} size={24} color={cat.color} />
                            </View>
                            <View style={styles.categoryInfo}>
                                <Typography variant="h4">{cat.name}</Typography>
                                <Typography variant="caption">{((cat.amount / totalOutcome) * 100).toFixed(0)}% do total</Typography>
                            </View>
                            <Typography variant="h4" style={styles.categoryAmount}>{formatCurrency(cat.amount)}</Typography>
                        </View>
                    ))}
                    {topCategories.length === 0 && (
                        <Typography variant="body" style={{ textAlign: 'center', opacity: 0.5 }}>
                            Nenhum gasto registrado este mês.
                        </Typography>
                    )}
                </View>

                <View>
                    <Typography variant="h3" style={styles.sectionTitle}>Sugestões de Economia</Typography>
                    {suggestions.map((sug, index) => (
                        <View key={index} style={styles.suggestionCard}>
                            <Typography variant="body">{sug}</Typography>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
