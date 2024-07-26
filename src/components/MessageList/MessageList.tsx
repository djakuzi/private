
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase/firebase'
import { RootState } from '../../redux/store'
import Message from '../Message/Message'
import styles from './MessageList.module.css'
import { MessageListProps } from './MessageList.props'


export default function MessageList(props: MessageListProps){

    const authUser = auth.currentUser
    const {sendMessages, errorMessages} = useSelector( (s:RootState) => s.correspondence)
    const {displayNameCompanion, uidCompanion, photoUrlCompanion} = useSelector( (s:RootState) => s.correspondence)
    const refScrool = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        refScrool.current?.scrollIntoView({
            // behavior: 'smooth',
            block: 'end',
        })

    }, [props.messages.messages, sendMessages, errorMessages])

    return(
        <div className={styles['list']}>
            {/* сообшения с сервера */}
            {props.messages.messages.map( (el, i) => {

                const moreInfo = (uidCompanion == el.uid) ? {
                    displayName: displayNameCompanion,
                    photoUrl: photoUrlCompanion
                } : {
                    displayName: authUser?.displayName as string,
                    photoUrl: authUser?.photoURL as string
                };


                return <Message key={i} authUid={authUser?.uid == el.uid} data={el} moreInfo={moreInfo}/>
            })}

            {/* сообщения, которые отправляются */}
            {sendMessages?.map( (el, i) => {

                const moreInfo = (uidCompanion == el.uid) ? {
                    displayName: displayNameCompanion,
                    photoUrl: photoUrlCompanion
                } : {
                    displayName: authUser?.displayName as string,
                    photoUrl: authUser?.photoURL as string
                };

                return <Message key={i} authUid={authUser?.uid == el.uid} data={el} moreInfo={moreInfo} isValidSend={el.isValidSend}/>
            })}

            {/* cообщения, которые не отправились */}

            {errorMessages?.map( (el, i) => {

                const moreInfo = (uidCompanion == el.uid) ? {
                    displayName: displayNameCompanion,
                    photoUrl: photoUrlCompanion
                } : {
                    displayName: authUser?.displayName as string,
                    photoUrl: authUser?.photoURL as string
                };

                return <Message key={i} authUid={authUser?.uid == el.uid} data={el} moreInfo={moreInfo} isValidError={el.isValidError}/>
            })}


            <div ref={refScrool} className={styles['scroll']}>scroll to</div>
        </div>
    )
}