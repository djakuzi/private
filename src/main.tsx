import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Auth from './layout/Auth/Auth'
import Chat from './pages/Chat/Chat'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Private from './layout/Private/Private'
import Profile from './pages/Profile/Profile'
import Menu from './pages/Menu/Menu'
import People from './pages/People/People'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ChangeProfile } from './pages/Profile/location/ChangeProfile/ChangeProfile'
import { MyPage } from './pages/Profile/location/MyPage/MyPage'
import PeopleProfilePage from './pages/People/location/PeopleProfilePage/PeopleProfilePage'
import ChatCorrespondencePage from './pages/Chat/location/ChatCorrespondencePage/ChatCorrespondencePage'
import NotificationUser from './pages/Profile/location/NotificationUser/NotificationUser'
import PeopleCorrespondencePage from './pages/People/location/PeopleCorrespondencePage/PeopleCorrespondencePage'


const Router = createBrowserRouter([
  {
    path: '/private',
    element: <Private></Private>,
    children: [
      {
        path: 'menu',
        element: <Menu></Menu>,
        children: [
          { 
            path: 'chat',
            element: <Chat></Chat>,
            children: [
              {
                path: 'сorrespondence/:uidCompound',
                element: <ChatCorrespondencePage />
              }
            ]
          },
          {
            path: 'profile',
            element: <Profile></Profile>,
            children: [
              {
                path: 'changeProfile',
                element: <ChangeProfile></ChangeProfile>
              },
              {
                path: 'myPAge',
                element: <MyPage></MyPage>
              },
              {
                path: 'notification',
                element: <NotificationUser />
              }
            ]
          },
          {
            path: 'people',
            element: <People></People>,
            children: [
              {
                path: 'pageProfile/:uid',
                element: <PeopleProfilePage />
              },
              {
                path: 'сorrespondence/:uidCompound',
                element: <PeopleCorrespondencePage />
              }
            ]
          }
    
      ]
      }
  
    ]

  },
  {
  path: '/private/auth',
  element: <Auth></Auth>,
  children: [
    { 
      path: 'login',
      element: <Login></Login>
    },
    {
      path: 'register',
      element: <Register></Register> 
    }
  ]

},

]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Provider store={store}>
       <RouterProvider router={Router} />
    </Provider>

  </React.StrictMode>,
)
