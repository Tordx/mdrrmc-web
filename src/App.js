
import Login from "./pages/Login";
import "./style.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AddUsers from "./pages/Publicform";
import UserList from "./pages/UserList";
import Submitted from "./pages/Submitted";
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import AdminForm from "./pages/AdminForm";
import Error404 from "./pages/Error404";
import ApplicationList from "./pages/ApplicationList";
import Annoucementlist from "./pages/Announcementlist";
import AnnoucementForm from "./pages/AnnouncementForm";
import ApprovingForm from "./pages/ApprovingForm";
import ApproveAnnoucementForm from "./pages/ApproveAnnoucementForm";
import Profile from "./components/Profile";
import Alert from "./pages/Alert";
import Community from "./pages/Community";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser === null) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/">
          <Route path="login" element={<Login/>} />
          <Route path = "*" element={<Error404/>} />
          <Route index element = {<Login/>}/>
          <Route path="form">
            <Route path="admin" index element={<AddUsers/>} />
            <Route path="public" element = {<AddUsers/>} />
            <Route path="submitted" element = {<Submitted/>}/>
          </Route>
          <Route path = "admin">
          <Route path="form" index element={ <ProtectedRoute><AdminForm/></ProtectedRoute>} />
            <Route  path="chat" index element={ <ProtectedRoute> <Conversation/></ProtectedRoute>}/>
            <Route path = "userlist" index element={ <ProtectedRoute><UserList/></ProtectedRoute>} />
            <Route path = "profile" index element={ <ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path = "alert" index element={ <ProtectedRoute><Alert/></ProtectedRoute>} />
            <Route path = "community" index element={ <ProtectedRoute><Community/></ProtectedRoute>} />
            <Route path = "applicationlist" index element={ <ProtectedRoute><ApplicationList/></ProtectedRoute>} />
            <Route path = "annoucementlist" index element={ <ProtectedRoute><Annoucementlist/></ProtectedRoute>} />
            <Route path = "annoucementform" index element={ <ProtectedRoute><AnnoucementForm/></ProtectedRoute>} />
            <Route path="approvingform/:uniqueURL" index element={<ProtectedRoute><ApprovingForm/></ProtectedRoute>} />
            <Route path = "approvingannoucementform" index element={ <ProtectedRoute><ApproveAnnoucementForm/></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
