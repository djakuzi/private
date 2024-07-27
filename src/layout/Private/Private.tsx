
import styles from './Private.module.css';
import { auth} from '../../firebase/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router';
import { sendStatusVisibilityStateUser} from '../../helper/ScriptFirebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default  function Private() {

  const navigate = useNavigate()
   const {profile} = useSelector( (s:RootState)=> s.user)
  let path = window.location.pathname

  useEffect( ()=> {
    
    onAuthStateChanged(auth ,(user) =>{

      if(!user) {
        navigate('/auth/login')
      }

      if(user){
        document.addEventListener('visibilitychange', sendStatusVisibilityStateUser)

        console.log(path)
        if(path == '/private' || path == '/private/' || path == '/private/menu' || path == ''){
          navigate('/menu/profile')
        } else if(path){
          // navigate(path)
        }
        
      }
     
    })

  },[profile])
  
  return (
    <div  className={styles.private}>
      <Outlet />
    </div>
  )
}

