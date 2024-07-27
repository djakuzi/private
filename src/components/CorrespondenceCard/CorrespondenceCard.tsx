
import styles from './CorrespondenceCard.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypePeople } from '../../helper/interface';
import { loadingPeoples, sendMessageRead } from '../../helper/ScriptFirebase';
import AvatarUser from '../AvatarUser/AvatarUser';
import { CorrespondenceCardProps } from './CorrespondenceCard.props';
import { useDispatch } from 'react-redux';
import { correspondenceAction } from '../../redux/slice/correspondence.slice';
import { AppDispatch } from '../../redux/store';
import { auth } from '../../firebase/firebase';


export default function CorrespondenceCard(props:CorrespondenceCardProps){
    const authUser = auth.currentUser
    const [dataUser, setDataUser] = useState<TypePeople>()
    const dispatch = useDispatch<AppDispatch>()
    const correspondenceData:any = {
        uidCompanion: props.uidUser,
        displayNameCompanion: dataUser?.displayName,
        photoUrlCompanion: dataUser?.photoURL,
    }

    useEffect( () =>{
        const arrOptions = ['displayName', 'photoURL', 'statusNetwork']
        loadingPeoples(props.uidUser,undefined,arrOptions).then( el => setDataUser(el))
    } ,[props])

    const handleLink = () => {

        dispatch(correspondenceAction.updateCorrespondence(correspondenceData))
        sendMessageRead(auth.currentUser?.uid!,props.correspondenceId)
    }

    return(
        <Link onClick={()=> handleLink()} to={'/menu/chat/сorrespondence/:' + props.correspondenceId} className={styles['correspondenceCard']}>
                {dataUser && <AvatarUser photoUrl={dataUser.photoURL} displayName={dataUser.displayName} classAvatar={styles['avatar']} classAvatarName={styles['avatarName']} statusNetwork={dataUser.statusNetwork} classStatusNetwork={styles['statusNetwork']}/>}
                <div className={styles['info']}>
                    <div className={styles['name']}>{dataUser?.displayName}</div>
                    <div className={styles['lastMessage']}> {authUser?.uid == props.sendUserMessage ? 'Вы: ' : ""} { props.lastMessage}</div>
                </div>
                <div className={styles['date']}>{props.date}</div>
                {props.isReadValid && <div className={styles['read']}>{props.quantityMessage}</div>}

        </Link >
    )
}