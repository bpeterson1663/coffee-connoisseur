import { CoffeeStore, FourSquareCoffee } from '@/models'
import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY || '',
})

function getFourSqaureUrl(query: string, latLong: string, limit: string) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

async function getCoffeeStoreImages(perPage: number) {
  const results = await unsplash.search.getPhotos({
    query: 'coffee',
    perPage,
  })
  return results.response?.results.map(result => result.urls['small'])
}

export async function fetchCoffeeStores() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOUR_SQUARE_API || '',
    }
  }
  const response = await fetch(
    getFourSqaureUrl('coffee', '44.934149%2C-93.340332', '6'), 
    options)
  const data = await response.json()
  const images = await getCoffeeStoreImages(data.length)

  const coffeeStores: CoffeeStore[] = data.results.map((fs: FourSquareCoffee, idx: number) => {
    const store: CoffeeStore = {
      id: fs.fsq_id,
      name: fs.name,
      imgUrl: images ? images[idx] : 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      address: fs.location.address,
      neighbourhood: fs.location.dma,
      websiteUrl: ''
    }
    return store
  })

  return coffeeStores
}