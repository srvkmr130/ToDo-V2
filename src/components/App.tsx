import "../index.css";
import {
  Navbar,
  History,
  MyTasks,
  Dashboard,
  TaskDetail,
  Login,
  Header,
} from "./index";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import { initalizeUserActionCreator } from "../features/auth";
import { updateTasksActionCreator } from "../features/myTasks";
import { firestore } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IState, ITask } from "../type";
import { clearLocalStorage, getDecodedToken } from "../utils/helper";

function RequireAuth({ children, redirectTo, isLoggedIn }) {
  if (localStorage.getItem("token")) {
    if (getDecodedToken()?.email) return children;
  }
  return <Navigate to={redirectTo} />;
}

function App() {
  const auth = useSelector((state: IState) => state.auth);
  var userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    firestore
      .collection("tasks")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const allTasks = snapshot.docs
          .filter((doc) => doc.data().userId === userId)
          .map((doc) => {
            const data = doc.data() as ITask;
            data["_id"] = doc.id;
            return data;
          });
        dispatch(updateTasksActionCreator(allTasks));
        if (localStorage.getItem("token")) {
          dispatch(
            initalizeUserActionCreator({
              data: getDecodedToken(),
              isLoggedIn: true,
            })
          );
        }
      });
    return () => {
      clearLocalStorage();
    };
  }, []);

  return (
    <div className="relative min-h-screen md:flex">
      <Router>
        <Navbar />
        {auth.isLoggedIn ? <Header /> : ""}
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/login" isLoggedIn={auth.isLoggedIn}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/history"
            element={
              <RequireAuth redirectTo="/login" isLoggedIn={auth.isLoggedIn}>
                <History />
              </RequireAuth>
            }
          />
          <Route
            path="/myTasks"
            element={
              <RequireAuth redirectTo="/login" isLoggedIn={auth.isLoggedIn}>
                <MyTasks />
              </RequireAuth>
            }
          />
          <Route path="/task/:taskId" element={<TaskDetail />} />
          <Route
            path="/tasks"
            element={
              <RequireAuth redirectTo="/login" isLoggedIn={auth.isLoggedIn}>
                <MyTasks />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
