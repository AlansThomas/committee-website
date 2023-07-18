import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Link, useNavigate } from "react-router-dom";
import Configuration from '../Configuration';
import '../css/LoginTest.css';
import profileStyles from "../Screens/Innovature/components/profile/profile.module.css";
// import openeye from "../components/images"
import { useDispatch } from "react-redux";
///step12 the use ese effect
import React, { useEffect, useState } from 'react';

//react-router-dom navigate

const Login = () => {

    const [loginFlag, SetloginFlag] = useState(false)
    const [loginButtonFlag, SetloginButtonFlag] = useState(false)
    const dispatch = useDispatch();
    const [openEyeClick, setopenEyeClick] = useState(false)













    const navigate = useNavigate();

    //step1 set initial values and it  be an object and it should be empty at initial state
    const initialValues = { email: "", password: "" }
    //step2 create a state this will be equal to the useState
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [formOptions, setFormOptions] = useState({});
    //step11 set  issubmit to false it become true only if the  the form is true
    //step7:we need to submit the form when ever we submit the form we need to see the form and  have event . prevent to get rid nof page getting reload
    //hence we can see the values as a form if we console it



    const handleSubmit = (e) => {

        e.preventDefault();



        setFormErrors(validate(formValues))


        if (Object.keys(formErrors).length === 0) {



            fetch(Configuration.devUrl + 'auth/jwt/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            })
                .then(response => response.json())
                .then(async (UserData) => {




                    setFormErrors({ password: UserData.Message })
                    if (UserData.data) {
                        const LocalData = UserData
                        localStorage.setItem("Profile", JSON.stringify(LocalData))

                        localStorage.setItem("loggedInUser", LocalData.data.UserName)
                        localStorage.setItem("LoggedInEmail", LocalData.data.Email)
                        localStorage.setItem("LoggedInUserType", LocalData.data.Type)


                    }

                    if (UserData.data.Type === 0) {
                        localStorage.setItem("loginSuccess", "1")

                        navigate("/dashboardInno/feed");
                    }

                    if (UserData.data.Type === 1) {

                        if (localStorage?.getItem("Logintype") === "1") {
                            localStorage.setItem("loginSuccess", "1")

                            navigate("/dashboardCommitte");
                        }
                        if (localStorage?.getItem("Logintype") === "0") {
                            localStorage.setItem("loginSuccess", "1")

                            navigate("/dashboardInno/feed");
                        }




                    }
                    if (UserData.data.Type === 2) {
                        localStorage.setItem("loginSuccess", "1")
                        // localStorage.removeItem("loginSuccess")

                        navigate("/dashboard/app");
                    }



                }).catch((error) => {

                    console.error(error);

                })


        }


    };
    const handlechange = (e) => {

        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value })



        if (e.target.name === "email") {
            fetch(Configuration.devUrl + 'users/FindByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({ "email": e.target.value })

            })
                .then(response => response.json())
                .then(UserData => {

                    dispatch({ type: "LOGINTYPE", UserData })
                    if (UserData === 1) {
                        localStorage.removeItem("Type")
                        SetloginFlag(true)
                        SetloginButtonFlag(true)


                    }
                    else if (UserData === 0) {
                        localStorage.removeItem("Type")

                        SetloginFlag(false)
                        SetloginButtonFlag(false)



                    }
                    else if (UserData === 2) {
                        localStorage.setItem("Type", '2')
                        SetloginFlag(false)
                        SetloginButtonFlag(false)





                    } else {

                        SetloginFlag(false)
                        SetloginButtonFlag(false)




                    }

                })


        }



    };

    useEffect(() => {


        if (JSON.parse(localStorage.getItem("Profile")) !== null && localStorage?.getItem("loginSuccess") == "1") {
            const UserData = JSON.parse(localStorage.getItem("Profile")).data


            if (UserData.Type === 0) {

                navigate("/dashboardInno/feed");

            }
            if (UserData.Type === 1) {


                if (localStorage.getItem("Logintype") === "0") {



                    navigate("/dashboardInno/feed");




                }
                if (localStorage.getItem("Logintype") === "1") {



                    navigate("/dashboardCommitte");




                }

            }

            if (UserData.Type === 2) {






                navigate("/dashboard/app");
            }

        }



    }, [])
    //added dependency of form error




    const login = () => {

        if (loginButtonFlag && !localStorage.getItem("Logintype")) {


            setFormOptions({ "error": "please choose any" })


        }
        else {

            setFormErrors(validate(formValues))
        }



    }




    const RadioResponse = (RadioRespons) => {

        setFormOptions({ "error": "" })
        localStorage.setItem("Logintype", RadioRespons);

    }







    //step6 create a validation method for  
    const validate = (values) => {

        const passString = "Pass"
        const passString2 = "word"

        const errors = {}
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        // const regex2 = /^[A-Za-z0-9._%+-]+@(?!innovaturelabs.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i;
        //step 10 :then check the username email and password according to response we return error object

        if (!values.email) {
            errors.email = "Email is required";
        }
        else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email ";
        }
        // else if (regex2.test(values.email)) {
        //     errors.email = "domain should be innovaturelabs.com ";
        // }
        if (!values.password) {
            errors.password = `${passString + passString2} is required`;
        }

        else if ((values.password).length < 4) {
            errors.password = `${passString + passString2} should greater than 4`;
        }
        return errors;
    }
    const openeye = () => {
        setopenEyeClick(!openEyeClick);
    };
    return (


        <div className="bodyall">


            <div class="container">
                <div class="body d-md-flex align-items-center justify-content-start">
                    <div class="box-1 col col-12 ">
                        <div class="d-flex align-items-center justify-content-center ">




                            <img src={require("./images/unnamed.jpg")} class=" flexboxImage " alt="" />




                        </div>
                        <div className=" bg-white">
                            <div className="d-flex align-items-center justify-content-center">
                                <span className="testSpan TextHead2 "><h2 className="h2"><span className="span1">Re</span><span className="span3">creation</span> <span className="span2">Co</span><span className="span4">mmittee</span></h2></span>
                            </div>
                        </div>




                        {/* <div className="row textrow  bg-white d-flex align-items-center justify-content-center  "> */}

                        {/* <div className='col col-12 bg-white  '>   <div className="row " >
                       <div className="col col-12  textHead bg-white  flex align-items-center justify-content-center"><b >Recreation Committee </b>
                       </div>
                      
                    </div>


                    </div> */}


                        {/* <div class="mt-3">
                                <p class="mb-0 text-muted"></p>
                                <div class="form-label TextHead"></div>
                            </div>

                        </div> */}





                    </div>

                    <div class=" box-2 d-flex flex-column h-100 bg-white ">
                        <div class="mt-5 bg-none ">
                            {/* <p class="mb-1 h-1"></p>
                    <p class="text-muted mb-2"></p> */}
                            <div class="d-flex flex-column ">
                                <p class="text-muted mb-2"></p>

                                <div class="d-flex align-items-center">
                                    <form onSubmit={handleSubmit} className="bg-none formBox">
                                        <div className='row formRow'>
                                            <div className='col col-12 formCol'>

                                                <div class="mb-3 my-2">
                                                    <input type="email" class="form-control border " id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handlechange} placeholder="Email" />
                                                    <p className='p'> {formErrors.email}</p>

                                                </div>
                                            </div>
                                            <div className='col col-12 formCol'>
                                                <div class="mb-3">
                                                
                                                    {openEyeClick ? (<div style={{left:"89%"}} className="openeyeLogin" onClick={openeye}></div>) :
                                                        (
                                                            <div style={{left:"89%"}} className="openeyecloseLogin" onClick={openeye}></div>
                                                        )
                                                    }
                                                    <input type={openEyeClick ? 'text' : 'password'} class="form-control border" id="exampleInputPassword1" name='password' value={formValues.password} onChange={handlechange} placeholder="Password" aria-describedby="" />
                                                    <p className='p'> {formErrors.password}</p>

                                                    <b className="mb-0 text-left"><Link to="/ResetPassword"
                                                        className=" fw-bold text-primary"><a className="click text-primary link ">Forgot password?</a>
                                                    </Link></b>


                                                </div>

                                            </div>
                                            {/* check if it is a committee member or not */}
                                            {



                                                loginFlag ?
                                                    <div className='col col-12 bgcolor g-2'>

                                                        <div class="d-flex align-items-center justify-content-center bgcolor">

                                                            <div class="form-check mx-2">
                                                                <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={1} onClick={(e) => { RadioResponse(e.target.value) }} />
                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                    <b>Committee </b>
                                                                </label>
                                                            </div>
                                                            <div class="form-check m-lg-2">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={0} onClick={(e) => { RadioResponse(e.target.value) }} />
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                    <b>Innovator</b>
                                                                </label>
                                                            </div>




                                                        </div>


                                                    </div>

                                                    : <div className='col col-12 bgcolor'>
                                                        <div class="d-flex align-items-center justify-content-center bgcolor">


                                                            <button class="btn2 border-dark" onClick={login} disabled="">Login</button>




                                                        </div>



                                                    </div>


                                            }
                                            <div className='col col-12 bgcolor'>
                                                <div class="d-flex align-items-center justify-content-center bgcolor">


                                                    {<p className='p'> {formOptions?.error}</p>}



                                                </div>



                                            </div>
                                            {

                                                loginButtonFlag ? <div className='col col-12 bgcolor'>
                                                    <div class="d-flex align-items-center justify-content-center bgcolor">


                                                        <button class="btn2 border-dark" onClick={login} disabled="">Login</button>




                                                    </div>



                                                </div> : <></>


                                            }


                                        </div>
                                    </form>


                                </div>


                            </div>
                        </div>
                        {/* <div class="mt-auto">
                    <p class="footer text-muted mb-0 mt-md-0 mt-4">By register you agree with our
                        <span class="p-color me-1">terms and conditions</span>and
                        <span class="p-color ms-1">privacy policy</span>
                    </p>
                </div> */}
                    </div>
                    <span class="fas fa-times"></span>
                </div>
            </div>

        </div>
















    )
}
export default Login;
