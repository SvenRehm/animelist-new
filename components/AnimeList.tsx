import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import SelectComponent from "./Select"
import SearchComponent from "./SearchComponent"
import InfiniteScroll from "react-infinite-scroller"

const Card = (props) => {
   const { title, description, attributes, id } = props
   return (
      <div>
         <Link
            href="/card/[id]"
            as={`/card/${id}`}
            className="hover:text-[#63a4ff] text-xs font-bold text-white"
         >
            <img
               src={attributes?.posterImage?.large}
               alt="asd"
               className="w-full min-h-[270px]"
            />
            <h4 className="mt-2">{title} </h4>
         </Link>
         <h5 className="text-xs ">{/* {episodeCount} */}27- Episodes</h5>
         <p>
            {/* {
         averageRating} */}
         </p>
      </div>
   )
}

const AnimeList = () => {
   const [data, setData] = useState([])
   const [searchresult, setSearchResult] = useState([])
   const [search, setSearch] = useState("")
   const [type, setType] = useState("tv")
   const [sort, setSort] = useState("popularityRank")
   const [status, setStatus] = useState("finished")
   const [nextPage, setNextPage] = useState("https://kitsu.io/api/edge/anime")

   //env
   const url = "https://kitsu.io/api/edge/anime"
   useEffect(() => {
      getAnime(url, type, sort, status)
   }, [])

   // useEffect(() => {
   //    getSearchResults(search, status, type, sort, url)
   // }, [search])

   const getAnime = (url, type, sort, status, search) => {
      axios
         .get(
            `${url}?filter[text]=${search}?filter%5Bstatus%5D=${status}&filter%5Bsubtype%5D=${type}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=${sort}`
         )
         .then((response) => {
            setData(response.data.data)
            setNextPage(response.data.links.next)
         })
         .catch((error) => console.log(error))
   }

   const getNextSearchPage = (nextPage) => {
      axios
         .get(nextPage)
         .then((response) => {
            setSearchResult([...searchresult, ...response.data.data])
            setNextPage(response.data.links.next)
         })
         .catch((error) => console.log(error))
   }

   const getNextRecommendedPage = (nextPage) => {
      axios
         .get(nextPage)
         .then((response) => {
            console.log(data)
            console.log(response.data.data)
            setData([...data, ...response.data.data])
            setNextPage(response.data.links.next)
         })
         .catch((error) => console.log(error))
   }

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

   // console.log(data, "data")
   console.log(searchresult, "searchresult")
   // console.log(search, "search")
   // console.log(nextPage, "nextPage")
   // console.log(type, "type")
   // console.log(sort, "sort")

   return (
      <div>
         <SearchComponent onChange={(e) => setSearch(e)} value={search} />
         <button
            onClick={() => getSearchResults(search, status, type, sort, url)}
         >
            search
         </button>

         <button
            className="bg-[#63a4ff] text-white p-2 rounded-md]"
            onClick={() => getNextSearchPage(nextPage)}
         >
            more
         </button>

         <h1 className="text-4xl font-bold">Recommended</h1>

         <div className="flex space-x-4">
            <SelectComponent
               className=""
               options={["tv", "movie", "special", "ONA", "OVA"]}
               onChange={setType}
               value={type}
            />

            <SelectComponent
               options={["popularityRank", "averageRating", "-averageRating"]}
               onChange={setSort}
               value={sort}
            />

            <SelectComponent
               options={["finished", "current", "upcoming"]}
               onChange={setStatus}
               value={status}
            />
         </div>

         {data && !searchresult.length && (
            <InfiniteScroll
               pageStart={0}
               loadMore={() => getNextRecommendedPage(nextPage)}
               hasMore={data.length <= 100}
               initialLoad={false}
               loader={
                  <div className="loader" key={0}>
                     Loading ...
                  </div>
               }
            >
               <div className="grid">
                  {data.map((item) => (
                     <Card
                        key={item.id}
                        id={item.id}
                        title={item.attributes?.canonicalTitle}
                        description={item?.body}
                        attributes={item?.attributes}
                     />
                  ))}
               </div>
            </InfiniteScroll>
         )}
         {searchresult && (
            <InfiniteScroll
               pageStart={0}
               loadMore={() => getNextSearchPage(nextPage)}
               hasMore={data.length <= 100}
               initialLoad={false}
               loader={
                  <div className="loader" key={0}>
                     Loading ...
                  </div>
               }
            >
               <div className="grid">
                  {searchresult.map((item) => (
                     <Card
                        key={item.id}
                        id={item.id}
                        title={item.attributes?.canonicalTitle}
                        description={item.body}
                        attributes={item.attributes}
                     />
                  ))}
               </div>
            </InfiniteScroll>
         )}

         {!data.data?.length && <h1>Loading...</h1>}
      </div>
   )
}

export default AnimeList
