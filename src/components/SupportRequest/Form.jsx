"use client";

import { supportRequestIssue } from "@/src/lib/actions/authAction";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import DescribeYourIssue from "./DescribeYourIssue";
import DualButton from "../Shared/DualButton";
import ContactID from "./ContactID";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

// Icons
import { ChevronRightBiggerIcon } from "../Icons";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const [backEndErrors, setBackEndErrors] = useState("");
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    try {
      const response = await supportRequestIssue(data);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setBackEndErrors({
          message: response.message,
          title: response.title,
        });
      } else {
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 mt-[50px]">
      <ContactID
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <DescribeYourIssue
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <DualButton
        leftButtonText={"Cancel"}
        leftButtonHref={"/account-assistance"}
        leftButtonClassName={"disabled:opacity-20 disabled:pointer-events-none"}
        customSubmitButton={
          <ButtonSubmitForm
            buttonClassName={
              "btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4 disabled:opacity-20 disabled:pointer-events-none"
            }
            ref={buttonRef}
          >
            Send
          </ButtonSubmitForm>
        }
      />
    </form>
  );
};

export default Form;
