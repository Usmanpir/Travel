import React from "react";
import { useState, useEffect } from "react";
import "./SignUp.css"

export default function SignUp () {
    const initialValues = {name: '', phone: '', email: '', password: '', confirmpass: ''  };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        isSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
    }, [formErrors] );

     const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "User Name is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)){
            errors.email = "This is not a valid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }else if (values.password.length < 6){
            errors.password = "Password should be greater then 6  characters";
        }
        if (!values.confirmpass) {
            errors.confirmpass = "Confirm Password is required";
        } else if (values.password !== values.confirmpass){
            errors.confirmpass = "Password not matched";
        }

        return errors; 
     };

    return(
        <>
        <section className="signup">
            <div className="container mt-5">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signuped Successfully</div>
        ) : ( <pre> JSON.stringify(formValues, undefined, 2) </pre> )}
               <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign Up</h2>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="name" name="name" id="name" autoComplete="off" placeholder="Your name"
                                 value={formValues.name}
                                 onChange={handleChange}
                                 />
                            </div>
                            <p>{formErrors.name}</p>
                            <div className="form-group">
                                
                                <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Your Phone Number" 
                                value={formValues.phone}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                
                                <input type="email" name="email" id="email" autoComplete="off" placeholder="Your email"
                                 value={formValues.email}
                                 onChange={handleChange}
                                 />
                            </div>
                            <p>{formErrors.email}</p>
                            <div className="form-group">
                                
                                <input type="password" name="password" id="password" autoComplete="off" placeholder="password"
                                 value={formValues.password}
                                 onChange={handleChange}
                                 />
                            </div>
                            <p>{formErrors.password}</p>
                            <div className="form-group">
                                
                                <input type="password" name="confirmpass" id="cpassword" autoComplete="off" placeholder="Confirm Password" 
                                value={formValues.confirmpass}
                                onChange={handleChange}
                                />
                                <p>{formErrors.confirmpass}</p>
                                <button type="Sign Up" id="sign_up" >Sign Up</button>
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
        </>
    ) ;
}