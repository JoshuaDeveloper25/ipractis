import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import WhiteSpaceWrapper from "../../Shared/WhiteSpaceWrapper";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";

import PersonalInfoNationalitySelect from "./PersonalInfoNationalitySelect";
import PersonalInfoCountrySelect from "./PersonalInfoCountrySelect";
import PersonalInfoGenderCheck from "./PersonalInfoGenderCheck";
import AboutYourSelfIntro from "./AboutYourSelfIntro";
import BirthDateInput from "./BirthDateInput";

// External imports
import { useController } from "react-hook-form";

// Icons
import {
  FlagIcon,
  QuestionMark,
  ThreeUsersIcon,
  UserBigIcon,
  UserIcon,
} from "../../Icons";

const PersonalInfo = ({ control, errors, watch }) => {
  const {
    field: firstName,
    fieldState: { error: firstNameError },
  } = useController({
    name: "firstName",
    control: control,
  });

  const { field: middleName } = useController({
    name: "middleName",
    control: control,
  });

  const {
    field: lastName,
    fieldState: { error: lastNameError },
  } = useController({
    name: "lastName",
    control: control,
  });

  const {
    field: countryField,
    fieldState: { error: countryFieldError },
  } = useController({
    control,
    name: "country",
  });

  const {
    field: nationalityField,
    fieldState: { error: nationalityFieldError },
  } = useController({
    control,
    name: "nationality",
  });

  console.log(countryField, "campo de country");
  console.log(nationalityField, "campo de nationality");

  return (
    <WhiteSpaceWrapper className={"p-0"}>
      <SectionHeader
        descriptionText="Fill in your basic details to complete your profile."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Personal Informations"
        titleClassName="MT-SB-1"
      />

      <div className="md:px-8 mt-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[50px]">
          <div className="space-y-12">
            {/* Firstname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  firstName?.value,
                  "firstName"
                )}
              >
                <CustomNextUiInput
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  label={
                    <span className="flex gap-1.5 items-center">
                      First name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    inputWrapper: firstNameError?.message && "form-input-error",
                  }}
                  onBlur={firstName.onBlur}
                  onChange={firstName.onChange}
                  value={firstName.value}
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={firstNameError?.message} />
            </div>

            {/* Middlename */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  middleName?.value,
                  "middleName",
                  false
                )}
              >
                <CustomNextUiInput
                  name="middleName"
                  type="text"
                  placeholder="Enter your middle name (Optional)"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Middle name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserBigIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  onChange={middleName.onChange}
                  value={middleName.value}
                />
              </InputLeftStickStatus>
            </div>

            {/* Lastname */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  lastName?.value,
                  "lastName"
                )}
              >
                <CustomNextUiInput
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Last name{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  labelPlacement="outside"
                  startContent={
                    <InputBGWrapperIcon>
                      <ThreeUsersIcon fillColor={"fill-primary-color-P1"} />
                    </InputBGWrapperIcon>
                  }
                  classNames={{
                    inputWrapper: lastNameError?.message && "form-input-error",
                  }}
                  onBlur={lastName.onBlur}
                  onChange={lastName.onChange}
                  value={lastName.value}
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={lastNameError?.message} />
            </div>

            {/* Birthdate inputs (3) */}
            <BirthDateInput control={control} errors={errors} />
          </div>

          <div className="space-y-12">
            {/* Country of residence */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  countryField?.value,
                  "country"
                )}
              >
                <CustomNextUiInput
                  type="text"
                  isReadOnly
                  placeholder="Select a country"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Country{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  classNames={{
                    inputWrapper:
                      countryFieldError?.message && "form-input-error",
                  }}
                  onBlur={countryField?.onBlur}
                  onChange={countryField?.onChange}
                  name="country"
                  labelPlacement="outside"
                  startContent={
                    <span className="flex items-center gap-1.5">
                      <InputBGWrapperIcon>
                        <FlagIcon />
                      </InputBGWrapperIcon>

                      <PersonalInfoCountrySelect countryField={countryField} />
                    </span>
                  }
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={countryFieldError?.message} />
            </div>

            {/* Country of nationality */}
            <div>
              <InputLeftStickStatus
                inputBarStatusClassName={getInputStatusBorder(
                  errors,
                  nationalityField?.value,
                  "nationality"
                )}
              >
                <CustomNextUiInput
                  type="text"
                  isReadOnly
                  placeholder="Select a country"
                  label={
                    <span className="flex gap-1.5 items-center">
                      Nationality{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>
                  }
                  classNames={{
                    inputWrapper:
                      nationalityFieldError?.message && "form-input-error",
                  }}
                  labelPlacement="outside"
                  onBlur={nationalityField?.onBlur}
                  onChange={nationalityField?.onChange}
                  name="nationality"
                  startContent={
                    <span className="flex items-center gap-1.5">
                      <InputBGWrapperIcon>
                        <FlagIcon />
                      </InputBGWrapperIcon>

                      <PersonalInfoNationalitySelect
                        nationalityField={nationalityField}
                      />
                    </span>
                  }
                />
              </InputLeftStickStatus>

              <SplitDynamicErrorZod message={nationalityFieldError?.message} />
            </div>

            {/* Gender checkboxes */}
            <PersonalInfoGenderCheck
              control={control}
              errors={errors}
              watch={watch}
            />
          </div>
        </div>

        {/* Introduction about yourself */}
        <AboutYourSelfIntro control={control} errors={errors} />
      </div>
    </WhiteSpaceWrapper>
  );
};

export default PersonalInfo;
