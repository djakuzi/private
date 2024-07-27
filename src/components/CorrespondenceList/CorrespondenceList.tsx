
import styles from './CorrespondenceList.module.css'
import { onSnapshot, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import {  TypeCorrespondenceList} from '../../helper/interface'
import CorrespondenceCard from '../CorrespondenceCard/CorrespondenceCard'
import SkeletonBlock from './SkeletonBlock/SkeletonBlock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function CorrespondenceList(){

    const [dataCorrespondence, setDataCorrespondence] = useState<TypeCorrespondenceList>() // данные карточек переписок
    // const [dataUser, setDataUser] = useState<TypePeople[]>() данные пользователей НЕ ИСПОЛЬЗУЕТСЯ
    const [loading, setLoading] = useState<boolean>(true)
    // const [uidUser, setUidUser] = useState<string>('')


    const uid = useSelector( (s:RootState) => s.user.profile?.uid)

    useEffect( ()=> {

        if(!uid) return
        setLoading(true)
        const onsub =  onSnapshot(doc(db, "correspondenceCard", uid), (doc) => {
            setDataCorrespondence(doc.data() as TypeCorrespondenceList)
            setLoading(false)
            
        });


        return ( () => {
            onsub()
        })
    },[])

    // useEffect( () => {
    //     if(dataCorrespondence){
    //         setUidUser(dataCorrespondence?.correspondenceCards[0].correspondenceId)
    //     }
        
    // }, [dataCorrespondence])


    if(dataCorrespondence){ // РАБОТАЕТ ЧИТАТЬ ОПИСАНИЕ НИЖЕ В КОММЕНТАХ

        // можно было бы сразу кидать необходимые данные для картояки переписок, но тогда чтение документов пользователей происходило все время, поэтому придется читать данные о пользователе уже в самой карточке пользователя
        const arrOptions = ['displayName', 'photoURL', 'statusNetwork'] // массив свойств, которые нужно взять из данных о пользователях
        const arrUid = dataCorrespondence.correspondenceCards.map( el => el.uidUser) // массив индетификаторов пользователей, чтобы можно было прочитать данные
        // loadingPeoples(undefined,arrUid,arrOptions).then( el => setDataUser(el)) !!!!!!!!! не включать эту функцию ЧТЕНИЕ ЗАПИСИ БУДЕТ ИДТИ ПОСТОЯННОО!!!!!!!!!
        // после этих действий следовало бы объединить данные карточек переписок с данными пользователями, после чего можно было бы их передать в пропс компанента CorrespondenceCard
        arrOptions
        arrUid
    }

    if(loading && !dataCorrespondence){

        return (
            <SkeletonBlock/>
        )
    }

    if(!dataCorrespondence && !loading){
        return (
            <div className={styles['container']}> У вас нет сообщений </div>
        )
    }

    return (
        <div className={styles['сorrespondenceList']}>
           {dataCorrespondence && dataCorrespondence.correspondenceCards.map( (el, i) => <CorrespondenceCard key={i} {...el}/>)} 
        </div>
    )
}
// .sort((a,b) =>sortingHelper(a.correspondenceId,uidUser ) - sortingHelper(b.correspondenceId, uidUser))

// function sortingHelper(element:string, targetElement:string):number {
//      if (element != targetElement) {
//        return -1; // Возвращаем -1, чтобы этот элемент был первым в отсортированном массиве
//      } else {
//        return 1; // Возвращаем 1 для всех остальных элементов
//      }
// }