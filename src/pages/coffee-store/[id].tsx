import { useRouter } from "next/router";
import Link from "next/link"

import coffeeStores from '../../db/coffee-stores.json'
import Head from "next/head";
import styles from './coffee-store.module.css'
import Image from "next/image";
import cls from 'classnames'

interface StaticProps {
  params: {
    id: string
  }
}

export function getStaticProps(staticProps: StaticProps) {
  const { params } = staticProps
  return {
    props: {
      coffeeStore: coffeeStores.find(coffeeStore => coffeeStore.id.toString() === params.id)
    }
  }
}

export function getStaticPaths() {
  const paths = coffeeStores.map(coffeeStore => ({
    params: {
      id: coffeeStore.id.toString()
    }
  }))
  return {
    paths,
    fallback: true
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
  coffeeStore: CoffeeStore
}

export default function CoffeeStore({coffeeStore}: Props) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const { address, name, neighbourhood, imgUrl } = coffeeStore
  function handleUpvoteButton() {
    console.log("clicked");
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHome}>
            <Link href="/">
              Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image src={imgUrl} alt={name} width={600} height={360} className={styles.storeImg}/>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={24} height={24} alt={address} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width={24} height={24} alt={neighbourhood} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} alt="rating" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote!</button>
        </div>
      </div>
    </div>
  );
};
  
