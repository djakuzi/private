import styles from './ChangeProfile.module.css';
import backIMG from '../../../../../public/menu/profile/back.svg'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { autoHeight } from '../../../../helper/scriptHelp';
import { userActions } from '../../../../redux/slice/user.slice';
import { useState } from 'react';

export function ChangeProfile(){

    const {profile} = useSelector( (s:RootState)=> s.user )
    const [testPassword, setTestPassword] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()
    
    const exit = () =>{
        dispatch(userActions.logOut())
        // navigate('private/auth/login')
    }

    // const test = (a:string,b:string) : boolean => {
    //     return a == b
    // }

    return(
        <div className={styles.changeProfile}>

            <div className={styles.header}>

                <div className={styles.back}>
                    <img src={backIMG} alt="" />
                    <div>назад</div>
                </div>

                <div className={styles.title}>Изменить профиль</div>

                <div className={styles.save}>Готово</div>
            </div>
            
            <form className={styles.form}>

                <div className={styles.info}>
                    {profile?.photoURL && <img className={styles.avatar} src={profile?.photoURL + ''} alt="" />}
                    {!profile?.photoURL && <div  className={styles.avatarName}><div>{profile?.displayName?.slice(0,1)}</div></div>}
                    <div className={styles.box}>
                        <input className={styles.customInput} name='nameUser' value={profile?.displayName + ''}  type="text" />
                        <hr className={styles.line}/>
                        <input className={styles.customInput} name='email' value={profile?.email + ""} type="text" />
                    </div>
                </div>

                <div className={styles.txt}>Пожалуйста, добавьте имя, email и фотографию</div>
                <div className={styles.txt}>О СЕБЕ</div>

                <textarea onInput={(e) => autoHeight(e)} rows={1} className={styles.customInput} name='aboutMe'  placeholder='Немного о себе'/>

                <div className={styles.txt}>Любые подробности, например: возраст, род занятий или город. Пример: 23 года, дизайнер из Санкт-Петербурга.</div>

                <input onChange={ (e) => setTestPassword(e.target?.value)} className={styles.customInput} value={testPassword} name='password' type="text" placeholder='Изменить пароль'/>
                {testPassword ?? <input className={styles.customInput} name='password' type="text" placeholder='Повторите пароль'/>}

                <div className={styles.exit} onClick={exit}>Выйти</div>

            </form>
        </div>
    )
}