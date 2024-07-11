
export interface TypePost {
    text: string;
    img: string;
    date: string;
    time: string;
}

export interface TypePostAuthor{
    uid: string;
    displayName: string;
    photoURL: string;
}

export interface PostInfoUserProps {
    author: TypePostAuthor
    posts: TypePost[];
}

export interface TypeStatusPost{
    loadingPosts:boolean
    addPost: boolean
    loadingPostsError: string
    addPostError: string
    
}