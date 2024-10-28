import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabNavigator from "./src/navigators/TabNavigator";

export default function App() {
  return (
    <GestureHandlerRootView>
      <TabNavigator />
    </GestureHandlerRootView>
  );
}
