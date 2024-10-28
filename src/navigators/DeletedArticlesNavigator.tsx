import { createStackNavigator } from "@react-navigation/stack";
import { DeletedArticlesScreen } from "../presentation/screens/DeletedArticlesScreen";
import ArticleWebView from "../presentation/screens/ArticleWebView";
import { RootStackParamList } from "./NavigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

export default function DeletedArticlesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{ headerTitle: "" }}
    >
      <Stack.Screen name="Articles" component={DeletedArticlesScreen} />
      <Stack.Screen name="WebView" component={ArticleWebView} />
    </Stack.Navigator>
  );
}
