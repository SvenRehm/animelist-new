import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

const Card = (props) => {
   const { title, description, attributes, id } = props
   return (
      <div>
         <Link href="/card/[id]" as={`/card/${id}`}>
            <h2>{title}</h2>
            <img src={attributes?.coverImage?.small} alt="asd" />
         </Link>
      </div>
   )
}

const AnimeList = () => {
   const [data, setData] = useState([])
   const [searchresult, setSearchResult] = useState([])
   const [search, setSearch] = useState("")

   useEffect(() => {
      //   getAnime(20)
      getAnimeSorted(20, "popularityRank")
   }, [])

   const handleSearchState = (e) => {
      setSearch(e.target.value)
   }

   const getAnime = (amount) => {
      axios
         .get(`https://kitsu.io/api/edge/anime?page[limit]=${amount}`)
         .then((response) => setData(response.data.data))
         .catch((error) => console.log(error))
   }

   const getAnimeSorted = (amount, sort) => {
      axios
         .get(
            `https://kitsu.io/api/edge/anime?page[limit]=${amount}&sort=${sort}`
         )
         .then((response) => setData(response.data))
         .catch((error) => console.log(error))
   }

   const getSearchResults = () => {
      axios
         .get(`https://kitsu.io/api/edge/anime?filter[text]=${search}`)
         .then((response) => setSearchResult(response.data.data))
         .catch((error) => console.log(error))
   }

   //fetch(`${url}?filter[subtype]=${subtype}&sort=${sort}`
   //type "tv" | "movie" | "special" | "ONA" | "OVA"
   // sort  "popularityRank" |"averageRating" |"-averageRating"
   // status "finished" | "current" | "upcoming"

   const getFilteredAnime = (status, subtype, sort) => {
      axios
         .get(
            `https://kitsu.io/api/edge/anime?filter%5Bstatus%5D=${status}&filter%5Bsubtype%5D=${subtype}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=${sort}`
         )
         .then((response) => setData(response.data.data))
         .catch((error) => console.log(error))
   }

   console.log(data)

   return (
      <div>
         <input type="text" onChange={(e) => handleSearchState(e)} />
         <button onClick={() => getSearchResults()}> search</button>
         {searchresult.length === 0 && data.data
            ? data.data.map((item) => (
                 <Card
                    key={item.id}
                    id={item.id}
                    title={item.attributes.canonicalTitle}
                    description={item.body}
                    attributes={item.attributes}
                 />
              ))
            : ""}

         {searchresult ? (
            searchresult.map((item) => (
               <Card
                  key={item.id}
                  id={item.id}
                  title={item.attributes.canonicalTitle}
                  description={item.body}
                  attributes={item.attributes}
               />
            ))
         ) : (
            <h1>Loading</h1>
         )}

         {!data.data?.length && <h1>Loading...</h1>}
      </div>
   )
}

export default AnimeList
