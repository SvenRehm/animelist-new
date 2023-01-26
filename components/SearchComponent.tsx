import { useSearchContext } from "../store/SearchState"
import { useGlobal } from "../store/globalState"
import axios from "axios"
export default function SearchComponent({ className }) {
   const {
      search,
      setSearch,
      searchresult,
      setSearchResult,
      type,
      sort,
      status,
      setNextPage,
   } = useGlobal()

   const url = "https://kitsu.io/api/edge/anime"

   const getSearchResults = (search, status, type, sort, url) => {
      axios
         .get(
            `${url}?filter[text]=${search}&filter[status]=${status}&filter[subtype]=${type}&sort=${sort}&page[limit]=20&page[offset]=0`
         )
         .then((response) => {
            setSearchResult(response.data.data)
            setNextPage(response.data.links.next)
         })
         .catch((error) => console.log(error))
   }

   return (
      <>
         <input
            value={search}
            onChange={(e) => {
               setSearch(e.target.value)
            }}
            className={`w-[250px]  border border-[rgba(255,255,255,0.25)] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 inline  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
         ></input>
         <button
            onClick={() => getSearchResults(search, status, type, sort, url)}
         >
            search
         </button>
      </>
   )
}
