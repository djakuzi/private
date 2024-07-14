
import PostUser from '../PostUser/PostUser';
import styles from './PostList.module.css';
import { PostListProps } from './PostList.props';

export default function PostList(props:PostListProps){
    return (
        <div className={styles['postList']}>
            {props.dataPost.posts.map( (el, i) => <PostUser key={i} {...el}  {...props.dataPost.author}></PostUser> ) }
        </div>
    )
}