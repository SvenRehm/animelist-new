import { useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import Layout from "../components/layout"
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
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </SessionContextProvider>
   )
}
export default MyApp
