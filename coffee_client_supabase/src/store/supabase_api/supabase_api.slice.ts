import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISupabaseApi} from "@/store/supabase_api/supabase_api.types";


const initialState: ISupabaseApi = {
    cookies: [],
}

export const supabase_apiSlice = createSlice({
    name: 'supabase_api',
    initialState,
    reducers: {
        setCookies: (state, action: PayloadAction<any>) => {
            state.cookies = action.payload;
        },
    }
});
