import styles from './Login.module.css';
import { FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { loginEmailPasswordFirebase, loginGoogleFirebase } from '../../redux/slice/user.slice';


interface FormValueLogin{
    email: {
        value: string
    },
    password:{
        value: string
    }
    
}

export default  function Login() {

  
  const dispatch = useDispatch<AppDispatch>()

  const {errorLogin} = useSelector( (s:RootState)=> s.user)

  const authLoginPassword = async (e:FormEvent) =>{
        e.preventDefault()

        const {email, password} = e.target as typeof e.target & FormValueLogin

        const obj = {
          email: email.value,
          password: password.value
        }
        dispatch(loginEmailPasswordFirebase(obj))

    }


  const authGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()
   
   dispatch(loginGoogleFirebase())
  }

  return (
    
    <div className={styles.login}>

      <form className={styles.form} onSubmit={ (e) => authLoginPassword(e)}>

            <div className={styles.title}>ВХОД</div>

            <input name='email' type="email" placeholder="email"/>
            <input name='password' type="text" placeholder="Пароль"/>
  

            {errorLogin && <div className={styles.error}>{errorLogin}</div>}

            <button className={styles.entrance}>вОйТи</button>
        </form>

        
        <div>Нет аккаунта?</div>
        <Link className={styles.link} to='/auth/register'>Зарегестрируйся 😉</Link>

      <button onClick={(e) => authGoogle(e)} className={styles.google}>ВОЙТИ С ПОМОЩЬЮ GOOGLE</button>
    </div>
  )
}

