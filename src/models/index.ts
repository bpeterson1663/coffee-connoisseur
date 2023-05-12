export interface CoffeeStore {
  id: string
  name: string
  imgUrl: string
  websiteUrl: string
  address: string
  neighbourhood: string
}

export interface FourSquareCoffee{ 
  fsq_id: string
  name: string
  imgUrl: string
  location: {
    address: string
    dma: string
  }
}