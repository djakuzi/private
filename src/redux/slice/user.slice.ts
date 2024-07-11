import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, UserInfo} from "firebase/auth"
import { setDoc, doc } from "firebase/firestore";
import { auth, db} from "../../firebase/firebase";
import { addUserFireStore } from "../../helper/ScriptHelp";
import { laodStateLocalStorage } from "../helper/localStorage";



export const PROFILE_DATA = "data-profile-user"


//общий тип пользователя
export interface DataUser{
    profile: UserInfo | null;
    errorRegister?: string;
    errorLogin?: string
}

// тип входящих данных для регистрации через пароль и емейл
interface RegisterParams{
    userName: string;
    password: string;
    passwordTest: string;
    email: string;
}

const initialState:DataUser = {
    profile: laodStateLocalStorage<UserInfo>(PROFILE_DATA) ?? null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state){
            state.profile = null
            auth.signOut()
        }
    },
    extraReducers(builder){
        builder.addCase(registerFirebase.fulfilled, (state, action)=>{
            
            state.profile = action.payload
            state.errorRegister = ''
             
           
        })
        builder.addCase(registerFirebase.rejected, (state, action) =>{
            state.errorRegister = action.error.message
        })

        builder.addCase(loginGoogleFirebase.fulfilled, (state, action)=>{
            
            state.profile = action.payload
            state.errorLogin = ''
             
           
        })
        builder.addCase(loginGoogleFirebase.rejected, (state, action) =>{
            state.errorLogin = action.error.message
        })

        builder.addCase(loginEmailPasswordFirebase.fulfilled, (state, action)=>{
            
            state.profile = action.payload
            state.errorLogin = ''
             
           
        })
        builder.addCase(loginEmailPasswordFirebase.rejected, (state, action) =>{
            state.errorLogin = action.error.message
        })
    }
})




//регистрация firebase
export const registerFirebase = createAsyncThunk('user/registerFirebase',  async(params:RegisterParams)=>{

    if(params.password != params.passwordTest){
       
        throw new Error ('Пароли не совпадают');
    }

    let data: UserInfo | null = null
    
     await createUserWithEmailAndPassword(auth, params.email, params.password)
        .then( res => {
         
            const currentUser = res.user

            updateProfile(currentUser, {
                displayName: params.userName
            })

            data = {
                displayName: params.userName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                phoneNumber: currentUser.phoneNumber,
                providerId: currentUser.providerId,
                uid: currentUser.uid

            }
            addUserFireStore(data)
            
        })
        .catch( e => {
             throw new Error (e);
        })
    
     return data

})

//login через google аккаунт
export const loginGoogleFirebase = createAsyncThunk('user/loginGoogleFirebase', async()=>{

     const provider = new GoogleAuthProvider();

     let data: UserInfo | null = null

    await signInWithPopup(auth, provider)
        .then((res) => {
    
        //   const credential = GoogleAuthProvider.credentialFromResult(res);
        //   const token = credential?.accessToken;
          const user = res.user;
          
          data = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            providerId: user.providerId,
            uid: user.uid
        }

        addUserFireStore(data)

        }).catch((e) => {
            
            throw new Error(e)
 
        });
    


    return data
})


// login with password and email
interface LoginParams{
    password: string;
    email: string;
}

export const loginEmailPasswordFirebase = createAsyncThunk('user/loginEmailPasswordFirebase', async(params:LoginParams)=>{

     let data: UserInfo | null = null

       await signInWithEmailAndPassword(auth, params.email, params.password)
        .then( res => {
            
            const currentUser = res.user

             data = {
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                phoneNumber: currentUser.phoneNumber,
                providerId: currentUser.providerId,
                uid: currentUser.uid

            }

            addUserFireStore(data)
        })
        .catch( e => {
        // "Вы что-то попутали"
            throw new Error(e)
        })



    return data
})


export default userSlice.reducer
export const userActions = userSlice.actions