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
import Header from "../../components/Header";
import Selector from "../../components/Selector";
import SummaryCard from "../../components/SummaryCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MonthEntry = { month: number; total: number };

function formatCurrency(value: number): string {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function getMonthName(monthIndex: number): string {
    const date = new Date();
    date.setMonth(monthIndex);

    const month = date.toLocaleString("pt-BR", { month: "long" });

    return month.charAt(0).toUpperCase() + month.slice(1);
}

const ZODIAC_ICONS: (keyof typeof MaterialCommunityIcons.glyphMap)[] = [
    "zodiac-capricorn",
    "zodiac-aquarius",
    "zodiac-pisces",
    "zodiac-aries",
    "zodiac-taurus",
    "zodiac-gemini",
    "zodiac-cancer",
    "zodiac-leo",
    "zodiac-virgo",
    "zodiac-libra",
    "zodiac-scorpio",
    "zodiac-sagittarius",
];

export default function YearlyRecords() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [months, setMonths] = useState<MonthEntry[]>([]);
    const [yearTotal, setYearTotal] = useState(0);

    function loadData() {
        const yearStr = selectedYear.toString();
        const results = expensesRepository.getYearlyTotalsGroupedByMonth(yearStr);

        const allMonths: MonthEntry[] = Array.from({ length: 12 }, (_, i) => {
            const monthStr = `${yearStr}-${(i + 1).toString().padStart(2, '0')}`;
            const found = results.find(r => r.month === monthStr);
            return { month: i, total: found ? found.total : 0 };
        });

        setMonths(allMonths);
        setYearTotal(expensesRepository.getTotalByYear(yearStr));
    }

    useEffect(() => {
        loadData();
    }, [selectedYear]);

    const changeYear = (offset: number) => {
        setSelectedYear(prev => prev + offset);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Gastos do Ano" onBack={() => navigation.goBack()} />

            <View style={styles.header}>
                <View style={styles.selectors}>
                    <Selector
                        label={selectedYear.toString()}
                        onPrev={() => changeYear(-1)}
                        onNext={() => changeYear(1)}
                    />
                </View>

                <SummaryCard
                    label="Total no ano"
                    value={formatCurrency(yearTotal)}
                    style={styles.totalCard}
                />
            </View>

            <FlatList<MonthEntry>
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={months}
                keyExtractor={(item) => item.month.toString()}
                renderItem={({ item }) => (
                    <AccessButton
                        title={getMonthName(item.month)}
                        icon={ZODIAC_ICONS[item.month]}
                        onPress={item.total > 0 ? () => {
                        } : undefined}
                    >
                        {formatCurrency(item.total)}
                    </AccessButton>
                )}
            />
        </SafeAreaView>
    );
}
