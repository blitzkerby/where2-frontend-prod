import { useState, useEffect } from "react";
import ButtonComponent from "./reusable/Button";
import FormInput from "./reusable/InputField";
import PictureUpload from "./reusable/PictureUpload";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./../features/slices/authSlice";
import { LoadingSpinner } from "./reusable/Loading";
import useAuth from "./../hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { clearAuthState, logout } from "./../features/slices/authSlice";
import { LoadingOverlay } from "./reusable/Loading";


const SettingPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setNewPassword] = useState('');
  const [passwordConfirm, setNewConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    length: false,
    letter: false,
    number: false,
  });

  const { userId, token } = useAuth();
  const { status, error, message } = useSelector((state) => state.auth);

  const validatePassword = (password) => {
    const isValidLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    setValidationErrors({
      length: isValidLength,
      letter: hasLetter,
      number: hasNumber,
    });

    return isValidLength && hasLetter && hasNumber;
  };

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validatePassword(password)) {
      setLocalError('Password must be at least 6 characters long, contain at least one letter and one number.');
      return;
    }

    if (password !== passwordConfirm) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      const resultAction = await dispatch(updatePassword({
        userId,
        token,
        passwordCurrent,
        password,
        passwordConfirm
      })).unwrap();

      // Clear form on success
      setPasswordCurrent('');
      setNewPassword('');
      setNewConfirmPassword('');

      // Show overlay with success message
      setShowLogoutOverlay(true);

      setTimeout(async () => {
        // Log out user after successful password update
        await dispatch(logout());
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Failed to update password:', err);
      setLocalError(err || 'An error occurred. Please try again.');
    }
  };

  const renderPasswordInput = (label, value, onChange, show, setShow, error) => (
    <div className="relative">
      <FormInput
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className={`p-3 sm:p-4 h-fit pr-10 ${
          error ? "border-rose-400 border" : ""
        }`}
        rounded
        type={show ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 bottom-1 transform -translate-y-1/2"
      >
        {!show ? 
          <EyeOffIcon className="h-5 w-5 text-gray-400" /> : 
          <EyeIcon className="h-5 w-5 text-gray-400" />
        }
      </button>
    </div>
  );

  return (
    <>
      {showLogoutOverlay && (
        <LoadingOverlay
          message="Password updated successfully! You will be logged out in a moment for security purposes."
          showSpinner={true}
        />
      )}
      
      <section className="w-full h-full bg-white rounded-3xl mb-8 shadow-md border pb-12">
        <div className="lg:w-full lg:px-16 lg:mx-auto h-full px-4 pb-6 pt-12 sm:px-6 lg:pb-0">         
          <form className="flex flex-col space-y-4" onSubmit={handleChangePassword}>
            {renderPasswordInput(
              "Current Password",
              passwordCurrent,
              setPasswordCurrent,
              showCurrentPassword,
              setShowCurrentPassword,
              localError
            )}

            {renderPasswordInput(
              "New Password",
              password,
              setNewPassword,
              showNewPassword,
              setShowNewPassword,
              localError
            )}

            {/* Password Requirements */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className={`flex items-center gap-2 ${validationErrors.length ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${validationErrors.length ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>At least 6 characters</span>
              </div>
              <div className={`flex items-center gap-2 ${validationErrors.letter ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${validationErrors.letter ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>At least one letter</span>
              </div>
              <div className={`flex items-center gap-2 ${validationErrors.number ? 'text-green-500' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${validationErrors.number ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>At least one number</span>
              </div>
            </div>

            {renderPasswordInput(
              "Confirm New Password",
              passwordConfirm,
              setNewConfirmPassword,
              showConfirmPassword,
              setShowConfirmPassword,
              localError
            )}

            {localError && (
              <p className="text-rose-500 text-sm font-medium">{localError}</p>
            )}

            {status === "succeeded" && message && (
              <p className="text-green-500 text-sm font-medium">{message}</p>
            )}

            <div className="flex justify-center items-center">
              <ButtonComponent
                variant="primary"
                className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? <LoadingSpinner /> : "Change Password"}
              </ButtonComponent>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SettingPanel;