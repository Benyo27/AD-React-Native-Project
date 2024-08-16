import { RouteProp } from "@react-navigation/native";
import WebView from "react-native-webview";
import { RootStackParamList } from "../../../navigationTypes";

type WebViewScreenRouteProps = RouteProp<RootStackParamList, 'WebView'>;

interface WebViewScreenProps {
  route: WebViewScreenRouteProps;
}

export function WebViewScreen({ route }: WebViewScreenProps) {
  const { url } = route.params;
  return (
    <WebView
      source={{ uri: url }}
    />
  );
}