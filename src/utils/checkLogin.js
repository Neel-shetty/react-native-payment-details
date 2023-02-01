import { useDispatch } from "react-redux";
import Storage from "../utils/expireStorage";
import { setLoggedIn } from "../store/slice/userSlice";

export async function checkLogin() {
  const dispatch = useDispatch();
  let result = await Storage.getItem("isLoggedIn");
  console.log("🚀 ~ file: checkLogin.js:21 ~ getValueFor ~ result", result);
  if (result === "true") {
    dispatch(setLoggedIn(true));
  }
}
