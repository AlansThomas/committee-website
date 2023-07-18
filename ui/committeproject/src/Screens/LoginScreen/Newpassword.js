
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ToastServive from 'react-material-toast';
import { useNavigate } from "react-router-dom";
import Configuration from "../../Configuration";
import '../../css/Login.css';
///step12 the use ese effect
import { useEffect, useState } from 'react';
const toast = ToastServive.new({
    place: 'BOTTOM_CENTER',
    duration: .5,
    maxCount: 8
});

//react-router-dom navigate
const validate = (values) => {
    const errors = {}
    // const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    // const regex2 = /^[A-Za-z0-9._%+-]+@(?!innovaturelabs.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i;
    //step 10 :then check the username email and password according to response we return error object

const passString="pass"
const passString2="word"
    if (!values.password) {
        errors.password = "Please enter a "+passString+passString2;
    }

    else if ((values.password).length < 4) {
        errors.password = passString+passString2+" minimum length is 4";
    }
    if (!values.passwordc) {
        errors.passwordc = "Please enter a "+passString+passString2;
    }

    else if ((values.passwordc).length < 4) {
        errors.passwordc = `${passString+passString2} minimum length is 4`;
    }
    return errors;
}
const Newpassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //step1 set initial values and it  be an object and it should be empty at initial state
    const initialValues = { password: "", passwordc: "" }
    //step2 create a state this will be equal to the useState
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    //step11 set  issubmit to false it become true only if the  the form is true
    const [issubmit, setIsSubmit] = useState(false)
    //step7:we need to submit the form when ever we submit the form we need to see the form and  have event . prevent to get rid nof page getting reload
    //hence we can see the values as a form if we console it
    const handleSubmit = (e) => {
        e.preventDefault();
        

        //step8:it will take all the form values and check it for the validation    
        //outcome of validate function is settled into the formvalues
        setFormErrors(validate(formValues))
        setIsSubmit(true)


    };

    useEffect(() => {

     
        if(localStorage.getItem("forgetpassword")===null){
            navigate("/")
        }
            
        
            }, [formErrors])
    


    const handlechange = (e) => {
        //step5: we need name and value of input field both are available in event.target
        const { name, value } = e.target;
        //step6:then we set the form values ... is use to get all the initial  states once you get 
        //the initial state ,next add a [name] and (value) for that name print the console  we can s
        //ee tha name and value as object if yopu use a console
        setFormValues({ ...formValues, [name]: value })
         setIsSubmit(true)



    };
    //step13 :useeffect is a library that react in according with for  state
    //it will have an arrow fucntion it will get changed based on the array
    // const onSearch = () => {
    //     
    //     axios.get(Configuration.devUrl + 'Users/Display/FilteredUser').then((response) => {
    //         

    //     });
    // }
  
    const LoginTest = async () => {
        
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        const email = await JSON.parse(localStorage.getItem("email")).email
        if (Object.keys(formErrors).length === 0 && issubmit) {
            
             setLoading(true)
          
            const data = formValues;
            if (data.password === data.passwordc) {

                const dataLogin = { "Email": email, "Password": data.passwordc }

                
                fetch(Configuration.devUrl + 'auth/jwt/ChangePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataLogin)
                })
                    .then(response => response.json())
                    .then(UserData => {
                        setTimeout(() => {
                            setLoading(false);
                          },1000);
                        
                          toast.success('password successfully changed');

                        localStorage.clear();
                        navigate("/")








                    }).catch((error) => {

                        setFormErrors({ "otp": "invalid otp entered" })


                    })

            }




            else {
                setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                toast.error('password mismatch');
            }



        }


    }

    //added dependency of form error


    //step6 create a validation method for  
   
    return (

        
<div className="bodyall">
{loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (

<div class="container">
    <div class="body d-md-flex align-items-center justify-content-start">
        <div class="box-1 col col-12 ">
            <div class="d-flex align-items-center justify-content-center ">




                 <img src={require("../../components/images/unnamed.jpg")} class=" flexboxImage " alt="" />
                



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
                        <div class="mb-3">
                                            <input type="password" class="form-control border" id="exampleInputPassword1" name='password' value={formValues.password} onChange={handlechange} placeholder="Password" aria-describedby="" />
                                            <p className='p'> {formErrors.password}</p>



                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control border" id="exampleInputPassword1" name='passwordc' value={formValues.passwordc} onChange={handlechange} placeholder="Confirm Password" aria-describedby="" />
                                            <p className='p'> {formErrors.passwordc}</p>



                                        </div>
                                        <div class="btn_login">

                                        </div>


                                        <div class="mt-3">


                                            <div class="">
                                                <button class="btn2 border-dark" onClick={LoginTest} type="submit">Change Password</button>

                                            </div>
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
</div>)}
</div>




    )


}
export default Newpassword;

