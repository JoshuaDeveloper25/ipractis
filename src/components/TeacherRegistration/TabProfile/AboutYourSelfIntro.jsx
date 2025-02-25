import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";

const AboutYourSelfIntro = ({
  errors,
  introText,
  setIntroText,
  findInputErrorZod,
}) => {
  const introTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) return setIntroText(textValue);
  };

  return (
    <div className="!mt-9">
      <CustomNextUiTextareaWithMaxLength
        value={introText}
        nameTextarea="introduction"
        inputClassName={"h-[150px]"}
        onChange={introTextOnChange}
        placeholder={"Enter a text"}
        maxCharactersLength={1000}
        typeError={"Max Length Exceeded"}
        descError={"The text cannot exceed 1000 characters."}
        labelTitle={"Write Introduction about yourself"}
        labelSubtitle={
          "Introduce yourself and highlight your unique interests."
        }
        backgroundError={findInputErrorZod(errors, "introduction")?.message}
      />

      <ErrorZodResponse errors={errors} fieldName={"introduction"} />
    </div>
  );
};

export default AboutYourSelfIntro;
