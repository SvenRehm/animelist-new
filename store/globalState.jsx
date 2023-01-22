import { createContext, useContext, useState } from "react"

const GlobalContext = createContext(undefined)

export function GlobalProvider({ children }) {
   const [data, setData] = useState([])
   const [type, setType] = useState("tv")
   const [search, setSearch] = useState("")
   const [searchresult, setSearchResult] = useState([])
   const [sort, setSort] = useState("popularityRank")
   const [status, setStatus] = useState("finished")
   const [nextPage, setNextPage] = useState("https://kitsu.io/api/edge/anime")

   return (
      <GlobalContext.Provider
         value={{
            data,
            setData,
            type,
            setType,
            search,
            setSearch,
            searchresult,
            setSearchResult,
            sort,
            setSort,
            status,
            setStatus,
            nextPage,
            setNextPage,
         }}
      >
         {children}
      </GlobalContext.Provider>
   )
}

export function useGlobal() {
   const context = useContext(GlobalContext)

   if (!context)
      throw new Error("usePokemon must be used inside a `PokemonProvider`")

   return context
}
