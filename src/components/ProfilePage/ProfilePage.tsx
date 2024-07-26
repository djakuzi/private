
import styles from './ProfilePage.module.css';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import NewPost from '../NewPost/NewPost';
import PostList from '../PostList/PostList';
import TopHeader from '../TopHeader/TopHeader';
import { TypePostInfoUser, TypeStatusLoadingPost } from './interface';
import { ProfilePageProps } from './ProfilePage.props';
import InfoUserPage from '../InfoUserProfile/InfoUserProfile';
import { TypePeople } from '../../helper/interface';
import { loadingPeoples } from '../../helper/ScriptFirebase';
import WriteMessage from '../WriteMessage/WriteMessage';

const INITIAL_STATUS_POSTS = {
    loadingPosts: false,
    loadingPostsError: '',
}

export default function ProfilePage(props:ProfilePageProps){

    const validAuthUser = auth.currentUser?.uid == props.uid

    const [dataPost, setDataPost] = useState<TypePostInfoUser>()
    const [statusPosts, setStatusPosts] = useState<TypeStatusLoadingPost>(INITIAL_STATUS_POSTS) 

    const [dataUser, setDataUser] = useState<TypePeople>()

    useEffect( () => {
        loadingPeoples(props.uid)
        .then( res => setDataUser(res))
    }, [props.uid])

    useEffect(() => {

        getPostUser()

    }, [props.uid])

    // функция для чтения постов пользователя
    const getPostUser = () =>  {
        try {
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: true})
            onSnapshot(doc(db, "posts", props.uid + ''), (doc) => {
                setDataPost(doc.data() as TypePostInfoUser)
            });
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: false})
        } catch (e: any) {
            console.error("Error adding document: ", e);
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: false})
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPostsError: e})
        }

    } 

    // если это страница авторизированного пользователя, то отображается его страница с возможностями ее изменениями: добавление постов и так далее

    if(validAuthUser){
        return (
            <div className={styles['profilePage']}>    
                <TopHeader title={'Ваша страница'}/>

                <div className={styles['user']}>
                    {dataUser && <InfoUserPage {...dataUser}/>}
                    <NewPost availabilityPost={Boolean(dataPost)}/>
                    {statusPosts.loadingPosts && <div>Загрузка постов</div>}
                    {statusPosts.loadingPostsError && <div>Произошла ошибка: {statusPosts.loadingPostsError}</div>}
                    {dataPost?.posts && <PostList dataPost={dataPost}/>}
                    {!dataPost?.posts && <div> Напиши свой первый пост</div>}
                </div>
            </div>
        )
    }

    // если страница другого пользоваетля, то отображается страница для чтения

    return(
            <div className={styles['profilePage']}>    

                <TopHeader title={dataUser?.displayName + ''} />

                <div className={styles['user']}>
                    {dataUser && <InfoUserPage {...dataUser}/>}
                    <WriteMessage uid={props.uid} displayName={dataUser?.displayName as string} photoUrl={dataUser?.photoURL as string} />
                    {statusPosts.loadingPosts && <div>Загрузка постов</div>}
                    {statusPosts.loadingPostsError && <div>Произошла ошибка: {statusPosts.loadingPostsError}</div>}
                    {dataPost?.posts && <PostList dataPost={dataPost}/>}
                    {!dataPost?.posts && <div> нет постов</div>}
                </div>

            </div>

        )

    
}