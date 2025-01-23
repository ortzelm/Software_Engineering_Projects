import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './connect/login.jsx'
import Home from './home.jsx'
import Register from './connect/register.jsx'
import UserProvider from './userContext.jsx'
import RegisterFinally from './connect/registerFinally.jsx'
import InformUser from './info/info.jsx'
import Posts from './post/posts.jsx'
import Albums from './albums/albums.jsx'
import Photos from './albums/photos.jsx'
import Todos from './todos/todos.jsx'
import AddOrUpdatePost from './post/addOrUpdatePost.jsx'
import PostDetails from './post/postDetails.jsx'
import Comments from './post/comment.jsx'

const routes = createBrowserRouter([
  {
    path: "/", element: <UserProvider>
      <App />
    </UserProvider>,
    children: [{
      path: "login",
      element: <Login />
    },
    {
      path: "home/users/:id", element: <Home />, children: [
        { path: "info", element: <InformUser /> },
        {
          path: "posts", element: <Posts />,children: [
            {path: ":postId/details", element: <PostDetails />,children: [
              { path: "comments", element: <Comments /> }], }
          ]
        },
        { path: "posts/:postId/update", element: <AddOrUpdatePost /> },
        { path: "posts/add", element: <AddOrUpdatePost /> },

        { path: "albums", element: <Albums />,children:[ 
          { path: ":albumId/photos", element: <Photos /> }] },
        { path: "todos", element: <Todos /> }
      ]
    },
    { path: 'register', element: <Register /> },
    { path: "registerFinally", element: <RegisterFinally /> },
    {
      path: "/",
      element: <Navigate to={"/login"} />
    }]
  }
])


// < Route path = "/registerFinally" element = {< RegisterFinally />} />
createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />,
)
