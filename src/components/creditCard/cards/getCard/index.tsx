import { supabase } from "@/lib/supabase";

export default async function GetCard() {
    const { data: cards, error } = await supabase
        .from('cards')
        .select('*')

    return cards;
}
