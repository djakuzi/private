
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { getUidCompound } from '../../helper/ScriptHelp';
import { correspondenceAction } from '../../redux/slice/correspondence.slice';
import { AppDispatch } from '../../redux/store';
import styles from './WriteMessage.module.css';
import { WriteMessageProps } from './WriteMessage.props';


export default function WriteMessage(props:WriteMessageProps){

    const [uidCompound, setUidCompound] = useState<string>()
    const dispatch = useDispatch<AppDispatch>()
    const correspondenceData:any = {
        uidCompanion: props.uid,
        displayNameCompanion: props.displayName,
        photoUrlCompanion: props.photoUrl,
    }
    
    useEffect( () => {
        setUidCompound(getUidCompound(auth.currentUser?.uid as string, props.uid))
    }, [])

    return(
        <Link onClick={()=> dispatch(correspondenceAction.updateCorrespondence(correspondenceData))} to={'/private/menu/chat/сorrespondence/:' + uidCompound} className={styles['link']}>
            Написать сообщение
        </Link >
    )
}