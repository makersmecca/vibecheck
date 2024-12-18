import BackgroundImages from "./BackgroundImages";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../auth/firebaseAuth";
const provider = new GoogleAuthProvider();

const Authentication = () => {
  const location = useLocation().pathname;
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [btnMsg, setBtnMsg] = useState("");
  const [googleBtnMsg, setGoogleBtnMsg] = useState("Continue With Google");
  const Navigate = useNavigate();

  // effect hook to redirect user to feed page if already logged in
  useEffect(() => {
    // console.log(auth.currentUser);
    if (auth.currentUser !== null) {
      Navigate("/feed");
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (location === "/") {
      setBtnMsg("Log In");
    } else {
      setBtnMsg("Sign Up");
    }
    setErrorMsg("");
  }, [location]);

  const handleFormInput = (e) => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    location === "/" ? handleLogin(e) : handleSignUp(e);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("sign up");
    setBtnMsg(
      <>
        <div className="flex justify-center items-center">
          <span className="me-5 animate-pulse">Signing Up</span>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </>
    );
    await createUserWithEmailAndPassword(
      auth,
      formInput.username,
      formInput.password
    )
      .then((usercredential) => {
        // const user = usercredential.user;
        // console.log(user);
        emailverifcationsent();
        setErrorMsg("Verification Email sent!");
        setFormInput({ username: "", password: "" });
        Navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setBtnMsg("Sign Up");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          setErrorMsg("Email is already in use. Sign in to continue");
          setBtnMsg("Sign Up");
        } else if (errorCode == "auth/invalid-email") {
          setBtnMsg("Sign Up");
          setErrorMsg("Invalid Email Address!");
        }
      });
  };

  const emailverifcationsent = async () => {
    await sendEmailVerification(auth.currentUser).then(() => {
      // setErrorMsg("Verification Email sent!");
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formInput.username === "" || formInput.password === "") {
      setErrorMsg("Please Enter Credentials");
      return;
    } else {
      setBtnMsg(
        <>
          <div className="flex justify-center items-center">
            <span className="me-5 animate-pulse">Logging In</span>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </>
      );
      await signInWithEmailAndPassword(
        auth,
        formInput.username,
        formInput.password
      )
        .then((userCredential) => {
          // const user = userCredential.user;
          // console.log(user);
          auth.currentUser.reload(); //refresh the current user details
          //console.log(auth.currentUser.emailVerified);
          if (auth.currentUser.emailVerified) {
            setFormInput({ username: "", password: "" });
            setErrorMsg("Logging you in..");
            Navigate("/feed");
          } else {
            setErrorMsg("Please Verify Your Email ID");
            emailverifcationsent();
          }
        })
        .catch((err) => {
          setBtnMsg("Log In");
          console.log(err.message);
          switch (err.message) {
            case "Firebase: Error (auth/invalid-email).":
              setErrorMsg("Invalid Email");
              setBtnMsg("Log In");
              break;
            case "Firebase: Error (auth/missing-password).":
              setErrorMsg("Invalid Password");
              setBtnMsg("Log In");
              break;
            case "Firebase: Error (auth/invalid-credential).":
              setErrorMsg("Wrong Password");
              setBtnMsg("Log In");
              break;
            case "Firebase: Error (auth/user-not-found).":
              setErrorMsg("User not found");
              setBtnMsg("Log In");
              break;
            default:
              setErrorMsg("Something went wrong");
              setBtnMsg("Log In");
              break;
          }
        });
    }
  };

  const handleGoogleSignin = () => {
    setGoogleBtnMsg(
      <div className="flex justify-center items-center">
        <span className="me-5 animate-pulse">Working Google Magic</span>
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        Navigate("/feed");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleShowPw = (e) => {
    e.preventDefault();
    setShowPw((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed inset-0">
        <BackgroundImages />
      </div>
      {/* Authentication ui */}
      <div className="absolute inset-x-0 top-[26%] md:top-[5%] h-[100%] flex justify-center">
        <div className="bg-white border-black md:w-[40%] w-[90%] rounded-t-[50px] shadow-lg py-8 px-4">
          <span className="flex flex-col items-center w-full font-Pacifico text-[50px] mt-2 md:mt-12">
            Vibesnap
          </span>
          <span className="flex flex-col items-center w-full mt-3 font-Hurricane text-[32px]">
            Join the #vibetribe
          </span>
          <form className="flex flex-col w-full gap-3 mt-2 md:mt-20 items-center">
            <div className="flex flex-col w-[90%] md:w-[70%]">
              <label htmlFor="email" className="block mb-2 text-lg font-medium">
                Your Email
              </label>
              <input
                type="email"
                placeholder="vibetribe@social.com"
                className="rounded-lg block w-full p-2 bg-slate-100"
                name="username"
                id="email"
                onChange={handleFormInput}
                value={formInput.username}
              />
            </div>
            <div className="flex flex-col w-[90%] md:w-[70%]">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium"
              >
                Your Password
              </label>
              <div className="flex">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="password"
                  className="rounded-s-lg block w-full p-2 bg-slate-100"
                  name="password"
                  onChange={handleFormInput}
                  value={formInput.password}
                />
                <button
                  type="button"
                  className="inline-flex items-center px-3 text-sm border rounded-e-lg bg-slate-600"
                  onClick={handleShowPw}
                >
                  {showPw ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-eye-slash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <span>{errorMsg}</span>
            {location === "/" ? (
              <span className="mt-4 w-[90%] md:w-[70%] underline">
                <Link to="/forgotpassword">Forgot Password? </Link>
              </span>
            ) : (
              <div className="my-5"></div>
            )}
            <button
              type="submit"
              className="bg-slate-600 w-[90%] md:w-[70%] rounded-lg p-2 font-medium mt-4 text-white"
              onClick={handleSubmit}
            >
              {/* {location === "/signup" ? "Sign Up" : "Login"} */}
              {btnMsg}
            </button>
          </form>
          <div className="flex flex-row items-center font-semibold mt-4">
            <div className="w-[30%] h-px mx-auto mt-1 me-3 bg-black border-0 rounded"></div>{" "}
            or{" "}
            <div className="w-[30%] h-px mx-auto mt-1 ms-3 bg-black border-0 rounded"></div>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-slate-600 w-[90%] md:w-[70%] rounded-lg p-2 font-medium mt-4 text-white"
              onClick={handleGoogleSignin}
            >
              {googleBtnMsg}
            </button>
          </div>

          <span className="mt-2 flex flex-col items-center underline">
            {location === "/" ? (
              <Link to="/signup">Don't have an account? Sign up.</Link>
            ) : (
              <Link to="/">Already have an account? Login.</Link>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Authentication;
