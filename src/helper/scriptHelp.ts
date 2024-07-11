// функция позволяющая увеличивать выосту textarea или другого блока для избежания появления полосы прокрутки

import { UserInfo } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const autoHeight =  (el:React.ChangeEvent<HTMLTextAreaElement>) =>{

    el.target.style.height = 25 + 'px'
    el.target.style.height = el.target.scrollHeight + 'px'
}


//функция для добавления или обновления данных пользователя в базу данных, когда он залогинился или зарегестрировался

export const addUserFireStore = async(data: UserInfo) => {

    const date = new Date()

    const optionsDate: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    const userFirebase = {
        ...data,
        statusNetwork: true,
        lastDateUserLogin: date.toLocaleString("ru", optionsDate),
        lastTimeUserLogin: date.toLocaleString("ru", optionsTime),
    }


    setDoc(doc(db, "user", data.uid+ ""), userFirebase); // обычная информация о пользователе
  
}