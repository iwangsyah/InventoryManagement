import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk"
import CategoryReducer from "./reducers/CategoryReducer"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
  category: CategoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({reducer: persistedReducer, middleware: [thunk]})
const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export {store, persistor}
