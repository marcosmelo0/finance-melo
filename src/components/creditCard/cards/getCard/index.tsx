import { supabase } from "@/lib/supabase";

export default async function GetCard({ userId }: { userId: string }) {
    const { data: cards, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', userId);

    return cards;
}
