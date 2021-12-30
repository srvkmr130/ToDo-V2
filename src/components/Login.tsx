import { GoogleLogin } from "react-google-login";
import { firestore } from "../config/firebase";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { initalizeUserActionCreator } from "../features/auth";
import { updateTasksActionCreator } from "../features/myTasks";
import { useDispatch, useSelector } from "react-redux";
import { IDecodedObject, IState, ITask, IUser } from "../type";
import brandLogo from "../resources/images/brand-logo.png";
import toDoIcon from "../resources/images/toDo.png";
const clientId =
  "375797887434-k5jeprpeiijk9tek00qcc05omcrlupsh.apps.googleusercontent.com";

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state: IState) => state.auth);
  const handleLogin = async (googleData) => {
    var result = await firestore
      .collection("users")
      .where("googleId", "==", googleData.profileObj.googleId)
      .onSnapshot((snapshot) => {
        const user = snapshot.docs[0]?.data() as IUser;
        if (user == null) {
          firestore.collection("users").add({
            email: googleData.profileObj.email,
            name: googleData.profileObj.name,
            googleId: googleData.profileObj.googleId,
          });
        }
        localStorage.setItem("token", googleData.tokenId);
        localStorage.setItem("userId", googleData.profileObj.googleId);
        let decoded: IDecodedObject = jwt_decode(googleData.tokenId);
        dispatch(
          initalizeUserActionCreator({ data: decoded, isLoggedIn: true })
        );
        UpdateTasksForCurrentUser(googleData.profileObj.googleId);
      });
  };

  function UpdateTasksForCurrentUser(userId) {
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
      });
  }

  const onLoginFailure = (res) => {
    console.log("Login with Google Failed:", res);
  };

  if (auth.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex bg-purple-300 w-full justify-evenly">
      <div className="h-full">
        <img
          className="relative h-2/3 top-1/4"
          alt="brandLogoImage"
          src={toDoIcon}
        />
      </div>
      <div>
        <div className="flex flex-col relative top-1/2 right-1/4">
          <div>
            <img className="w-48" alt="brandLogoImage" src={brandLogo} />
          </div>
          <div className="p-1 text-center text-lg">Login To your Account</div>
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Continue with Google"
              onSuccess={handleLogin}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
