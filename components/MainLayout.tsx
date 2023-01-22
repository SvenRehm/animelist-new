import Navbar from "./navbar"
import { GlobalProvider } from "../store/globalState"
import { SearchProvider } from "../store/SearchState"
//
export default function MainLayout({ children }) {
   return (
      <>
         <GlobalProvider>
            <Navbar />
            <main>{children}</main>
         </GlobalProvider>
      </>
   )
}
