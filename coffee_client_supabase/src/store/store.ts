import {combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import {cartSlice} from './cart/cart.slice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {productSliderSlice} from "@/store/product_selector/product_slider.slice";
import {configSlice} from "@/store/config/config.slice";
import {supabase_apiSlice} from "@/store/supabase_api/supabase_api.slice";

const persistConfig : PersistConfig<any> = {
    key: 'xmas-shop',
    storage,
    whitelist: ['cart']
}


const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    product_slider: productSliderSlice.reducer,
    config: configSlice.reducer,
    supabase_api: supabase_apiSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    } as any),
});
export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;