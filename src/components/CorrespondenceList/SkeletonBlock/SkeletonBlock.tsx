
import styles from './SkeletonBlock.module.css'



export default function SkeletonBlock() {

    const arr = Array(7).fill(5)
    return (
        <div className={styles['loading']}>
            {arr.map( (_,i) => {

                return <div key={i} className={styles['skeleton']}>
                            <div className={styles['circle']}></div>
                            <div className={styles['text']}></div>
                        </div>
            })}
        </div>
    )

}