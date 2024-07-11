
import styles from './PostUser.module.css';
import { PostUserProps } from './PostUser.props';



export default function PostUser(props:PostUserProps){




    return (

        <div className={styles['postUser']}>

            <div className={styles['info']}>
                <div className={styles['info__name']}>{props.displayName}</div>
                <div className={styles['info__date']}>{props.time}</div>
            </div>

            <hr className={styles['hr']} />

            <div className={styles['text']}>{props.text}</div>
            
        </div>
    )
}