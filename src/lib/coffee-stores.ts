import { CoffeeStore, FourSquareCoffee } from "@/models";

export async function fetchCoffeeStores() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOUR_SQUARE_API || "",
        }
    };
    const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=44.934149%2C-93.340332&limit=6', options)
    const data = await response.json()

    const coffeeStores: CoffeeStore[] = data.results.map((coffeeStore: FourSquareCoffee) => {
        return {
            id: coffeeStore.fsq_id,
            name: coffeeStore.name,
            imgUrl: coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        }
    })

    return coffeeStores
}