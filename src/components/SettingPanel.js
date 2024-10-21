import ButtonComponent from "./reusable/Button";
import FormInput from "./reusable/InputField";
import PictureUpload from "./reusable/ProfilePhotoUpload";
import { Link } from "react-router-dom";

const SettingPanel = () => {
    return (
        <section className="w-full h-full bg-white rounded-3xl mb-[32px] shadow-md border">
          <div className="lg:w-full lg:py-[128px] lg:px-[64px] lg:mx-auto h-full px-4 pb-6 pt-12 sm:px-6 lg:pb-0">
            <div className="flex items-center justify-center mb-6">
              <PictureUpload />
            </div>
            {/* <FormInput
              label="Current Password"
            placeholder="..........."
            value={passwordCurrent}
            onChange={(e) => setDPassword(e.target.value)}
            required
              className="p-3 sm:p-4 h-fit"
              rounded
              disabled
          />
          <FormInput
              label="New Password"
            placeholder="..........."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
              className="p-3 sm:p-4 h-fit"
              rounded
              disabled
          />
        <FormInput
          label="Confirm New Password"
          type="password"
          value={newConfirmPassword}
          onChange={(e) => setNewConfirmPassword(e.target.value)}
          required
          autoComplete="password"
          className={error ? "border-rose-400 border-[1px]" : ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center items-center">
          <ButtonComponent
            variant={"primary"}
            className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
            type="submit"
            disabled={status === "loading" || status === "succeded"}
          >
            {status === "loading" ? <LoadingSpinner /> : "Login"}
          </ButtonComponent>
        </div> */}
            
          </div>
        </section>
      );
}

export default SettingPanel;