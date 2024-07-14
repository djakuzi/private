
import { arrayUnion, setDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { autoHeight } from '../../helper/ScriptHelp';
import { TypeStatusAddPost } from './interface';
import styles from './NewPost.module.css';
import { NewPostProps } from './NewPost.props';


const INITIAL_STATUS_POSTS = {
    addPost: false,
    addPostError: '',
}

export default function NewPost(props: NewPostProps){

    const [textNewPost, setTextNewPost] = useState<string>('')
    const [statusPosts, setStatusPosts] = useState<TypeStatusAddPost>(INITIAL_STATUS_POSTS) 

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

        if (!props.availabilityPost){
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
        } else if (props.availabilityPost){
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
        <div>        
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

            {statusPosts.addPost && <div>Добавление поста...</div>}
            {statusPosts.addPostError && <div>Произошла ошибка при добавлении поста: {statusPosts.addPostError}</div>}
        </div>

    )
}