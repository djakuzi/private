
import styles from './StatusFriend.module.css';
import { StatusFriendProps } from './StatusFriend.props';


export default function StatusFriend(props:StatusFriendProps){


    
    if(props.isFriendValid){
        <div className={styles['friend']}>
            Удалить из друзей
        </div >
    }

    return(
        <div className={styles['friend']}>
            Добавить в друзья
        </div >
    )
}