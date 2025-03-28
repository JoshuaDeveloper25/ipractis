import AccountPrompt from "../Shared/AccountPrompt";
import WrapperForm from "./WrapperForm";

// Icons
import { UserAddIcon } from "../Icons";

export const Login = () => {
  return (
    <section className="container-page-v8 sm:px-0 px-8">
      <div className="sm:my-8 my-4">
        {/* Login if there's an account */}
        <WrapperForm />

        {/* Register if user doesn't have an account */}
        <AccountPrompt
          descText={'Press on "Register" to create your account.'}
          titleText={`You don't have an account yet?`}
          headerContainerClassName={"px-4"}
          titleIcon={<UserAddIcon />}
          btnColor={"btn-primary"}
          hrefLink={"/register"}
          textLink={"Register"}
          additionalText={
            <p className="ST-1 text-primary-color-P4 mt-8 px-4">
              By logging in or creating an account, you agree to iPractis&apos;s
              Terms of Service and Privacy Policy.
            </p>
          }
        />
      </div>
    </section>
  );
};
