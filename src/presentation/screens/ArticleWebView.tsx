import { RouteProp } from "@react-navigation/native";
import WebView from "react-native-webview";
import { RootStackParamList } from "../../navigators/navigationTypes";

type ArticleWebViewRouteProps = RouteProp<RootStackParamList, 'WebView'>;

interface ArticleWebViewProps {
  route: ArticleWebViewRouteProps;
}

export default function ArticleWebView({ route }: ArticleWebViewProps) {
  const { url } = route.params;
  return (
    <WebView
      source={{ uri: url }}
    />
  );
}