import "./profilePage.less";
import {
  firebaseSignOut,
  useAuthState,
} from "../../../utilities/firebaseUtils";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      Profile
      <button onClick={() => signout()}>SignOut</button>
    </div>
  );
};

export default ProfilePage;
