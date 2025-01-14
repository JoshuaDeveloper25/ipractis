"use client";

import { PadLockUserIcon, SparkleIcon } from "../Icons";
import { logInUser } from "@/src/lib/actions/authAction";
import SectionHeader from "../Globals/SectionHeader";
import LeftForm from "./LeftForm";

// React imports
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContainerForm = () => {
  const [toggleInput, setToggleInput] = useState("email");
  const [isPending, setIsPending] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user chooses email we're gonna get the EMAIL INPUT (ignore phone number)
    if (toggleInput === "email") {
      const email = e?.target?.email?.value.trim();

      // Validation of empty field (email)
      if (!email) {
        const invalidEmailError = {
          title: "Invalid Email",
          message: "Email can't be empty.",
        };

        return setError(invalidEmailError);
      }

      // Validation of gmail format
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

      if (!gmailRegex.test(email)) {
        const invalidEmailError = {
          title: "Invalid Email",
          message: "Check your spelling email",
        };

        return setError(invalidEmailError);
      }
    } else {
      // If user chooses number we're gonna get the PHONE NUMBER INPUT (ignore email)
      const number = e?.target?.number?.value?.trim();

      // Validation of empty field (phone number)
      if (!number.trim(" ")) {
        const invalidPhoneNumberError = {
          title: "Invalid Phone Number",
          message: "Phone number can't be empty.",
        };

        return setError(invalidPhoneNumberError);
      }
    }

    // Validation of empty field (password)
    if (!password) {
      const invalidEmailError = {
        title: "Invalid Password",
        message: "Password can't be empty.",
      };

      return setError(invalidEmailError);
    }

    // Validation of exceed the character limit (password)
    if (password?.length > 30) {
      const invalidPasswordError = {
        title: "Character limit",
        message: "The input exceeds the allowed character limit.",
      };

      return setError(invalidPasswordError);
    }

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      const response = await logInUser(formData);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
      } else {
        router.push(`/authenticator?email=${formData.get("email")}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword.replace(/\s/g, ""));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Heading Title */}
      <div>
        <SectionHeader
          descriptionText="Sign in to continue your journey with iPractis."
          wrapperSectionHeaderClassName={
            "bg-primary-color-P11 rounded-[32px] p-8"
          }
          titleIcon={<SparkleIcon />}
          titleClassName="MT-SB-1"
          titleText="Welcome back"
        />
      </div>

      {/* Log In Section */}
      <div className="bg-primary-color-P12 sm:px-8 rounded-2xl sm:mt-[50px] mt-8">
        <SectionHeader
          descriptionText="Enter your account details to access to your account."
          titleIcon={<PadLockUserIcon />}
          descriptionClassName="mt-1"
          titleClassName="MT-SB-1"
          titleText="Log in"
        />

        <LeftForm
          setToggleInput={setToggleInput}
          toggleInput={toggleInput}
          handlePasswordChange={handlePasswordChange}
          password={password}
          error={error}
          isPending={isPending}
        />
      </div>
    </form>
  );
};

export default ContainerForm;
