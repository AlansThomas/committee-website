import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Configuration from "../../Configuration";
import ToastServive from "react-material-toast";
///step12 the use ese effect
import { useState } from "react";
const toast = ToastServive.new({
  place: "BOTTOM_CENTER",
  duration: 0.5,
  maxCount: 8,
});

//react-router-dom navigate

const forgotpassword = () => {
  localStorage.setItem("forgetpassword", true);
};

const validate = (values) => {
  const errors = {};
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  // const regex2=/^[A-Za-z0-9._%+-]+@(?!innovaturelabs.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i;
  //step 10 :then check the username email and password according to response we return error object

  if (!values.email) {
    errors.email = "email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "this is not a valid email ";
  }
  // else if(regex2.test(values.email))
  // {
  //     errors.email = "domain should be innovaturelabs.com ";
  // }

  return errors;
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //step1 set initial values and it  be an object and it should be empty at initial state
  const initialValues = { email: "" };
  //step2 create a state this will be equal to the useState
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  //step11 set  issubmit to false it become true only if the  the form is true
  //step7:we need to submit the form when ever we submit the form we need to see the form and  have event . prevent to get rid nof page getting reload
  //hence we can see the values as a form if we console it

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = localStorage.getItem("Type");
    setFormErrors(validate(formValues));


    if (type == null) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      toast.error("Email Not Verified");
    }
    //step8:it will take all the form values and check it for the validation
    //outcome of validate function is settled into the formvalues
    else if (Object.keys(formErrors).length === 0) {
      fetch(Configuration.devUrl + "auth/jwt/SendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((UserData) => {
          localStorage.setItem("email", JSON.stringify(formValues));

          forgotpassword();
          navigate("/OtpConfirm");
        })
        .catch((error) => {
          toast.error("This Email Is Not Registered");
        });
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
  
    setFormValues({ ...formValues, [name]: value });
  
    if (e.target.name === "email") {
      fetch(Configuration.devUrl + "users/FindByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e.target.value }),
      })
        .then((response) => response.json())
        .then((UserData) => {
          switch (UserData) {
            case 1:
              localStorage.setItem("Type", UserData);
              break;
            case 0:
              localStorage.setItem("Type", UserData);
              break;
            case 2:
              localStorage.setItem("Type", UserData);
              break;
            default:
              localStorage.removeItem("Type");
              break;
          }
        });
    }
  };
  
  //step13 :useeffect is a library that react in according with for  state
  //it will have an arrow fucntion it will get changed based on the array
  // const onSearch = () => {
  //
  //     axios.get(Configuration.devUrl + 'Users/Display/FilteredUser').then((response) => {
  //

  //     });
  // }

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
                <img
                  src={require("../../components/images/unnamed.jpg")}
                  class=" flexboxImage "
                  alt=""
                />
              </div>
              <div className=" bg-white">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="testSpan TextHead2 ">
                    <h2 className="h2">
                      <span className="span1">Re</span>
                      <span className="span3">creation</span>{" "}
                      <span className="span2">Co</span>
                      <span className="span4">mmittee</span>
                    </h2>
                  </span>
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
                        <input
                          type="email"
                          class="form-control border "
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="email"
                          value={formValues.email}
                          onChange={handlechange}
                          placeholder="Enter Your Email"
                        />
                        <p className="p">{formErrors.email}</p>
                      </div>
                      {/* <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                 <input type="password" class="form-control border border-primary" id="exampleInputPassword1"  name='password' value={formValues.password} onChange={handlechange}placeholder="Password" aria-describedby=""/>
                                         <p className='p'>{formErrors.password}</p>
             </div> */}
                      <div class="">
                        <button class="btn2 border-dark" type="submit">
                          <b>Send otp</b>
                        </button>
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
      )}
    </div>
  );
};
export default ResetPassword;
