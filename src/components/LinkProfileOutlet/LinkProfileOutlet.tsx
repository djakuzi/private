import styles from './LinkProfileOutlet.module.css';
import cn from 'classnames';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import AvatarUser from "../AvatarUser/AvatarUser";
import { LinkProfileOutletProps } from "./LinkProfileOutlet.props";



export default function LinkProfileOutlet(props:LinkProfileOutletProps){


    if(props.index === 0){

        const {profile} = useSelector((s:RootState) => s.user)

        return (
            <NavLink  to={'/menu/profile/changeProfile'} className={ ({isActive}) => cn(styles['link'],{
                [styles.active]: isActive,
                })}>
                    
                    <AvatarUser displayName={profile?.displayName as string} photoUrl={profile?.photoURL as string} classAvatar={styles['avatar']} classAvatarName={styles['avatarName']}/>
            
                    <div className={styles['container']}>
                        <div> {profile?.displayName} </div>
                        <div> {profile?.phoneNumber ?? 'Нет номера'}</div>
                        <div> {profile?.email} </div>
                    </div>

                    <img className={styles['img']} src={props.arrrowIMG} alt="" />
           
                </NavLink>
        )
    }

    return (
        <NavLink to={'/menu/profile/' + props.path} className={ ({isActive}) => cn(styles['link'],{
                [styles.active]: isActive,
                })}>
                <img className={styles['icon']} src={props.img} alt="" />
                <div className={styles['name']}>{props.name}</div>
                <img className={styles['img']} src={props.arrrowIMG} alt="" />
        </NavLink>
    )
}