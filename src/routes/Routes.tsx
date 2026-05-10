import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AddRecord from "../screens/AddRecord";
import AddCategory from "../screens/AddCategory";
import DailyRecords from "../screens/DailyRecords";
import MonthlyRecords from "../screens/MonthlyRecords";
import YearlyRecords from "../screens/YearlyRecords";
import OnboardingName from "../screens/OnboardingName";
import OnboardingProfession from "../screens/OnboardingProfession";
import { usersRepository } from "../database/repositories/usersRepositories";


const Stack = createNativeStackNavigator();

export function Routes() {
    const user = usersRepository.getById("1") as any;
    const needsOnboarding = !user?.name || !user?.profession;

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName={needsOnboarding ? "OnboardingName" : "Home"}
            >
                <Stack.Screen name="OnboardingName" component={OnboardingName} />
                <Stack.Screen name="OnboardingProfession" component={OnboardingProfession} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddRecord" component={AddRecord} />
                <Stack.Screen name="AddCategory" component={AddCategory} />
                <Stack.Screen name="DailyRecords" component={DailyRecords} />
                <Stack.Screen name="MonthlyRecords" component={MonthlyRecords} />
                <Stack.Screen name="YearlyRecords" component={YearlyRecords} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}