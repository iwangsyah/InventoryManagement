/**
 * Tarbiyah Sunnah Super App
 * @format
 */

import React, { Suspense } from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import RootNavigation from "./src/screens/RootNavigation";


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <NativeBaseProvider>
            <RootNavigation />
          </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;
