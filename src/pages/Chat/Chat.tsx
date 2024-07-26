

import { Outlet } from 'react-router-dom';
import CorrespondenceList from '../../components/CorrespondenceList/CorrespondenceList';
import styles from './Chat.module.css';


export default  function Chat() {



  return (
    <div className={styles["chat"]}>

      <div className={styles.navbar}>
        <div className={styles.title}>Чаты</div>
        <CorrespondenceList />
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    
    </div>
  )
}

