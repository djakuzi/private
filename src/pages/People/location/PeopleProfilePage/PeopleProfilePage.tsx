

import { useParams } from 'react-router';
import ProfilePage from '../../../../components/ProfilePage/ProfilePage';
import styles from './PeopleProfilePage.module.css';


export default function PeopleProfilePage(){

    const {uid}= useParams()
    const uidRes = uid?.slice(1, uid.length) as string
    return(
        <div className={styles['page']}>
            <ProfilePage uid={uidRes}/>
        </div>
    )
}