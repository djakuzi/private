import { PeopleCardProps } from "./PeopleCard.props";
import styles from './PeopleCard.module.css';
import { Link } from "react-router-dom";
import AvatarUser from "../AvatarUser/AvatarUser";


export  default function PeopleCard (props:PeopleCardProps) {

    return (
        <Link to={'/private/menu/people/pageProfile/:' + props.uid} className={styles.peopleCard}>
            <AvatarUser photoUrl={props.photoURL} displayName={props.displayName} classAvatar={styles['avatar']} classAvatarName={styles['avatarName']} statusNetwork={props.statusNetwork} classStatusNetwork={styles['statusNetwork']}/>  
            <div className={styles['info']}>
                <div className={styles['info__name']}>{props.displayName}</div>
                <div className={styles['info__network']}>
                    {!props.statusNetwork && props.lastDateUserLogin}
                </div>
            </div>
        </Link>
    )
}