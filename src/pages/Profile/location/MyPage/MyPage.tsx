
import styles from './MyPage.module.css';
import { auth} from '../../../../firebase/firebase';
import ProfilePage from '../../../../components/ProfilePage/ProfilePage';

export function MyPage(){

    return(
        <div className={styles['page']}>
            <ProfilePage uid={auth.currentUser?.uid + ""}/>
        </div>
    )
}