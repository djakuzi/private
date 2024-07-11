
import styles from './Private.module.css';
import { auth} from '../../firebase/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router';

export default  function Private() {

  const navigate = useNavigate()

  useEffect( ()=> {

    onAuthStateChanged(auth ,(user) =>{
      if(!user) {
        navigate('/private/auth/login')
        return
      }

      navigate('/private/menu/chat')
    })

  },[])
  
  return (
    <div className={styles.private}>
      <Outlet />
    </div>
  )
}

