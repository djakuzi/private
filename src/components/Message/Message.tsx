

import styles from './Message.module.css'
import { MessageProps } from './Message.props'
import cn from 'classnames';
import AvatarUser from '../AvatarUser/AvatarUser';
import loadingIMG from '../../../public/menu/chat/loadingSendMessage.svg'



export default function Message(props:MessageProps){

    return(
        <div className={ cn (styles['message'], {
            [styles.valid] : props.authUid
        })} >
            
            <AvatarUser {...props.moreInfo} classAvatar={styles['avatar']} classAvatarName={styles['avatarName']}/>
            <div className={styles['data']}>
                <div className={styles['name']}>{props.moreInfo.displayName}</div>
                <div className={styles['text']}>{props.data.text}</div>
                <div className={styles['data__container']}>
                    {props.isValidSend && <img className={styles['loading']} src={loadingIMG}alt="отправка" />}
                    <div className={styles['time']}>{props.data.time}</div>
                </div>
            </div>

            {props.isValidError && <div className={styles['error']}>X</div>}
        </div>
    )
}