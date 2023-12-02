import React from "react";
import "./ForgetPassword.css";
import { Formik ,Field ,Form, ErrorMessage } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as yup from 'yup';
import { resetPassword } from "../../features/auth/authSlice";
import { ToastContainer ,toast } from "react-toastify";
function ResetPassword() {
    const param =useParams();
    const {token ,id} =param ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetstate = useSelector((state) =>state.user);
    // //console.log(ResetPassword);
    const{error ,message } = resetstate;
    //console.log(error ,message);
    useEffect(()=>{
        if(message){
            toast.success(message , {position :toast.POSITION.TOP_CENTER});
            setTimeout(()=>{
              navigate("/")
            },1000)
          }
          if(error){
            toast.error(error , {position :toast.POSITION.TOP_CENTER});
          }
    })
  let defaultValue ={
    password :"",
    confirmPassword:""
  }
  let validationSchema= yup.object().shape({
    password :yup.string().required("please enter your password"),
    confirmPassword :yup.string().required("please enter your confirm password"),
  })
  const handleSubmit = (values)=> {
    // console.log(values);
    let obj ={
        ...values ,
        id :id,
        token :token ,
    }
    dispatch(resetPassword(obj));
   };
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
        <Field type="password" name="password" placeholder="✉️ Enter your new password"></Field>
        <ErrorMessage name="password"></ErrorMessage>
        <Field type="text" name="confirmPassword" placeholder="✉️ Enter confirm password"></Field>
        <ErrorMessage name="confirmPassword"></ErrorMessage>
        <button type="submit">Reset</button>
      </div>
    </Form>
    </Formik>
</>
  );
}

export default ResetPassword;
