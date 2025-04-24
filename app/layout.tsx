import type { Metadata } from "next"
import "@/styles/globals.css"
import { Header } from "@/components/header"
import type { ReactNode } from "react"
import { Providers } from "./providers"
import { Toaster } from "sonner";
import { ToastProvider } from "./context/ToastContext"

export const metadata: Metadata = {
    title: "Better Auth Next.js Starter",
    description: "Better Auth Next.js Starter with Postgres, Drizzle, shadcn/ui and Tanstack Query"
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased dark">
                <Providers>
                    <ToastProvider>
                        <div className="flex min-h-svh flex-col">
                            <Header />
                            <Toaster position="top-right" />
                            {children}
                        </div>
                    </ToastProvider>
                </Providers>
            </body>
        </html>
    )
}
