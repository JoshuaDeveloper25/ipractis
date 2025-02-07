import CustomNextUiTextarea from "../../Globals/CustomNextUiTextarea";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";

// Next ui imports
import {
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";

// Icons
import {
  CalendarAddIcon,
  CalendarCloseIcon,
  CheckedDocumentIcon,
  ChevronDownIcon,
  LuggageBiggerIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
} from "../../Icons";
import { CalendarDate } from "@internationalized/date";

import { ErrorMultipleZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputMultipleErrorZod } from "@/src/lib/utils/getZodValidations";
import { useState } from "react";

const IndividualExperience = ({
  handleDeleteExperience,
  handleUpdateExperience,
  experience,
  errors,
  index,
}) => {
  const [image, setImage] = useState({});
  const certainExperiencePosition = experience?.index === index;

  const handleInputChange = (field, value) => {
    const updatedExperience = { ...experience, [field]: value };
    handleUpdateExperience(index, updatedExperience);
  };

  return (
    <div className="mb-8">
      {/* Input of company, download, and recycle bin */}
      <div className="flex gap-2.5">
        <div className="flex-[70%]">
          <CustomNextUiInput
            value={experience?.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            type="text"
            name="company"
            placeholder="Example: Google"
            startContent={
              <InputBGWrapperIcon>
                <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            classNames={{
              inputWrapper:
                certainExperiencePosition &&
                findInputMultipleErrorZod(errors, "company", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        <div className="flex-1">
          <button type="button" className="relative">
            <input
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
              accept=".pdf, image/png, image/jpeg"
              name="uploadExperienceFile"
              type="file"
            />

            <InputBGWrapperIcon
              className={
                "btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px] cursor-pointer"
              }
            >
              {image?.name ? (
                <CheckedDocumentIcon fillColor={"fill-primary-color-P4"} />
              ) : (
                <TopArrowCloudIcon fillColor={"fill-primary-color-P4"} />
              )}
            </InputBGWrapperIcon>
          </button>
        </div>

        <div className="flex-1">
          <button type="button" onClick={() => handleDeleteExperience(index)}>
            <InputBGWrapperIcon
              className={
                "btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px]"
              }
            >
              <TrashBinIcon
                strokeColor={"stroke-primary-color-P4"}
                fillColor={"fill-primary-color-P4"}
              />
            </InputBGWrapperIcon>
          </button>
        </div>
      </div>

      {certainExperiencePosition && (
        <ErrorMultipleZodResponse
          fieldName={"company"}
          errors={errors}
          pathIndex={2}
        />
      )}

      {/* Calendars FROM and TO */}
      <div className="flex items-center gap-2.5 my-2.5">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-[50%]">
              <CustomNextUiInput
                isReadOnly
                type="text"
                value={experience?.from}
                name="from"
                placeholder="From"
                className="pointer-events-none"
                startContent={
                  <InputBGWrapperIcon>
                    <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
                  </InputBGWrapperIcon>
                }
                classNames={{
                  inputWrapper:
                    certainExperiencePosition &&
                    findInputMultipleErrorZod(errors, "from", 2)?.message &&
                    "form-input-error",
                }}
              />
            </div>

            <div className="flex-1">
              <Dropdown
                classNames={{
                  content: "p-0",
                }}
                closeOnSelect={false}
              >
                <DropdownTrigger>
                  <Button
                    className="border-0 min-w-fit bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 rounded-2xl"
                    variant="flat"
                    type="button"
                  >
                    <ChevronDownIcon fillColor={"fill-primary-color-P4"} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  className="p-0 h-0"
                  itemClasses={{
                    base: "data-[hover=true]:bg-transparent",
                  }}
                >
                  <DropdownItem className="p-0">
                    <Calendar
                      onChange={(date) => {
                        let validDate = new CalendarDate(
                          date?.year,
                          date?.month,
                          date?.day
                        );

                        handleInputChange("from", validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {certainExperiencePosition && (
            <ErrorMultipleZodResponse
              fieldName={"from"}
              errors={errors}
              pathIndex={2}
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-[50%]">
              <CustomNextUiInput
                isReadOnly
                type="text"
                name="to"
                placeholder="To"
                value={experience?.to}
                className="pointer-events-none"
                startContent={
                  <InputBGWrapperIcon>
                    <CalendarCloseIcon fillColor={"fill-primary-color-P4"} />
                  </InputBGWrapperIcon>
                }
                classNames={{
                  inputWrapper:
                    certainExperiencePosition &&
                    findInputMultipleErrorZod(errors, "to", 2)?.message &&
                    "form-input-error",
                }}
              />
            </div>

            <div className="flex-1">
              <Dropdown
                classNames={{
                  content: "p-0",
                }}
                closeOnSelect={false}
              >
                <DropdownTrigger>
                  <Button
                    className="border-0 min-w-fit bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 rounded-2xl"
                    variant="flat"
                    type="button"
                  >
                    <ChevronDownIcon fillColor={"fill-primary-color-P4"} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  className="p-0 h-0"
                  itemClasses={{
                    base: "data-[hover=true]:bg-transparent",
                  }}
                >
                  <DropdownItem className="p-0">
                    <Calendar
                      onChange={(date) => {
                        let validDate = new CalendarDate(
                          date?.year,
                          date?.month,
                          date?.day
                        );

                        handleInputChange("to", validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {certainExperiencePosition && (
            <ErrorMultipleZodResponse
              fieldName={"to"}
              errors={errors}
              pathIndex={2}
            />
          )}
        </div>
      </div>

      {/* Enter a text */}
      <CustomNextUiTextarea
        value={experience?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        classNames={{
          inputWrapper:
            certainExperiencePosition &&
            findInputMultipleErrorZod(errors, "description", 2)?.message &&
            "form-input-error",
          input: "h-[150px]",
        }}
        placeholder="Enter a text"
        size="primaryiPractis"
        name="description"
        disableAutosize
      />

      {certainExperiencePosition && (
        <ErrorMultipleZodResponse
          fieldName={"description"}
          pathIndex={2}
          errors={errors}
        />
      )}
    </div>
  );
};

export default IndividualExperience;
