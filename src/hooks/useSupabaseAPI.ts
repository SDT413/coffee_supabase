import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useSupabaseAPI = () => {
    const {
        cookies
    } = useTypedSelector(state => state.supabase_api);
    return useMemo(() => ({ cookies }), [cookies]);
}