
import styles from './AvatarUser.module.css';
import { AvatarUserProps } from "./AvatarUser.props";



export default function AvatarUser(props:AvatarUserProps){

    return(
        <div className={styles['container']}>
            {props?.photoUrl && <img className={props.classAvatar} src={props?.photoUrl + ''} alt="" />}
            {!props?.photoUrl && <div className={props.classAvatarName}><div>{props.displayName?.slice(0,1)}</div></div>}
            {props.statusNetwork && <div className={props.classStatusNetwork}></div>}
        </div>
    )
}