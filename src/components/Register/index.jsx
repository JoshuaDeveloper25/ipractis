import { ChevronRightDoorIcon, PadLockUserIcon } from "../Icons";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import AccountPrompt from "../Globals/AccountPrompt";
import TopColumn from "./TopColumn";

export const Register = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4 rounded-[32px]">
        {/* Create an account if the user doesn't have one */}
        <TopColumn />

        {/* Login if user have an account */}
        <AccountPrompt
          titleText={`You already have an account?`}
          linkButtonStyles={"!p-1.5 flex justify-center items-center"}
          descText={'Press on "Log in" to access to your account.'}
          accountPromptPosition="vertical"
          titleIcon={<PadLockUserIcon />}
          btnColor={"btn-primary"}
          hrefLink={"/login"}
          textLink={
            <>
              <span className="flex-1">Log in</span>

              <InputBGWrapperIcon>
                <ChevronRightDoorIcon
                  fillColor={
                    "fill-primary-color-P1"
                  }
                />
              </InputBGWrapperIcon>
            </>
          }
        />
      </div>
    </section>
  );
};
