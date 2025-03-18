import Link from "next/link";
import myQr from "../qr.png"
import Image from "next/image";

export default function AboutPage() {
    return (
      <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">Short link</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Create a short link to easily share with everyone</p>
        </div>
        <div className="mx-auto space-y-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-5 py-5">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                Powered by Vaquata
              </div>
              <div className="text-sm text-muted-foreground">
                Bank: MB Bank <br/>
              </div>
              <div className="text-sm text-muted-foreground">
                Account number: 0906111075
              </div>
              <div className="flex max-w-full justify-center">
                <Image alt="My QR" src={myQr} width={100} height={100} /><br/>
              </div>
              <Link href={"/"} className="bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <div className="text-center">Back to home</div>
              </Link>
              <div className="text-sm text-muted-foreground">
                The source code: <Link target="_blank" href={"https://github.com/vaquata206/shortlink.git"}>https://github.com/vaquata206/shortlink.git</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }