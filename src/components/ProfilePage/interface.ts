export interface TypeStatusLoadingPost{
    loadingPosts:boolean
    loadingPostsError: string
}

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

export interface TypePostInfoUser {
    author: TypePostAuthor
    posts: TypePost[];
}