import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Banner } from '@/components'
import { Card } from '@/components'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
          <Card name="Dark Horse" imageUrl="/static/hero-image.png" href="/coffee-store/dark-horse" className={styles.card} />
          <Card name="Dark Horse" imageUrl="/static/hero-image.png" href="/coffee-store/dark-horse" className={styles.card} />
          <Card name="Dark Horse" imageUrl="/static/hero-image.png" href="/coffee-store/dark-horse" className={styles.card} />
          <Card name="Dark Horse" imageUrl="/static/hero-image.png" href="/coffee-store/dark-horse" className={styles.card} />
        </div>
      </main>
    </>
  )
}
