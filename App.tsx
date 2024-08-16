import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ArticlesContainer } from './components/home/ArticlesContainer';
import { WebViewScreen } from './components/webview/WebViewScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Articles">
        <Stack.Screen name="Articles" component={ArticlesContainer} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
