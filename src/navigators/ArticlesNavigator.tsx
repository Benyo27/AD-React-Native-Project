import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Articles from '../presentation/screens/Articles';
import ArticleWebView from '../presentation/screens/ArticleWebView';
import { RootStackParamList } from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

export default function ArticlesNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Articles">
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="WebView" component={ArticleWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}