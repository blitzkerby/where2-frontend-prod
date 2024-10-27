import { useState, useEffect } from "react";
import ButtonComponent from "./reusable/Button";
import FormInput from "./reusable/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./../features/slices/authSlice";
import { LoadingSpinner } from "./reusable/Loading";
import useAuth from "./../hooks/useAuth";
import { EyeIcon, EyeOffIcon, AlertTriangle } from "lucide-react";
import { clearAuthState, logout } from "./../features/slices/authSlice";
import { LoadingOverlay } from "./reusable/Loading";
import deleteUser from "./reusable/functions/DeleteUser";
import DeleteConfirmationModal from "./reusable/functions/DeleteConfirmationModal";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      await dispatch(updatePassword({
        userId,
        token,
        passwordCurrent,
        password,
        passwordConfirm
      })).unwrap();

      setPasswordCurrent('');
      setNewPassword('');
      setNewConfirmPassword('');
      setShowLogoutOverlay(true);

      setTimeout(async () => {
        await dispatch(logout());
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Failed to update password:', err);
      setLocalError(err || 'An error occurred. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(userId);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account:', error);
      setLocalError('Failed to delete account. Please try again.');
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
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
      
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        type="Delete Account"
        warningMsg="Are you sure you want to delete your account? This action cannot be undone and you will lose all your data permanently."
      />

      <div className="max-w-4xl mx-auto p-4">
        <section className="w-full bg-white rounded-3xl mb-8 shadow-md border">
          <div className="lg:w-full lg:px-16 lg:mx-auto px-4 py-8 sm:px-6">
            <div className="border-b pb-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Password Settings</h2>         
              <form className="flex flex-col space-y-6 max-w-md" onSubmit={handleChangePassword}>
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

                <div className="grid grid-cols-1 gap-2 text-sm bg-gray-50 p-4 rounded-lg">
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

                <div className="flex justify-start">
                  <ButtonComponent
                    variant="primary"
                    className="px-6 py-2 min-w-[150px]"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? <LoadingSpinner /> : "Change Password"}
                  </ButtonComponent>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">Danger Zone</span>
              </h2>
              <div className="border-2 border-red-100 rounded-lg p-6 bg-red-50">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-red-800">Delete Account</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Once you delete your account, there is no going back. Please be certain.
                      All of your data including saved preferences, history, and personal information will be permanently removed.
                    </p>
                    <div className="mt-4">
                      <ButtonComponent
                        variant="danger"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SettingPanel;