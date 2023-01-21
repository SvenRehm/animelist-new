import React from "react"
import axios from "axios"

const CardInfo = ({ data }) => {
   return (
      <div>
         <h1>{data.attributes.canonicalTitle}</h1>
         <img src={data.attributes?.coverImage?.small} alt="asd" />
      </div>
   )
}

export const getStaticPaths = async () => {
   return {
      paths: [], //indicates that no page needs be created at build time
      fallback: "blocking", //indicates the type of fallback
   }
}

export const getStaticProps = async (context) => {
   const id = context.params.id
   const res = await axios.get(`https://kitsu.io/api/edge/anime/${id}`)
   const data = res.data.data
   return { props: { data } }
}

export default CardInfo
