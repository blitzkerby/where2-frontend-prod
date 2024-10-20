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
            <FormInput
              label="Password"
              placeholder="..........."
              className="p-3 sm:p-4 h-fit"
              rounded
              disabled
                />
                <div className="p-2 flex items-center justify-center pb-[128px]">
                    <Link to={'/reset-password/:token'}>
                    <ButtonComponent
                variant={"primary"}
                className="mt-12 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px] mx-2 "
                type="submit"
            >
            Reset Password
                        </ButtonComponent>
                    </Link>  
                    <Link to={'/'}>
                    <ButtonComponent
                variant={"danger"}
                className="mt-12 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
                type="submit"
            >
            Delete Account
                        </ButtonComponent>
                    </Link> 
                    
                </div>
            
          </div>
        </section>
      );
}

export default SettingPanel;