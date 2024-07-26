
import styles from './SkeletonBlock.module.css'
import cn from 'classnames';


export default function SkeletonBlock() {

    const arr = Array(20).fill(30).map( (_, i) => i % 2 == 1)
    return (
        <div className={styles['loading']}>

            {arr.map( (el,i) => {

                return <div key={i} className={ cn(styles['skeleton'], {
                    [styles['right']] : el,
                })}>
                            <div className={styles['circle']}></div>
                            <div className={styles['text']}></div>
                    </div>
            })}
        </div>
    )
}