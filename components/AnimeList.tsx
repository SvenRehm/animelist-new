import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import SelectComponent from "./Select"
import SearchComponent from "./SearchComponent"
import InfiniteScroll from "react-infinite-scroller"
import { useSearchContext } from "../store/SearchState"
import { useGlobal } from "../store/globalState"
import { CircleSpinner } from "react-spinners-kit"

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
   const {
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
   } = useGlobal()

   const [loading, setLoading] = useState(false)
   const [typeloading, setTypeLoading] = useState(false)
   //env
   const url = "https://kitsu.io/api/edge/anime"
   useEffect(() => {
      getAnime(url, type, sort, status)
   }, [type, sort, status])

   const getAnime = (url, type, sort, status, search) => {
      setLoading(true)
      axios
         .get(
            `${url}?filter[text]=${search}?filter%5Bstatus%5D=${status}&filter%5Bsubtype%5D=${type}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=${sort}`
         )
         .then((response) => {
            setData(response.data.data)
            setNextPage(response.data.links.next)
            setLoading(false)
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
      setLoading(true)
      axios
         .get(nextPage)
         .then((response) => {
            setData([...data, ...response.data.data])
            setNextPage(response.data.links.next)
            setLoading(false)
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
         <h1 className="my-20 text-4xl font-bold">Recommended</h1>

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
         {typeloading && (
            <div className="flex items-center justify-center w-full pb-20">
               <CircleSpinner size={100} />
            </div>
         )}

         {/* {loading && <div>Loading</div>} */}
         {data && (
            <InfiniteScroll
               pageStart={0}
               loadMore={() => getNextRecommendedPage(nextPage)}
               hasMore={data.length <= 100}
               initialLoad={false}
               loader={
                  loading && (
                     <div
                        className="flex items-center justify-center w-full pb-20"
                        key={0}
                     >
                        <CircleSpinner size={100} />
                     </div>
                  )
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

         {/* {searchresult && (
            <InfiniteScroll
               pageStart={0}
               loadMore={() => getNextSearchPage(nextPage)}
               hasMore={data.length <= 100}
               initialLoad={false}
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
         )} */}
         {/* search */}
         {/* {searchresult && (
            <InfiniteScroll
               pageStart={0}
               loadMore={() => getNextSearchPage(nextPage)}
               hasMore={data.length <= 100}
               initialLoad={false}
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
         )} */}
      </div>
   )
}

export default AnimeList
