import { useRoutes } from "react-router-dom"
import ProtectedLayout from "../components/ProtectedLayout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import ScheduledMeetings from "../pages/ScheduledMeetings"
import MyMeetings from "../pages/MyMeetings"

const MainRoutes = () => {
  return useRoutes([
    {path:"/", element: <Home/>},
    {path:"/schedulemeetings", element: <ScheduledMeetings/>},
    {path:"/mymeetings", element: <ProtectedLayout><MyMeetings/></ProtectedLayout>},
    {path:"/login", element: <Login/>},
    {path:"/signup", element: <SignUp/>}
  ])
}

export default MainRoutes