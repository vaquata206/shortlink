import { getLinkByShortLink } from "@/services/shortService"
import { redirect } from "next/navigation";

interface ShortlyProps {
    params: {id: string}
}
export default async function Redirect({ params } : ShortlyProps){
    const data = await getLinkByShortLink(params.id);
    if (data?.link){
        redirect(data?.link)
    }
    return <h1>Not found</h1>
}