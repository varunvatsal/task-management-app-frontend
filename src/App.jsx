import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import TaskList from './components/TaskList'
import Register from './components/Register'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import WrongUrl from './components/WrongUrl'
import UnauthorizedReq from './components/UnauthorizedReq'

const App = () => {
    
  return (
    <>  
        <RouterProvider router={routing} />
    </>
  )
}

export default App

let routing = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/dashboard',
                element: <DashBoard />
            },
            {
                path: '/tasklist',
                element: <TaskList />
            },
            {
                path: '/addtask',
                element: <AddTask />
            },
            {
                path: 'editTask/:id',
                element: <EditTask />
            },
            {
                path: '/unauthorizedReq',
                element: <UnauthorizedReq />
            },
            {
                path: '*',
                element: <WrongUrl />
            }

        ]
    }
])
