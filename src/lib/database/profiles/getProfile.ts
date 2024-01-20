import { supabaseClient } from "$lib/utils/database/client"

export const getProfile_DB = async (
    payload: { id?: string },
) => {
    const res = await supabaseClient
        .from('profiles')
        .select()
        .eq('id', payload.id || '')

    return res
}