import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import charactersReducer from "./charactersSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["characters"],
};

const persistedCharactersReducer = persistReducer(
  persistConfig,
  charactersReducer
);

export const store = configureStore({
  reducer: {
    characters: persistedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
