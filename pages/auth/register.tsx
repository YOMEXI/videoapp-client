import style from "./login.module.css";
import { auth, provider } from "./../../utils/firebase";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loginStart,
  loginSuccess,
  loginError,
} from "../../redux/user/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        `/api/auth/signup`,
        { name, password, email },
        {
          withCredentials: true,
          headers: { crossDomain: true, "Content-Type": "application/json" },
        }
      );

      toast.success("Please Login");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(loginError(err.response.data.message));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form_body}>
        <form onSubmit={Submit} className={style.login_form}>
          <h1 className={style.login_title}>Registration form</h1>

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
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className={style.login_button}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
