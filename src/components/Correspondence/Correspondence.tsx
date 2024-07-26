

import styles from './Correspondence.module.css'
import { useEffect, useState } from 'react'
import { TypeCorrespondence } from '../../helper/interface'
import MessageList from '../MessageList/MessageList'
import TopHeader from '../TopHeader/TopHeader'
import { CorrespondenceProps } from './Correspondence.props'
import SendMessage from '../SendMessage/SendMessage'
import { db } from '../../firebase/firebase'
import { onSnapshot, doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import SkeletonBlock from './SkeletonBlock/SkeletonBlock'

export default function Correspondence(props:CorrespondenceProps){

    const [messages, setMessages] = useState<TypeCorrespondence | null>(null)
    const {displayNameCompanion} = useSelector( (s:RootState) => s.correspondence)
    const [isMessageValid, setIsMessageValid] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

  
    useEffect(() => {
        setMessages(null)
        setLoading(true)
        const unsub = onSnapshot(doc(db, "correspondence", props.uidCompound),{ includeMetadataChanges: false}, (doc) => {
            setMessages(doc.data() as TypeCorrespondence)
            
            if(doc.exists()){
                setIsMessageValid(true)
                setLoading(false)
            } else {
                setIsMessageValid(false)
            }

        });

        return (() => {
            unsub()
        })

    }, [props.uidCompound])
    

    return(
        <div className={styles['correspondence']}>
            <TopHeader title={'Чат с ' + displayNameCompanion}/>
            {loading && !messages && isMessageValid && <SkeletonBlock/>}
            {!isMessageValid && <div className={styles['no-message']}> <div> Нет сообщений</div></div>}
            {messages && <MessageList messages={messages}/>}
            <SendMessage availabilityMessages={isMessageValid} uidCompound={props.uidCompound}/>
        </div>
    )
}