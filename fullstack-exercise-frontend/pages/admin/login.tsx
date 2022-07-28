import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const Login: FunctionComponent = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
  };

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
          {...register("username", { required: true })}
          placeholder="admin"
        />
        {!!errors.username?.message ?? <p className="text-danger">{errors.username?.message}</p>}
        <label htmlFor="password" className="d-block mb-1 mt-2">
          Password
        </label>
        <input
          id="password"
          className="w-100 p-1 border rounded"
          {...register("password", { required: true })}
          placeholder="********"
        />
        {!!errors.password?.message ?? <p className="text-danger">{errors.password?.message}</p>}
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
