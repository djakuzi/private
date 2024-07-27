
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase';
import { RootState } from '../../redux/store';
import styles from './Auth.module.css';
// import privateIMG from '../../../../'

export default  function Auth() {
  
  const navigate = useNavigate()
  const {profile} = useSelector( (s:RootState)=> s.user)
  useEffect(()=> {
    if (profile != null && auth.currentUser?.uid) navigate('/private/menu/chat')
  }, [profile])


  return (
    <div  className={styles.auth}>
      <Outlet />
    </div>
  )
}

