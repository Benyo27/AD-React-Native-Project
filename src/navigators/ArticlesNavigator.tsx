import { createStackNavigator } from "@react-navigation/stack";
import { ArticlesScreen } from "../presentation/screens/ArticlesScreen";
import ArticleWebView from "../presentation/screens/ArticleWebView";
import { RootStackParamList } from "./NavigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

export default function ArticlesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{ headerTitle: "" }}
    >
      <Stack.Screen name="Articles" component={ArticlesScreen} />
      <Stack.Screen name="WebView" component={ArticleWebView} />
    </Stack.Navigator>
  );
}
