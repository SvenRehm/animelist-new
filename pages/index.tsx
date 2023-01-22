import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Account from "../components/Account"
import AnimeList from "../components/AnimeList"

const Home = () => {
   const session = useSession()
   const supabase = useSupabaseClient()

   return (
      <div className="container m-auto">
         <AnimeList />
         {/* TODO use this for the animlist routing */}
         {/* {!session ? (
            <Auth
               supabaseClient={supabase}
               appearance={{ theme: ThemeSupa }}
               theme="dark"
            />
         ) : (
            <Account session={session} />
         )} */}
      </div>
   )
}

export default Home
