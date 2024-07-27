
import styles from './Private.module.css';
import { auth} from '../../firebase/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router';
import { sendStatusVisibilityStateUser} from '../../helper/ScriptFirebase';

export default  function Private() {

  const navigate = useNavigate()
  // let path = window.location.pathname

  useEffect( ()=> {
    
    onAuthStateChanged(auth ,(user) =>{

      if(!user) {
        navigate('/private/auth/login')
        return
      }

      if(user){
        document.addEventListener('visibilitychange', sendStatusVisibilityStateUser)
        navigate('/private/menu/chat')
        // if(path == '/private' || path == '/private/menu' || path ==''){
        //   navigate('/private/menu/chat')
        // } else if(path)(
        //   navigate(path)
        // )
        
      }
     
    })

  },[])
  
  return (
    <div  className={styles.private}>
      <Outlet />
    </div>
  )
}

