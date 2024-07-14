import { TypePeople } from '../../helper/interface';
import styles from './InfoUserPage.module.css';

export default function InfoUserPage(props: TypePeople){
    
    return(
        <div className={styles['info']}>
            <div className={styles['info__avatar']}>
                {props?.photoURL &&<img src={props?.photoURL + ""} className={styles.avatar} alt="аватар" />}
                {!props?.photoURL && <div  className={styles.avatarName}><div>{props?.displayName?.slice(0,1)}</div></div>}
            </div>
            <div className={styles["info__wrapper"]}>
                <div className={styles["info__wrapper-name"]}>{props?.displayName}</div>
                <hr className={styles.line}/>
                <div className={styles["info__wrapper-email"]}>{props?.email}</div>
            </div>
        </div>
    )
}