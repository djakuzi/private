
import { useEffect, useState } from 'react';
import { autoHeight } from '../../../../helper/ScriptHelp';
import styles from './MyPage.module.css';
import backIMG from '../../../../../public/menu/profile/back.svg'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../../firebase/firebase';
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { PostInfoUserProps, TypeStatusPost } from './interface';
import PostUser from '../../../../components/PostUser/PostUser';


const INITIAL_STATUS_POSTS = {
     loadingPosts: false,
    addPost: false,
    loadingPostsError: '',
    addPostError: '',
}

export function MyPage(){

    const [textNewPost, setTextNewPost] = useState<string>('')
    const [dataPost, setDataPost] = useState<PostInfoUserProps>()
    const [statusPosts, setStatusPosts] = useState<TypeStatusPost>(INITIAL_STATUS_POSTS) 

    const navigate = useNavigate()

    useEffect(() => {
        
        getPostUser()
        
    }, [])

    // функция для чтения постов пользователя
    const getPostUser = () =>  {
        try {
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: true})
            onSnapshot(doc(db, "posts", auth.currentUser?.uid + ''), (doc) => {
                setDataPost(doc.data() as PostInfoUserProps)
            });
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: false})
        } catch (e: any) {
            console.error("Error adding document: ", e);
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPosts: false})
            setStatusPosts({...INITIAL_STATUS_POSTS, loadingPostsError: e})
        }

    } 

    //функция для добавления поста
    const submitNewPost = async() => {

        const date = new Date()

        const optionsDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        };
        const optionsTime: Intl.DateTimeFormatOptions = {
            timeZone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: undefined
        };
        const author = {
            uid: auth.currentUser?.uid,
            displayName: auth.currentUser?.displayName,
            photoURL: auth.currentUser?.photoURL,
        }
        const addPost = {
            text: textNewPost,
            date: date.toLocaleString("ru", optionsDate),
            time: date.toLocaleString("ru", optionsTime),
        }
        const firstPost = {
            author: author,
            posts: [addPost]
        }
        const otherPost = {
            author: author,
            posts: arrayUnion(addPost)
        }

        if (!dataPost){
            try {
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: true})
                await setDoc(doc(db, "posts", auth.currentUser?.uid + ""), firstPost);
                setTextNewPost('')
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: false})
                
            } catch (e: any) {
                console.error("Error adding document: ", e);
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: false})
                setStatusPosts({...INITIAL_STATUS_POSTS, addPostError: e})
            }
        } else if (dataPost){
            try {
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: true})
                await updateDoc(doc(db, "posts", auth.currentUser?.uid + ""), otherPost);
                setTextNewPost('')
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: false})
            } catch (e: any) {
                console.error("Error adding document: ", e);
                setStatusPosts({...INITIAL_STATUS_POSTS, addPost: false})
                setStatusPosts({...INITIAL_STATUS_POSTS, addPostError: e})
            }
        }

    }

    return(
        <div className={styles['page']}>

             <div className={styles.header}>

                <div onClick={ () => navigate(-1)} className={styles.back}>
                    <img src={backIMG} alt="иконка назад" />
                    <div>назад</div>
                </div>

                <div className={styles.title}>Ваша страница</div>

            </div>

            <div className={styles['user']}>

                <form onSubmit={(e) => e.preventDefault()} className={styles['post__add']}>

                    <textarea
                    onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoHeight(e)} 
                    onChange={(e) => setTextNewPost(e.target.value)} 
                    className={styles['post__add-create']} 
                    value={textNewPost}
                    name="text" 
                    rows={1}
                    placeholder={'Новый пост'}
                    />

                    <div onClick={submitNewPost} className={styles['post__add-submit']} >Создать</div>

                </form>

                 <div className={styles['box__post']}>
                {statusPosts.loadingPosts && <div>Загрузка твоих постов</div>}
                {statusPosts.loadingPostsError && <div>Произошла ошибка: {statusPosts.loadingPostsError}</div>}
                {statusPosts.addPost && <div>Добавление поста...</div>}
                {statusPosts.addPostError && <div>Произошла ошибка при добавлении поста: {statusPosts.addPostError}</div>}
                {(!dataPost?.posts && (!statusPosts.loadingPosts || !statusPosts.loadingPostsError)) && <div> Напиши свой первый пост!</div>}
                {dataPost?.posts && dataPost.posts.map( (el, i) => <PostUser key={i} {...el}  {...dataPost.author}></PostUser> ) }
                </div>

            </div>

        </div>
    )
}