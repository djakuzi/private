
import {  Outlet } from 'react-router-dom';
import PeopleList from '../../components/PeopleList/PeopleList';
import styles from './People.module.css';



export default  function People() {

  


  return (
    <div className={styles.people}>

        
      <PeopleList classNameCard={styles['wrapper__card']} classNameList={styles['wrapper']}></PeopleList>
  
       <div className={styles.content}>
        <Outlet />
       </div>

    </div>
  )
}

