import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiSer';
import PageHeader from './common/pageHeader';

function SignUpClient(props) {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let history = useHistory();

  const onSubForm = async (formData) => {
    let url = API_URL + "/users/";
    try {
      let data = await doApiMethod(url, "POST", formData);
      if (data._id) {
        toast.success("You successfully signed up!")
        history.push("/login");
      }
      else {
        toast.error("A problem occurred. Please try again later.")
      }
    }
    catch (err) {
      console.log(err.response.data);
      if (err.response.data.code) {
        toast.error("The email address you just tried to submit is already registered to an active user.");
      }
      else {
        toast.error("A problem occurred. Please try again later.");
      }
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  }),
    passwordRef = register("password", { required: true, minLength: 3 }),
    nameRef = register("name", { required: true, minLength: 2 }),
    checkRef = register("biz", { required: false });

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
        <PageHeader title="Sign Up:" />
        <div>
          <label>Email:</label>
          <input {...emailRef} type="text" className="form-control" />
          {errors.email && <span className="text-danger">Enter valid email</span>}
        </div>
        <div>
          <label>Password:</label>
          <input {...passwordRef} type="passowrd" className="form-control" />
          {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
        </div>
        <div>
          <label>Full name:</label>
          <input {...nameRef} type="text" className="form-control" />
          {errors.fullName && <span className="text-danger">Enter min 2 charts name</span>}
        </div>
        <div className="mt-2">
          <input {...checkRef} type="checkbox" className="form-check-input me-2" />
          <label>I am running a business</label>
        </div>
        <button className="btn btn-info mt-3">Sign up</button>
      </form>
    </div>
  )
}

export default SignUpClient