import Image from 'next/image'
import Link from 'next/link'
import cls from 'classnames'

import styles from './card.module.css'
interface Props {
    name: string
    imageUrl: string
    href: string
    className: string
}

export default function Card({name, imageUrl, href}: Props) {
    return (
        <Link href={href} className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderapper}>
                    <h2 className={styles.cardHeader}>{name}</h2>

                </div>
                <div className={styles.cardImageWrapper}>

                </div>
                <Image className={styles.cardImage} alt={name} src={imageUrl} width={260} height={160}/>
            </div>
        </Link>
    )
}