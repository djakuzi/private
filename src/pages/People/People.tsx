

import { useEffect, useState } from 'react';
import {  Outlet } from 'react-router-dom';
import PeopleList from '../../components/PeopleList/PeopleList';
import { TypePeople } from '../../helper/interface';
import { loadingPeoples } from '../../helper/ScriptHelp';
import styles from './People.module.css';



export default  function People() {


  const [people, setPeople] = useState<TypePeople[] | []>([])
  // const [statusLoadingPeople, setStatusLoadingPeople] = useState()

  useEffect(()=> {
       loadingPeoples()
       .then( el => {
        setPeople(el)
      })
      .catch( e => e)

  },[])

  return (
    <div className={styles.people}>

      <div className={styles['navbar']}>
        <div className={styles.title}>Люди</div>
        <PeopleList people={people} classNameList={styles['wrapper']}></PeopleList>
      </div>
  
       <div className={styles.content}>
        <Outlet />
       </div>

    </div>
  )
}

