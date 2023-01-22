import Link from "next/link"
import SearchComponent from "./SearchComponent"
import { useGlobal } from "../store/globalState"
import { setEnvironmentData } from "worker_threads"

const Navbar = () => {
   const { type, setType, data, setData } = useGlobal()

   return (
      <header className="text-gray-600 body-font">
         <div className="container flex flex-col flex-wrap items-center py-5 mx-auto md:flex-row">
            <Link
               href="/"
               className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
            >
               <span className="text-xl text-white ">AnimeList</span>
            </Link>

            <div className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
               <SearchComponent />
            </div>

            <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
               Button
            </button>
         </div>
      </header>
   )
}

export default Navbar
