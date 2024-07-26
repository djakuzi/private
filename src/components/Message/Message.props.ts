import { TypeMessage } from "../../helper/interface"



export interface MessageProps{
    authUid: boolean;
    data:  TypeMessage;
    moreInfo: {
        displayName: string;
        photoUrl: string; 
    }
    isValidSend?: boolean;
    isValidError?: boolean;

}