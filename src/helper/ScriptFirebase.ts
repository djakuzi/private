

import { UserInfo } from "firebase/auth"
import { setDoc, doc, collection, getDocs, getDoc, updateDoc, arrayUnion, query, where } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import { TypeCorrespondenceCard, TypeCorrespondenceList } from "./interface"



//функция для добавления или обновления данных пользователя в базу данных, когда он залогинился или зарегестрировался

export const updateUserFireStore = async(data: UserInfo, status: boolean) => {

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
    };

    const userFirebase: any = {
        ...data,
        lastDateUserLogin: date.toLocaleString("ru-RU", optionsDate),
        lastTimeUserLogin: date.toLocaleString("ru-RU", optionsTime),
    }

    if(status){
        userFirebase.statusNetwork = true
    }

    if(!status){
        userFirebase.statusNetwork = false
    }

    setDoc(doc(db, "user", data.uid+ ""), userFirebase); // обычная информация о пользователе
  
}

//загрузка всех пользователей или одного пользователя или определенный пользователей
export const loadingPeoples = async (uid?:string, arrUid?:string[],arrOptions?:string[]) => {

    // если нужны определенные пользователи
    if(arrUid){
        let users: any = []
        const parametr = query(collection(db, "user"), where('uid', 'in', arrUid));
        const querySnapshot = await getDocs(parametr)
        
        querySnapshot.forEach( doc => {

            let obj:any = {}
            // если нужны определнные данные этих пользоваетелей
            if(arrOptions){

                for( let i = 0; i < arrOptions?.length; i++){
                    obj[arrOptions[i]] = doc.data()[arrOptions[i]]
                }
                users.push(obj)
            } else {
            //если нет списка определенных данных этих пользователей, то в массив кидаются полные данные о пользователе
                users.push(doc.data())
            }
            
        })
        return users
    }

    //если есть только индефикатор одного юзера
    if(uid){
        console.log('asd')
        let readyObj:any = {}
        const docSnap = await getDoc(doc(db, "user", uid + ""));

        if(docSnap.exists()){

            // если нужны определнные данные этого пользователя
            if(arrOptions){

                for( let i = 0; i < arrOptions?.length; i++){
                    readyObj[arrOptions[i]] = docSnap.data()[arrOptions[i]]
                }
            
            } else {
            //если нет списка определенных данных этих пользователей, то в массив кидаются полные данные о пользователе
              readyObj = docSnap.data()
            }

        }
        return docSnap.data()
    }

    //если нужны все пользователя
    const querySnapshot = await getDocs(collection(db, "user"));
    let users: any = []

    querySnapshot.forEach((doc) => {
        users.push(doc.data())
    });

    return users
}

//функция для изменения статуса сети пользователя: онлайн или не онлайн
export const sendStatusVisibilityStateUser = async () => {

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
    };

    if(document.visibilityState == 'visible'){


        const objStatusNetwork = {
            statusNetwork: true,
            lastDateUserLogin: date.toLocaleString("ru-RU", optionsDate),
            lastTimeUserLogin: date.toLocaleString("ru-RU", optionsTime),
        }

        const washingtonRef = doc(db, "user", auth.currentUser?.uid + "");

        await updateDoc(washingtonRef, objStatusNetwork);
    }

    if(document.visibilityState == 'hidden'){

        const objStatusNetwork = {
            statusNetwork: false,
            lastDateUserLogin: date.toLocaleString("ru-RU", optionsDate),
            lastTimeUserLogin: date.toLocaleString("ru-RU", optionsTime),
        }

        const washingtonRef = doc(db, "user", auth.currentUser?.uid + "");

        await updateDoc(washingtonRef, objStatusNetwork);
    }
    
}



//получить свежие данные пользователя, к примеру  для занесения обновлений в базу данных о пользователях
export const getUserData = () => {
    const user = auth.currentUser

    let objDataUser: any = {
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            phoneNumber: user?.phoneNumber,
            providerId: user?.providerId,
            uid: user?.uid
    }

    return objDataUser
}


