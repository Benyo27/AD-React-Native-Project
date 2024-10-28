import { createStackNavigator } from "@react-navigation/stack";
import { SavedArticlesScreen } from "../presentation/screens/SavedArticlesScreen";
import ArticleWebView from "../presentation/screens/ArticleWebView";
import { RootStackParamList } from "./NavigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

export default function SavedArticlesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{ headerTitle: "" }}
    >
      <Stack.Screen name="Articles" component={SavedArticlesScreen} />
      <Stack.Screen name="WebView" component={ArticleWebView} />
    </Stack.Navigator>
  );
}
