import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./slices/AuthSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/WishListSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  wishList: wishlistReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishList"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
