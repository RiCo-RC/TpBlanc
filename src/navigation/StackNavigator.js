import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen, QuizScreen, ResultScreen } from "../screens";

const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false };

const screens = [
  { name: "HomeScreen", component: HomeScreen },
  { name: "QuizScreen", component: QuizScreen },
  { name: "ResultScreen", component: ResultScreen },
];

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
