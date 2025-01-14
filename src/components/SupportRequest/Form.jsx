"use client";

import { supportRequestIssue } from "@/src/lib/actions/authAction";
import DualButton from "../Globals/DualButton";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";

// React imports
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation of gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Check if reason select is NOT empty
    if (!e?.target?.reason?.value) {
      const invalidReasonError = {
        message: "Please, include a reason of the problem.",
        title: "Invalid Reason",
      };

      return setError(invalidReasonError);
    }

    // Check if email isn't empty
    if (!e?.target?.email?.value) {
      const invalidEmailError = {
        message: "Email can't be empty.",
        title: "Invalid Email",
      };

      return setError(invalidEmailError);
    }

    if (!gmailRegex.test(e?.target?.email?.value)) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Check your spelling email",
      };

      return setError(invalidEmailError);
    }

    // Check if email_related isn't empty
    if (!e?.target?.emailRelated?.value) {
      const invalidEmailError = {
        message: "Email can't be empty.",
        title: "Invalid Email Related",
      };

      return setError(invalidEmailError);
    }

    if (!gmailRegex.test(e?.target?.emailRelated?.value)) {
      const invalidEmailError = {
        title: "Invalid Email Related",
        message: "Check your spelling email",
      };

      return setError(invalidEmailError);
    }

    // Check if situation input is NOT empty
    if (!e?.target?.situation?.value.trim(" ")) {
      const invalidSituationError = {
        message: "Please, describe the situation of the problem.",
        title: "Invalid Situation",
      };

      return setError(invalidSituationError);
    }

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      formData.append("uploaded_image", e?.target?.upload_image?.files[0]);

      const response = await supportRequestIssue(formData);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
      } else {
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const validSituationErrors = ["Invalid Situation"];
  const validEmailErrors = ["Invalid Email"];
  const validEmailRelatedErrors = ["Invalid Email Related"];
  const validReasonErrors = ["Invalid Reason"];

  const isValidSituationError =
    error?.message && validSituationErrors.includes(error?.title);
  const isValidReasonErrors =
    error?.message && validReasonErrors.includes(error?.title);
  const isValidEmailErrors =
    error?.message && validEmailErrors.includes(error?.title);
  const isValidEmailRelatedErrors =
    error?.message && validEmailRelatedErrors.includes(error?.title);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-color-P12 p-8 mt-8 rounded-2xl"
    >
      <div className="flex flex-col md:flex-row sm:gap-[50px]">
        <LeftColumn
          isValidEmailRelatedErrors={isValidEmailRelatedErrors}
          isValidReasonErrors={isValidReasonErrors}
          isValidEmailErrors={isValidEmailErrors}
          error={error}
        />

        <RightColumn
          isValidSituationError={isValidSituationError}
          error={error}
        />
      </div>

      <DualButton
        leftButtonText={"Cancel"}
        rightButtonDisabled={isPending}
        rightButtonText={isPending ? "Loading..." : "Send"}
        rightButtonType={"submit"}
      />
    </form>
  );
};

export default Form;
