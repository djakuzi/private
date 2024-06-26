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
import News from './pages/News/News'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ChangeProfile } from './pages/Profile/location/ChangeProfile/ChangeProfile'


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
            element: <Chat></Chat>
          },
          {
            path: 'profile',
            element: <Profile></Profile>,
            children: [
              {
                path: 'changeProfile',
                element: <ChangeProfile></ChangeProfile>
              }
            ]
          },
          {
            path: 'news',
            element: <News></News>
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
