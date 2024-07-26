import newsMenuIMG from ".././../public/menu/news.svg"
import chatMenuIMG from ".././../public/menu/chat.svg"
import profileMenuIMG from ".././../public/menu/profile.svg"
import arrrowIMG from '../../public/menu/profile/link/arrow.svg'
import profileIMG from '../../public/menu/profile/link/profile.svg'
import notificationIMG from '../../public/menu/profile/link/notification.svg'

export const LINK_MENU_ARR= [
    {
        path: 'people',
        name: "Новости",
        logo: newsMenuIMG
    },
    {
        path: 'chat',
        name: "Чаты",
        logo: chatMenuIMG
    },
    {
        path: 'profile',
        name: "Профиль",
        logo: profileMenuIMG
    }
]

export const LINK_PROFILE_ARR = [
    {
        path:'changeProfile',
        arrrowIMG
    },
    {
        path: 'myPAge',
        name: 'Мой профиль',
        img: profileIMG,
        arrrowIMG
    },
    {
        path: 'notification',
        name: 'Уведомления',
        img: notificationIMG,
        arrrowIMG
    }
]