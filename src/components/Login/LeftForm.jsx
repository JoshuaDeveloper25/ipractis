import CustomNextUiInput from "../Globals/CustomNextUiInput";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import Image from "next/image";

// Images && icons
import microsoft from "@/public/icons/microsoft-original.png";
import passwordInput from "@/public/icons/password-input.png";
import google from "@/public/icons/google-original.png";
import userInput from "@/public/icons/user-input.png";
import apple from "@/public/icons/apple.png";

const LeftForm = ({ error, isPending }) => {
  const validPasswordErrors = [
    "Wrong password",
    "Account Locked: Too many login attempts",
    "Character limit",
  ];

  const validEmailErrors = [
    "Invalid Email",
    "No account exists for this email address.",
    "Email recently changed",
  ];
  
  const isValidEmailError = error?.message && validEmailErrors.includes(error?.title);
  const isValidPasswordError = error?.message && validPasswordErrors.includes(error?.title);

  return (
    <div className="space-y-8">
      <div className="flex gap-3 sm:mt-[50px] mt-8">
        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          type="button"
        >
          <Image
            alt="Google Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={google}
          />
        </button>

        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          type="button"
        >
          <Image
            alt="Microsoft Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={microsoft}
          />
        </button>

        <button
          className="btn w-full py-3 px-4 bg-primary-color-P11 hover:bg-secondary-color-S9 rounded-2xl"
          type="button"
        >
          <Image
            alt="Apple Original Icon"
            className="mx-auto w-[22px] h-[22px] object-contain"
            src={apple}
          />
        </button>
      </div>

      <div>
        {/* Email Input */}
        <div>
          <CustomNextUiInput
            type="text"
            name="email"
            placeholder="Enter your phone or email address"
            startContent={
              <Image className="w-9" src={userInput} alt="User Input" />
            }
            classNames={{
              inputWrapper: isValidEmailError && "form-input-error",
            }}
          />

          {isValidEmailError && (
            <ErrorMessageiPractis
              typeError={error?.title}
              descError={error?.message}
            />
          )}
        </div>

        {/* Password Input */}
        <div className="mt-3">
          <CustomNextUiInput
            type="password"
            name="password"
            maxLength={32}
            placeholder="Enter your password"
            startContent={
              <Image className="w-9" src={passwordInput} alt="User Input" />
            }
            classNames={{
              inputWrapper: isValidPasswordError && "form-input-error",
            }}
          />

          {isValidPasswordError && (
            <ErrorMessageiPractis
              typeError={error?.title}
              descError={error?.message}
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
      >
        {isPending ? "Loading..." : "Log in"}
      </button>

      <p className="text-primary-color-P4 text-center ST-4">
        I can’t sing in, help!
      </p>
    </div>
  );
};

export default LeftForm;
