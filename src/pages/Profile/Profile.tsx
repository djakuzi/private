
import {Outlet} from 'react-router-dom';
import styles from './Profile.module.css';
import { LINK_PROFILE_ARR } from '../../helper/RouterApps';
import LinkProfileOutlet from '../../components/LinkProfileOutlet/LinkProfileOutlet';


export default  function Profile() {

  return (
    <div className={styles['profile']}>

      
      <div className={styles['contentBar']}>

        <div className={styles['title']}>Профиль</div>

        <div className={styles['link-list']}>
            {...LINK_PROFILE_ARR.map( (el, i) => <LinkProfileOutlet key={i} {...el} index={i}></LinkProfileOutlet>)}
        </div>



      </div>

      <div className={styles['content']}>
        <Outlet />
      </div>

    </div>
  )
}

