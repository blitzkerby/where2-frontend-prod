import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from "./../reusable/Button";
import ContainerComponent from "../reusable/ContainerComponent";
import { register } from "../../features/slices/authSlice";
import { LoadingSpinner, LoadingOverlay } from "../reusable/Loading";

const TermsAndConditionsComponent = () => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const registrationData = location.state?.registrationData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreed && registrationData) {
      try {
        const response = await dispatch(register(registrationData)).unwrap();
        const email = response.email || registrationData.email;
        navigate("/signup/verification", { state: { email } });
      } catch (err) {
        setError(err.message || "Username or email is not available. Please try again.");
      }
    }
  };

  if (status === 'loading') {
    return <LoadingOverlay message="We are processing your request..."/>
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ContainerComponent>
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center text-gray-800">Our Terms and Services</h2>
        <div className="w-1/4 h-0.5 bg-gray-300 mx-auto mt-4"></div>
      </div>

      <div className="mb-6 overflow-y-auto max-h-[40vh]">
        <h3 className="font-semibold mb-2">1. Clause 1</h3>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
          condimentum eget purus in. Consectetur eget id morbi amet amet. Ipsum
          viverra pretium tellus neque. Ullamcorper suspendisse aenean leo
          pharetra in sit semper et. Amet quam placerat sem.
        </p>
        
        <h3 className="font-semibold mb-2">2. Clause 2</h3>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
          condimentum eget purus in. Consectetur eget id morbi amet amet. Ipsum
          viverra pretium tellus neque. Ullamcorper suspendisse aenean leo
          pharetra in sit semper et. Amet quam placerat sem.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            className="mr-2"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree" className="text-sm text-gray-600">
            Agree to Terms and Services
          </label>
        </div>
        
        <div className="flex justify-center items-center">
        <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] h-[32px] sm:w-[343px] sm:h-[50px]"
            disabled={!agreed || status === "loading"}
            type="submit"
          >
            {status === "loading" ? <LoadingSpinner/> : "Agree & Proceed to Verification"}
          </ButtonComponent>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 underline">
            Log in
          </Link>
        </p>
      </div>
    </ContainerComponent>
  );
};

export default TermsAndConditionsComponent;