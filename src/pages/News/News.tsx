
import {  Outlet } from 'react-router-dom';
import styles from './News.module.css';



export default  function News() {


  return (
    <div className={styles.menu}>

  
       <div className={styles.content}>
        <Outlet />
       </div>

    </div>
  )
}

