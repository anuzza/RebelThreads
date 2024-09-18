import React from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { CustomDefaultTheme } from "./src/themes/colors";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppEntry from "./src/AppEntry";

export default () => {
  return (
    <ActionSheetProvider>
      <PaperProvider theme={CustomDefaultTheme}>
        <Provider store={store}>
          <AppEntry />
        </Provider>
      </PaperProvider>
    </ActionSheetProvider>
  );
};
