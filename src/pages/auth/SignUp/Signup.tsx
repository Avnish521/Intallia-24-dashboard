import myImage from '@/assets/Frame 25.svg';
import SignupForm from './SignupForm';
import SignupImg from "@/assets/Hired-bro 1.svg";
import { useState } from 'react';
import OtpVerification from './OtpVerification';
import { useNavigate } from 'react-router-dom';
import { SignupFormValues } from "@/schema/authSchema";
import { useSignup } from "@/queries/authQuery";
//import { storeUserData } from '@/utils';


const Singup = () => {
  const [isShowV, setIsShowV] = useState(false);
  const navigator = useNavigate();
  const { mutateAsync: signup } = useSignup();

  const handleSignup = async (formData: SignupFormValues) => {
    const payload = {
      JSON: JSON.stringify({
        Header: [
          {
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            ContactNumber: formData.contactNumber,
            Password: formData.password
          }
        ],
        Response: [
          {
            ResponseText: "",
            ErrorCode: ""
          }
        ]
      })
    };

    await signup(payload, {
      onSuccess: () => {
        setIsShowV(true);
      }
    });
    // console.log("Form Data:", formData);
    // storeUserData("userData", { "UserId": "U14", "UserGroupId": "Student", "CompanyId": "Intallia24", "IsValid": "true", "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJVMTQiLCJqdGkiOiI5N2JlMDAxNS01YWYxLTQzMmEtYjBiYi04Njk4ODJiZTMwZTgiLCJleHAiOjE3NTEwNDIyMTcsImlzcyI6IioiLCJhdWQiOiIqIn0.pOSg3AYaqNPL6annPJHQAtnG7nxWxe_8en3ssjV3Ang" });
    //  setIsShowV(true);
  }

  return (
    <div className="h-screen">
      <div className="container">
        <div className="flex justify-between items-center h-[72px]">
          <div className="">
            <img src={myImage} alt="Example" />
          </div>
          <div className="flex gap-2 items-center">
            <button className="rounded-lg bg-[#242426] py-2 px-3 text-[#FFFFFF] leading-[21px]" onClick={() => navigator('/login')}>
              Login
            </button>
            <button className="ring-1 rounded-lg py-1 px-3 ring-[#242426]" onClick={() => navigator('/signup')}>
              Singup
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center p-5 md:p-0">
        <div className="hidden md:w-1/2 bg-[rgb(242,244,247)] md:flex items-center justify-center flex-col gap-5 sticky top-0 h-[90vh]">
          <img src={SignupImg} alt="signup" />
          <h2 className="font-semibold text-5xl leading-[41px] text-center ">
            Explore. Practice. Get Hired!
          </h2>
        </div>
        {!isShowV && (
          <SignupForm onSubmit={(e) => handleSignup(e)} />
        )}
        {isShowV && <OtpVerification />}
      </div>
    </div>
  );
}

export default Singup;
