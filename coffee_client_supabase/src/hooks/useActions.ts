import {cartSlice} from "@/store/cart/cart.slice";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {useMemo} from "react";
import {productSliderSlice} from "@/store/product_selector/product_slider.slice";
import {configSlice} from "@/store/config/config.slice";
import {supabase_apiSlice} from "@/store/supabase_api/supabase_api.slice";

const rootAction = {
    ...cartSlice.actions,
    ...productSliderSlice.actions,
    ...configSlice.actions,
    ...supabase_apiSlice.actions,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
}