import React from "react";
import "./ForgetPassword.css";
import { Formik ,Field ,Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { ToastContainer } from "react-bootstrap";
function ForgetPassword() {
 let navigate =useNavigate()
 let dispatch =useDispatch();
 const forgetData = useSelector((state)=> state.user);
 const {error ,forget_msg} =forgetData;
  let defaultValue ={
    email :"",
  }
  let validationSchema= yup.object().shape({
    email :yup.string().required().email("please enter your email"),
  })
  const handleSubmit = (values)=> {
    console.log("values",values);
    dispatch(forgetPassword(values));
   };
   useEffect (()=>{
    if(forget_msg){
      toast.success(forget_msg , {position :toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        navigate("/")
      },1000)
    }
    if(error){
      toast.error(error,{position: toast.POSITION.TOP_CENTER})
    }
   })
  return (
    <>
    <ToastContainer/>
    <Formik 
     initialValues={defaultValue}
     validationSchema={validationSchema}
     onSubmit={handleSubmit}>
    <Form className="Box">
      <div className="Box-a">
        <h1>Reset Password</h1>
        <Field type="text" name="email" placeholder="✉️ Enter Email"></Field>
        <ErrorMessage name="email"></ErrorMessage>
        <button type="submit">Reset</button>
      </div>
    </Form>
    </Formik>
    </>
  );
}

export default ForgetPassword;
