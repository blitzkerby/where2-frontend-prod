import ListingComponent from "./reusable/ListingComponent";
import ButtonComponent from "./reusable/Button";
import { Menu, Edit2, BusFront , Pen , Trash } from "lucide-react";

const FormInput = ({
    label,
    name,
    type,
    value,
    onChange,
    required,
    autoComplete,
    autoCorrect,
    rounded,
    autoCapitalize,
    className = "",
    ...props
  }) => {
    return (
      <div className="flex-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          className={`${
            rounded ? "rounded-[19px]" : ""
          } mt-3 block w-full rounded-md border-gray-300 h-[50px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className} border-[2px]`}
          {...props}
        />
      </div>
    );
  };
  
  const UserAccount = ({ userInfo }) => {
    return (
      <section className="w-full lg:mx-[32px] lg:h-full sm:min-h-fit bg-white rounded-3xl shadow-md border">
        <div className="lg:w-[80%] lg:pl-[128px] lg:mx-[64px] px-4 py-6 sm:px-6 lg:pb-0">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-gray-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Edit2 size={16} />
              </button>
            </div>
          </div>
  
          <p className="text-center mb-6">{userInfo.lastName}</p>
  
          <div className="space-y-4">
            {userInfo.entity && (
              <FormInput
                label="Entity"
                value={userInfo.entity}
                disabled
                rounded
                className="p-3 sm:p-4"
              />
            )}
  
            <div className="flex flex-col sm:flex-row gap-4">
              <FormInput
                label="First Name"
                value={userInfo.firstName}
                placeholder="First Name"
                className="p-3 sm:p-4"
                disabled
                rounded
              />
              <FormInput
                label="Last Name"
                value={userInfo.lastName}
                placeholder="Last Name"
                className="p-3 sm:p-4"
                disabled
                rounded
              />
            </div>
  
            {userInfo.location && (
              <FormInput
                label="Location"
                value={userInfo.location}
                disabled
                rounded
                className="p-3 sm:p-4"
              />
            )}
  
            <FormInput
              label="Email"
              value={userInfo.email}
              type="email"
              rounded
              disabled
              className="p-3 sm:p-4"
            />
  
            <FormInput
              label="Password"
              value="••••••••••"
              type="password"
              className="p-3 sm:p-4"
              disabled
              rounded
            />
  
            <ButtonComponent className="w-full sm:w-auto">Reset password</ButtonComponent>
          </div>
        </div>
      </section>
    );
  };
  
  export default UserAccount;