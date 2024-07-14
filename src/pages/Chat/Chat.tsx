
import { Outlet } from 'react-router-dom';
import styles from './Chat.module.css';

export default  function Chat() {


  return (
    <div className={styles["chat"]}>

      <div className={styles.navbar}>
        <div className={styles.title}>Чаты</div>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    
    </div>
  )
}

