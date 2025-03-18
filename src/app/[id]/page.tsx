import { getLinkByShortLink } from "@/services/shortService"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Redirect({ params }: { params: Promise<{id: string}>}){
    const { id } = await params
    const data = await getLinkByShortLink(id);
    if (data?.link){
        redirect(data?.link)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-700 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Go back home
      </Link>
    </div>
    )
}