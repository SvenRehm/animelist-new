import { useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"

import MainLayout from "../components/MainLayout"
import { AppProps } from "next/app"
import "../styles/globals.css"

function MyApp({
   Component,
   pageProps,
}: AppProps<{
   initialSession: Session
}>) {
   const [supabase] = useState(() => createBrowserSupabaseClient())

   return (
      <SessionContextProvider
         supabaseClient={supabase}
         initialSession={pageProps.initialSession}
      >
         <MainLayout>
            <Component {...pageProps} />
         </MainLayout>
      </SessionContextProvider>
   )
}
export default MyApp
