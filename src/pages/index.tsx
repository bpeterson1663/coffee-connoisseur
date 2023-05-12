import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Banner } from '@/components'
import { Card } from '@/components'

import coffeeStores from '../db/coffee-stores.json'
import { CoffeeStore } from '@/models'
import { fetchCoffeeStores } from '@/lib/coffee-stores'
import useTrackLocation from '@/hooks/use-track-location'

export async function getStaticProps() {
  // make fetch call here
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      data: {
        coffeeStores
      }
    }
  }
}

interface Props {
  data: {
    coffeeStores: CoffeeStore[]
  }
}

export default function Home(props: Props) {
  const { handleTrackLocation, latLong, locationErrorMsg, isLoading } = useTrackLocation()
  function handleOnBannerBtnClick() {
    handleTrackLocation()
  }

  const { data } = props
  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Local coffee shop browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isLoading ? 'Loading...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image alt="Coffee Connoisseur" src="/static/hero-image.png" width={700} height={400} />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {data.coffeeStores.map(coffeeStore => (
                <Card 
                  key={coffeeStore.id}
                  name={coffeeStore.name} 
                  imageUrl={coffeeStore.imgUrl}
                  href={`/coffee-store/${coffeeStore.id}`}
                  className={styles.card} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
