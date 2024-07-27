
import { FormEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { registerFirebase } from '../../redux/slice/user.slice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Register.module.css';


interface FormValueRegister{
    userName:{
        value: string
    }
    email: {
        value: string
    },
    password:{
        value: string
    },
    passwordTest:{
        value: string
    },
    
}

export default  function Register() {

  const dispatch = useDispatch<AppDispatch>()
  const {errorRegister} = useSelector( (s:RootState)=> s.user)

  
  const registerSubmit = async(e:FormEvent) =>{
    e.preventDefault()

    const {email, password, passwordTest, userName} = e.target as typeof e.target & FormValueRegister
    

    const obj = {
        email: email.value,
        password: password.value,
        passwordTest: passwordTest.value,
        userName: userName.value
    }

    dispatch(registerFirebase(obj))

  }


  return (
    <div className={styles.register}>

        <form className={styles.form} onSubmit={(e) => registerSubmit(e)}>

           <div className={styles.title}>Регистрация</div>

            <input name='userName' type="text" placeholder="Имя"/>
            <input name='email' type="email" placeholder="email"/>
            <input name='password' type="text" placeholder="Пароль"/>
            <input name='passwordTest' type="text" placeholder="Повторите пароль 🤗"/>

            {errorRegister && <div className={styles.error}>{errorRegister}</div>}

            <button className={styles.create}>сОздАть аКкАУнт</button>
        </form>

         <div>Есть аккаунт?</div>
        <Link className={styles.link} to='/auth/login'>Войти</Link>
    </div>
  )
}

