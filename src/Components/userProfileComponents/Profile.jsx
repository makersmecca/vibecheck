import { Link } from "react-router-dom";
// import Navbar from "../Navbar";
import bg9 from "/bgImg/bg9.jpeg";
const Profile = () => {
  const username = "New User 1";
  const bio = "Lorem ipsum dolor sit amet consectetur, adipisicing elit";
  return (
    <div className="flex flex-col">
      <Link to="/feed">
        <div className="absolute left-5 top-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-arrow-left"
            stroke="white"
            strokeWidth="1.5"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </div>
      </Link>
      {/* profile banner */}
      <div className="flex justify-center">
        <img src={bg9} className="w-full md:w-[50%] h-[150px] rounded-b-2xl" />
      </div>
      {/* profile picture */}
      <div className="absolute top-[13%] md:top-[15%] left-[5%] md:left-[30%]">
        <img src={bg9} className="md:relative w-24 h-24 rounded-full " />
      </div>
      {/* edit profile button */}
      <div className="flex items-center justify-end px-2 w-full md:w-[50%] mt-5 self-center gap-4">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
          </svg>
        </button>
        <Link to="/editprofile">
          <button className="border-[2px] border-black rounded-2xl w-[200px] md:w-[300px] py-1 text-black font-semibold font-Lexend text-lg">
            Edit Profile
          </button>
        </Link>
      </div>
      {/* username */}
      <div className="self-center w-full md:w-[50%] mt-10 text-3xl font-semibold px-7">
        {username}
      </div>
      {/* bio */}
      <div className="self-center w-full md:w-[50%] px-7 mt-3">{bio}</div>
      {/* user's posts */}
      <div className="self-center w-full md:w-[50%] mt-6 px-7 text-xl font-normal">
        My Posts
      </div>

      {/* create new post button */}
      <Link to="/newpost">
        <div className="rounded-full h-[60px] w-[60px] absolute z-10 bottom-6 right-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </div>
      </Link>
    </div>
  );
};
export default Profile;
