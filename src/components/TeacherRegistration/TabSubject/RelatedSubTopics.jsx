import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { subSubjects } from "@/src/data/dataTeacherRegistration";
import SectionHeader from "../../Shared/SectionHeader";
import SubSubject from "./SubSubject";

// External imports
import { useFieldArray, Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useState } from "react";

// Images && icons
import { ChevronDownBigIcon, QuestionMark, TagIcon } from "../../Icons";

const RelatedSubTopics = ({
  frontEndErrors,
  backEndErrors,
  control,
  watch,
}) => {
  const {
    fields: subSubjectsFields,
    append,
    remove,
    update,
  } = useFieldArray({ control, name: "subSubject" });
  const [isOpen, setIsOpen] = useState(false);

  // Add sub-subject
  const handleAddSubSubject = (e) => {
    const subSubjectSelected = e?.target?.value;

    append({
      selected: subSubjectSelected,
      description: "",
    });
  };

  // Delete sub-subject
  const handleDeleteSelectedSubSuject = (index) => {
    remove(index);
  };

  // Update description text
  const handleUpdateSubSubject = (index, updatedSubSubject) => {
    update(index, updatedSubSubject);
  };

  return (
    <div className="flex-1">
      <SectionHeader
        descriptionText="Highlight your teaching methods and the subtopics you've mastered."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px] my-16"
        titleIcon={<TagIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Choose your specialties"
        titleClassName="MT-SB-1"
      />

      <Controller
        name="subSubject"
        control={control}
        render={({ field: { value, onBlur }, fieldState: { error } }) => (
          <div className="md:px-8">
            <div className="space-y-[50px]">
              {/* Select Sub-subject */}
              <div className="grid md:grid-cols-2 grid-cols-1">
                <InputLeftStickStatus
                  inputBarStatusClassName={`${getLeftStickInputColorStatus(
                    frontEndErrors,
                    backEndErrors,
                    watch("subSubject"),
                    "subSubject"
                  )} top-[54%] -translate-y-0`}
                >
                  <div className="flex items-end gap-2">
                    <Select
                      name="subSubject"
                      label={
                        <div className="flex flex-col mb-2">
                          <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                            Related sub topics{" "}
                            <QuestionMark fillColor={"fill-primary-color-P4"} />
                          </span>
                          <div className="self-start">
                            <span className="text-primary-color-P4 ST-3">
                              Sub topics allow you to match with students needs.
                            </span>
                          </div>
                        </div>
                      }
                      selectedKeys={value}
                      onChange={(e) => handleAddSubSubject(e)}
                      onOpenChange={(open) => {
                        setIsOpen(open);

                        if (!open) {
                          onBlur();
                        }
                      }}
                      labelPlacement="outside"
                      placeholder="Select a sub-subject"
                      selectorIcon={<span></span>}
                      isOpen={isOpen}
                      startContent={
                        <InputBGWrapperIcon>
                          <TagIcon fillColor={"fill-primary-color-P4"} />
                        </InputBGWrapperIcon>
                      }
                      endContent={
                        <InputBGWrapperIcon>
                          <ChevronDownBigIcon
                            fillColor={"fill-primary-color-P1"}
                          />
                        </InputBGWrapperIcon>
                      }
                      classNames={{
                        trigger: "px-1 py-1.5 h-auto",
                        innerWrapper: ["select-ipractis", "w-full"],
                        value: [
                          "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                        ],
                        listbox: ["text-primary-color-P4"],
                      }}
                    >
                      {subSubjects
                        ?.filter(
                          (subSubject) =>
                            !subSubjectsFields.some(
                              (field) => field.selected === subSubject
                            )
                        )
                        .map((subSubject) => (
                          <SelectItem key={subSubject}>{subSubject}</SelectItem>
                        ))}
                    </Select>
                  </div>
                </InputLeftStickStatus>
              </div>

              {/* Selected Sub-subjects */}
              {subSubjectsFields.map((field, index) => (
                <SubSubject
                  handleDeleteSelectedSubSuject={handleDeleteSelectedSubSuject}
                  handleUpdateSubSubject={handleUpdateSubSubject}
                  frontEndErrors={frontEndErrors}
                  name={"subSubject"}
                  subSubject={field}
                  control={control}
                  key={field.id}
                  index={index}
                />
              ))}
            </div>

            <SplitDynamicErrorZod message={error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default RelatedSubTopics;
