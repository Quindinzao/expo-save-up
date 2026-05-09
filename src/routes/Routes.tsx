import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AddExpense from "../screens/AddExpense";
import AddCategory from "../screens/AddCategory";
import DailyExpenses from "../screens/DailyExpenses";

const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddExpense" component={AddExpense} />
                <Stack.Screen name="AddCategory" component={AddCategory} />
                <Stack.Screen name="DailyExpenses" component={DailyExpenses} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}