
import { Outlet } from 'react-router-dom';
import styles from './Chat.module.css';

export default  function Chat() {


  return (
    <div>

      <div className={styles.contentBar}>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    
    </div>
  )
}

