

export interface TypePeople{
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    statusNetwork: boolean;
    lastDateUserLogin: string;
    lastTimeUserLogin: string;
}

// type post 

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