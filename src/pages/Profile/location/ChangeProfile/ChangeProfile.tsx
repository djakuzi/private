import styles from './ChangeProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { autoHeight } from '../../../../helper/ScriptHelp';
import { userActions } from '../../../../redux/slice/user.slice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeChangeProfile } from './Interface';
import TopHeader from '../../../../components/TopHeader/TopHeader';


export function ChangeProfile(){

    const {profile} = useSelector( (s:RootState)=> s.user )

    const initialParametrsUser: TypeChangeProfile = {
        password: '',
        testPassword: '',
        displayName: profile?.displayName,
        email: profile?.email,
        aboutMe: ''

    }
    
    const [userOptions, setUserOptions] = useState<TypeChangeProfile>(initialParametrsUser)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const exit = () =>{
        dispatch(userActions.logOut())
        navigate('/private/auth/login')
    }

    const test = (a:string,b:string) : boolean => {
        console.log(a, b)
        return a == b
    }

    

    return(
        <div className={styles.changeProfile}>

            <TopHeader title={'Изменить профиль'} func={()=>test('1','2')}></TopHeader>
            
            <form className={styles.form}>

                <div className={styles.info}>
                    {profile?.photoURL && <img className={styles.avatar} src={profile?.photoURL + ''} alt="" />}
                    {!profile?.photoURL && <div  className={styles.avatarName}><div>{profile?.displayName?.slice(0,1)}</div></div>}
                    <div className={styles.box}>
                        <input onChange={ (e) => setUserOptions( {...userOptions, displayName: e.target?.value})} className={styles.customInput} name='nameUser' value={userOptions.displayName + ''}  type="text" />
                        <hr className={styles.line}/>
                        <input onChange={ (e) => setUserOptions( {...userOptions, email: e.target?.value})} className={styles.customInput} name='email' value={userOptions.email + ''} type="text" />
                    </div>
                </div>

                <div className={styles.txt}>Пожалуйста, добавьте имя, email и фотографию</div>
                <div className={styles.txt}>О СЕБЕ</div>

                <textarea 
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoHeight(e)} 
                onChange={ (e) => setUserOptions( {...userOptions, aboutMe: e.target?.value})}
                value={userOptions.aboutMe}
                rows={1} className={styles.customInput}
                name='aboutMe'  
                placeholder='Немного о себе'
                />

                <div className={styles.txt}>Любые подробности, например: возраст, род занятий или город. Пример: 23 года, дизайнер из Санкт-Петербурга.</div>

                <input onChange={ (e) => setUserOptions( {...userOptions,password: e.target?.value})} className={styles.customInput} value={userOptions.password} name='password' type="text" placeholder='Изменить пароль'/>
                {userOptions.password && <input onChange={ (e) => setUserOptions( {...userOptions, testPassword: e.target?.value})} value={userOptions.testPassword} className={styles.customInput} name='password' type="text" placeholder='Повторите пароль'/>}

                <div className={styles.exit} onClick={exit}>Выйти</div>

            </form>
        </div>
    )
}