export interface TypePeople{
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
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


//type Correspondence

export interface TypeMessage{
    uid: string;
    text?: string;
    img?: string;
    voice?: string;
    date: string;
    time: string;
}

export interface TypeCorrespondence{
    uidCompound: string;
    messages: TypeMessage[];
}




// type CorrespondenceUserCard

export interface TypeCorrespondenceCard{
    correspondenceId: string;
    lastMessage: string;
    quantityMessage: number;
    isReadValid: boolean;
    sendUserMessage?: string;
    uidUser: string;
    date: string;
    time: string;
}


export interface TypeCorrespondenceList{
    correspondenceCards: TypeCorrespondenceCard[]
}





