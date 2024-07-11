
import { NavLink, Outlet} from 'react-router-dom';
import styles from './Profile.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import arrrowIMG from '../../../public/menu/profile/arrow.svg'
import cn from 'classnames';
import { LINK_PROFILE_ARR } from '../../helper/RouterApps';

export default  function Profile() {

  const {profile} = useSelector((s:RootState) => s.user)

  return (
    <div className={styles.profile}>

      
      <div className={styles.contentBar}>

        <div className={styles.title}>Профиль</div>

        <NavLink  to={'/private/menu/profile/changeProfile'} className={ ({isActive}) => cn(styles.link,{
              [styles.active]: isActive,
          })}>

           {profile?.photoURL && <img className={styles.avatar} src={profile?.photoURL + ''} alt="" />}
           {!profile?.photoURL && <div  className={styles.avatarName}><div>{profile?.displayName?.slice(0,1)}</div></div>}
            <div className={styles.container}>
              <div> {profile?.displayName} </div>
              <div> {profile?.phoneNumber ?? 'Нет номера'}</div>
              <div> {profile?.email} </div>
            </div>

            <img src={arrrowIMG} alt="" />
           
        </NavLink>

        {...LINK_PROFILE_ARR.map( (el) => <NavLink to={'/private/menu/profile/' + el.path} > {el.name}</NavLink>)}


      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

