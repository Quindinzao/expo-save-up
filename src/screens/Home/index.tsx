import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { recordsRepository } from "../../database/repositories/recordsRepository";
import { usersRepository } from "../../database/repositories/usersRepositories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BarChart from "../../components/BarChart";

type MonthData = { month: string; income: number; outcome: number; label: string };

export default function Home() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [yearlyData, setYearlyData] = useState<MonthData[]>([]);
    const [maxTotal, setMaxTotal] = useState(0);
    const [currentYear] = useState(new Date().getFullYear());
    const [userData, setUserData] = useState<{ name: string; profession: string } | null>(null);

    function loadDashboardData() {
        const yearStr = currentYear.toString();
        const results = recordsRepository.getYearlyTotalsGroupedByMonth(yearStr);

        const data: MonthData[] = Array.from({ length: 12 }, (_, i) => {
            const monthIndex = i + 1;
            const monthStr = `${yearStr}-${monthIndex.toString().padStart(2, '0')}`;
            const found = results.find(r => r.month === monthStr);
            const date = new Date(currentYear, i);
            return {
                month: monthStr,
                income: found ? found.income : 0,
                outcome: found ? found.outcome : 0,
                label: date.toLocaleString("pt-BR", { month: "short" }).replace('.', '')
            };
        });

        const max = Math.max(...data.map(d => d.outcome), 1); // avoid division by zero
        setYearlyData(data);
        setMaxTotal(max);
    }

    function loadUserData() {
        const user = usersRepository.getById("1") as any;
        setUserData(user);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadDashboardData();
            loadUserData();
        });
        loadDashboardData();
        loadUserData();
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Typography variant="body" style={styles.greeting}>Olá, bem-vindo ao</Typography>
                    <Typography variant="h1" style={styles.title}>
                        SaveUp
                    </Typography>
                </View>

                <BarChart
                    title={`Despesas de ${currentYear}`}
                    data={yearlyData.map(d => ({ label: d.label, value: d.outcome }))}
                    maxTotal={maxTotal}
                    style={styles.chartSection}
                />

                <View style={styles.menuSection}>
                    <View style={styles.menuGrid}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate("MonthlyRecords")}
                        >
                            <MaterialCommunityIcons name="calendar-month" size={32} color={theme.colors.primary} style={styles.menuIcon} />
                            <Typography variant="h4" style={styles.menuLabel}>Registros do Mês</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate("YearlyRecords")}
                        >
                            <MaterialCommunityIcons name="calendar-range" size={32} color={theme.colors.primary} style={styles.menuIcon} />
                            <Typography variant="h4" style={styles.menuLabel}>Registros do Ano</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                const d = new Date();
                                const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                navigation.navigate("AddRecord", { date: todayStr });
                            }}
                        >
                            <MaterialCommunityIcons name="cash-plus" size={32} color={theme.colors.primary} style={styles.menuIcon} />
                            <Typography variant="h4" style={styles.menuLabel}>Novo Registro</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate("AddCategory")}
                        >
                            <MaterialCommunityIcons name="tag-plus" size={32} color={theme.colors.primary} style={styles.menuIcon} />
                            <Typography variant="h4" style={styles.menuLabel}>Nova Categoria</Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}