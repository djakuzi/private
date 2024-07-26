import { useEffect, useState } from 'react';
import styles from './InfoUserProfile.module.css';
import cn from 'classnames';
import AvatarUser from '../AvatarUser/AvatarUser';
import { InfoUserProfileProps } from './InfoUserProfile.props';

export default function InfoUserProfile(props: InfoUserProfileProps){


    const [validInfo, setValidInfo] = useState<boolean>(false)

    useEffect( () => {setValidInfo(false)}, [props])
    
    return(
        <div className={styles['info']}>

            <div className={styles['info__container']}>
                <AvatarUser photoUrl={props.photoURL} displayName={props.displayName} classAvatar={styles['avatar']} classAvatarName={styles['avatarName']}/>
                <div className={styles["name"]}>{props?.displayName}</div>
                
                { props?.statusNetwork && <div className={styles["online"]}> В сети</div>}
                { !props?.statusNetwork && <div className={styles["offlinet"]}>{props.lastDateUserLogin}</div>}
                <hr className={styles.line}/>
                <div className={styles["more"]} onClick={() => setValidInfo(!validInfo)}>Подробнее</div>
            </div>

            

            <div className={ cn(styles['info__details'], {
                [styles.open]: validInfo
            })}>
                <div className={styles["email"]}> email: {props.email}</div>
                <hr className={styles.line}/>
                {props.phoneNumber &&<div className={styles["number"]}>Номер: {props.phoneNumber}</div>}
                {!props.phoneNumber && <div className={styles["number"]}>Номер: Нет номера</div>}
            </div>

        </div>
    )
}