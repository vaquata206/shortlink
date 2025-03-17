"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Định nghĩa schema validation
const schema = z.object({
  url: z.string().url("The URL is required")
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>({
    isSuccess: false,
    message: "Có lỗi xảy ra, xin vui lòng thử lại"
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.message)
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    const request = await fetch("/api/shorten", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    setLoading(false);
    if (request.ok) {
      const response = await request.json();
      setResult({
        isSuccess: true,
        message: response.shortlink
      });
    } else {
      setResult({
        isSuccess: false,
        message: "Có lỗi xảy ra, xin vui lòng thử lại"
      });
    }
  };

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
                Shorten your url
              </div>
              <div className="text-sm text-muted-foreground">
                Enter your URL to shorten your link
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center space-x-2">
                <input
                  disabled={loading}
                  type="url"
                  placeholder="https://example.com"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-4 my-2"
                  {...register("url")}
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <span>Shorten</span>
                  <svg id="loadingSpinner" className={(loading ? "" : "hidden ") + "animate-spin ml-2 h-5 w-5 text-white"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </button>
              </div>
              {errors.url && <p style={{ color: "red" }}>{errors.url.message}</p>}
            </form>
            {
              result.isSuccess === true ?
                <div className="flex">
                  <div id="result" className="flex-1 bg-green-100 text-green-800 p-4 rounded-md">
                    <p>Shortened URL: <a id="shortUrl" href="#" className="text-indigo-600 underline" target="_blank">{result.message}</a></p>
                  </div>
                  <button className="bg-gray-500 text-white py-4 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={copyToClipboard}>Copy url</button>
                </div>
                : <></>
            }
            {
              result.isSuccess === false ?
                <div id="result" className="bg-red-100 text-red-800 p-4 rounded-md">
                  <p>Error: {result.message}</p>
                </div> : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
