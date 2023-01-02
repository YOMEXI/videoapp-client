import { FormEvent, useEffect, useState } from "react";
import style from "./login.module.css";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../../utils/firebase";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loginError,
  loginStart,
  loginSuccess,
} from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) router.push("/");
  }, []);

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(
        `/auth/signin`,
        { name, password },
        {
          withCredentials: true,
          headers: { crossDomain: true, "Content-Type": "application/json" },
        }
      );

      dispatch(loginSuccess(data));
      toast.success("Welcome");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(loginError(err.response.data.message));
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/googleLogin", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            toast.success("Welcome");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            dispatch(loginError(err.response.data.message));
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.container}>
      <div className={style.form_body}>
        <form onSubmit={Submit} className={style.login_form}>
          <h1 className={style.login_title}>Login form</h1>

          <label htmlFor="" className={style.login_form_label}>
            <input
              className={style.login_input}
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="" className={style.login_form_label}>
            <input
              className={style.login_input}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className={style.login_buttons_body}>
            <button className={style.login_button}>Login</button>
          </div>
        </form>
        <div className={style.login_buttons_body}>
          {" "}
          <button onClick={signInWithGoogle} className={style.login_button}>
            Google login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