//отправка сообщения 
export const sendMessage = async (uidCompound: string, textNewMessage: string, firstMessageValid: boolean) => {

    const uidAuth = auth.currentUser?.uid

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

    // add message in correspondence

    const addMessage = {
        uid: uidAuth,
        text: textNewMessage,
        date: date.toLocaleString("ru-RU", optionsDate),
        time: date.toLocaleString("ru-RU", optionsTime),
    }

    const firstMessage= {
        uidCompound: uidCompound,
        messages: [addMessage]
    }

    const otherMessage = {
        messages: arrayUnion(addMessage)
    }

    // throw new Error("sadsadsadasd");
    

    if (!firstMessageValid){
        
        await setDoc(doc(db, "correspondence", uidCompound + ""), firstMessage);
    
    } else if (firstMessageValid){
        
        await updateDoc(doc(db, "correspondence", uidCompound + ""), otherMessage);

    }
}


//отправка последнего собщения, чтоюбы у участников отображалась карточка переписки в кратком формате
const getCorrespondenceCards = async (uid: string, firstCard: TypeCorrespondenceList, otherCard: TypeCorrespondenceCard, correspondenceId?: string) => {
    
    const correspondenceCards = await getDoc(doc(db, "correspondenceCard", uid + ""));

    if(correspondenceCards.exists()){

         let correspondenceCardsData = correspondenceCards.data().correspondenceCards as TypeCorrespondenceCard[]
         const indexCard = correspondenceCardsData.findIndex( (el) => el.correspondenceId === correspondenceId)

        if(indexCard === -1){
            updateDoc(doc(db, "correspondenceCard", uid + ""), {correspondenceCards: arrayUnion(otherCard)});
            return
        }

        if( auth.currentUser?.uid != uid){

            let cardUserData: any
            correspondenceCardsData.forEach( (el, i) => (i == indexCard) ? cardUserData = el : null)

            otherCard.quantityMessage = cardUserData.quantityMessage + 1
        }

        let deleteCorrespondenceCard = correspondenceCardsData.filter( (_,i) => i != indexCard)
        correspondenceCardsData = [otherCard, ...deleteCorrespondenceCard]

        updateDoc(doc(db, "correspondenceCard", uid + ""), {correspondenceCards: correspondenceCardsData});

    } else {
        setDoc(doc(db, "correspondenceCard", uid + ""), firstCard);
    }

 
}

export const sendCorrespondenceCards = async (correspondenceId: string, lastMessage: string, uidCompanion: string) =>{

    const uidAuth = auth.currentUser?.uid as string

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

    // add lastMessage in correspondence for correspondenceList user

    const authUser = {
        correspondenceId,
        uidUser: uidCompanion,
        lastMessage,
        isReadValid: false,
        sendUserMessage: uidAuth,
        quantityMessage: 1,
        date: date.toLocaleString("ru-RU", optionsDate),
        time: date.toLocaleString("ru-RU", optionsTime),
    }

    const firstCardAuthUser = {
        correspondenceCards: [authUser]
    }

    getCorrespondenceCards(uidAuth,firstCardAuthUser,authUser, correspondenceId)

    const companionUser ={
        correspondenceId,
        uidUser: uidAuth,
        lastMessage,
        isReadValid: true,
        sendUserMessage: uidAuth,
        quantityMessage: 1,
        date: date.toLocaleString("ru-RU", optionsDate),
        time: date.toLocaleString("ru-RU", optionsTime),
    }

    const firstCardcompanionUser = {
        correspondenceCards: [companionUser]
    }



    getCorrespondenceCards(uidCompanion,firstCardcompanionUser,companionUser, correspondenceId)

}

//при открывании переписки с другим пользователем, отправлять данные, что сообщения прочитаны

export const sendMessageRead = async (authUid:string, correspondenceId:string) => {
    
    const correspondenceCards = await getDoc(doc(db, "correspondenceCard", authUid + ""));

    if(correspondenceCards.exists()){
        
        let correspondenceCardsData = correspondenceCards.data().correspondenceCards as TypeCorrespondenceCard[]
        const indexCard = correspondenceCardsData.findIndex( (el) => el.correspondenceId === correspondenceId)

        if(indexCard === -1) return
        
        let userCards = correspondenceCardsData[indexCard]

        userCards.isReadValid = false
        userCards.quantityMessage = 0

        correspondenceCardsData[indexCard] = userCards

        updateDoc(doc(db, "correspondenceCard", authUid + ""), {correspondenceCards: correspondenceCardsData});

    }
}
