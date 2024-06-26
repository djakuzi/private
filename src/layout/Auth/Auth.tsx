
import { Outlet } from 'react-router';
import styles from './Auth.module.css';
// import privateIMG from '../../../../'

export default  function Auth() {


  return (
    <div  className={styles.auth}>
      <Outlet />
    </div>
  )
}

