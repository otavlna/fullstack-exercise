import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export type LoginInputs = {
  username: string;
  password: string;
};

const Login: FunctionComponent = () => {
  const router = useRouter();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    if (isValid) {
      dispatch(login(data));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      router.push("/articles");
    }
  }, [loggedIn, router]);

  return (
    <div className="shadow p-4 mx-auto" style={{ width: "368px" }}>
      <h3 className="mb-3">Log In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="d-block mb-1">
          Username
        </label>
        <input
          id="username"
          className="w-100 p-1 border rounded"
          {...register("username", {
            required: "Required",
            minLength: { value: 3, message: "Min 3 characters" },
            maxLength: { value: 50, message: "Max 50 characters" },
          })}
          placeholder="admin"
        />
        {errors.username && <p className="text-danger">{errors.username?.message}</p>}
        <label htmlFor="password" className="d-block mb-1 mt-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-100 p-1 border rounded"
          {...register("password", {
            required: "Required",
            minLength: { value: 8, message: "Min 8 characters" },
            maxLength: { value: 256, message: "Max 256 characters" },
          })}
          placeholder="********"
        />
        {errors.password && <p className="text-danger">{errors.password?.message}</p>}
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
