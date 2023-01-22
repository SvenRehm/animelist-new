import type { PokemonProps } from "./types"
import axios from "axios"
import { useGlobal } from "../store/globalState"

export const API = "https://kitsu.io/api/edge/anime"

export const getAnime = (type, sort, status) => {
   axios
      .get(
         `${API}?filter%5Bstatus%5D=${status}&filter%5Bsubtype%5D=${type}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=${sort}`
      )
      .then((response) => {
         console.log(response)

         //      setData(response.data.data)
         //      setNextPage(response.data.links.next)
      })
      .catch((error) => console.log(error))
}

// export const fetchPkm = async () => {
//    const resp = await fetch(
//       `${API}pokemon?offset=${Math.floor(Math.random() * (1000 + 1))}`
//    )

//    const {
//       results,
//    }: {
//       results: {
//          name: string
//       }[]
//    } = await resp.json()

//    return {
//       pokemon: results[0].name,
//    }
// }

// export const fetchPkmProps = async (character: string) => {
//    const resp = await fetch(`${API}pokemon/${character}`)
//    const pkmProps: PokemonProps = await resp.json()

//    return pkmProps
// }

// export const fetchRandomPkm = async () => {
//    const { pokemon: randomPokemon } = await fetchPkm()
//    const pokemonData = await fetchPkmProps(randomPokemon)

//    return pokemonData
// }
