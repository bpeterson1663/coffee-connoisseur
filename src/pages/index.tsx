import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Banner } from '@/components'
import { Card } from '@/components'

import coffeeStores from '../db/coffee-stores.json'

export async function getStaticProps() {
  // make fetch call here
  return {
    data: {
      coffeeStores,
    }
  }
}

interface CoffeeStore {
  id: number
  name: string
  imgUrl: string
  websiteUrl: string
  address: string
  neighbourhood: string
}

interface Props {
  coffeeStores: CoffeeStore[]
}
export default function Home(props: Props) {

  function handleOnBannerBtnClick() {
    console.log("banner button clicke")
  }

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
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image alt="Coffee Connoisseur" src="/static/hero-image.png" width={700} height={400} />
        </div>
        <div className={styles.cardLayout}>
          {props.coffeeStores.map(coffeeStore => (
            <Card 
              key={coffeeStore.id}
              name={coffeeStore.name} 
              imageUrl={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.id}`}
              className={styles.card} />
          ))}
        </div>
      </main>
    </>
  )
}
