import { useRouter } from "next/router";
import Link from "next/link"
import { GetStaticProps } from 'next'

import coffeeStores from '../../db/coffee-stores.json'
import Head from "next/head";

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
  const { address, name, neighbourhood } = coffeeStore

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        Back to home
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};
  
