import { PeopleCardProps } from "./PeopleCard.props";
import styles from './PeopleCard.module.css';
import { Link } from "react-router-dom";


export  default function PeopleCard (props:PeopleCardProps) {

    return (
        <Link to={'/private/menu/people/pageProfile/:' + props.uid} className={styles.peopleCard}>  
            {props?.photoURL && <img className={styles.avatar} src={props?.photoURL + ''} alt="" />}
            {!props?.photoURL && <div  className={styles.avatarName}><div>{props?.displayName?.slice(0,1)}</div></div>}
            <div className={styles['info']}>
                <div className={styles['info__name']}>{props.displayName}</div>
                <div className={styles['info__network']}>
                    {props.statusNetwork && "В сети"}
                    {!props.statusNetwork && props.lastDateUserLogin}
                </div>
            </div>
        </Link>
    )
}