
import { autoHeight } from '../../helper/ScriptHelp';
import styles from './SendMessage.module.css';
import { SendMessageProps } from './SendMessage.props';
import sendMessageIMG from '../../../public/menu/chat/sendMessage.svg'
import { useRef, useState } from 'react';
import { sendCorrespondenceCards, sendMessage, } from '../../helper/ScriptFirebase';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase';
import { correspondenceAction, MessagesState } from '../../redux/slice/correspondence.slice';



export default function SendMessage(props:SendMessageProps){

    const [textNewMessage, setTextNewMessage] = useState<string>('')

    const refTextarea = useRef<HTMLTextAreaElement>(null)

    const {sendMessages, uidCompanion} = useSelector( (s:RootState) => s.correspondence)
    const dispatch = useDispatch<AppDispatch>()

    const heandlerSubmitNewMessage = () => {

        const date = new Date()

        const optionsDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Europe/Moscow',
        };
        const optionsTime: Intl.DateTimeFormatOptions = {
            timeZone: 'Europe/Moscow',
            hour: 'numeric',
            minute: 'numeric',
            second: undefined
        };

        let message:MessagesState = {
            id: sendMessages.length + 1,
            isValidSend: true,
            uid: auth.currentUser?.uid as string,
            text: textNewMessage,
            date: date.toLocaleString("ru-RU", optionsDate),
            time: date.toLocaleString("ru-RU", optionsTime),
        }

        dispatch(correspondenceAction.sendLoading(message))
        
        sendMessage(props.uidCompound, textNewMessage, props.availabilityMessages)
        .then( () => {
            setTextNewMessage('')
            if(refTextarea.current){
                refTextarea.current.style.height = 40 + 'px'
            }
            dispatch(correspondenceAction.deleteLoading(message.id))
        })
        .catch( () => {
            console.log('TEST')
            setTextNewMessage('')
            const messageError = {
                ...message,
                isValidError: true,
            }
            dispatch(correspondenceAction.errorLoading(messageError))
        })

        sendCorrespondenceCards(props.uidCompound, textNewMessage, uidCompanion)

    }

    return (
        <div className={styles['message']}>
            <textarea 
                ref={refTextarea}
                className={styles['textarea']}
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoHeight(e, 150, 40)} 
                placeholder='Новое сообщение'
                value={textNewMessage}
                onChange={(e) => setTextNewMessage(e.target.value)} 
            />   

            <div onClick={heandlerSubmitNewMessage} className={styles['send']}>
                <img src={sendMessageIMG} alt="иконка отправки сообщения" />
            </div>

        </div>
    )
}


