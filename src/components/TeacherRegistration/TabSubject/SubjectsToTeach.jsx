import { teachingSubjects } from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { Select, SelectItem } from "@nextui-org/react";
import ProfileTitle from "./ProfileTitle";
import { useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  NotebookOpenedIconBigger,
  QuestionMark,
} from "../../Icons";

const SubjectsToTeach = () => {
  const [isOpen, setIsOpen] = useState();

  return (
    <div className="flex-1 w-full space-y-[50px]">
      {/* Select subject to teach */}
      <div className="flex items-end gap-2 mt-7">
        <Select
          name="subjectToTeach"
          label={
            <div className="flex flex-col mb-2">
              <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                Select the subject you wish to teach{" "}
                <QuestionMark fillColor={"fill-primary-color-P4"} />
              </span>

              <div className="self-start">
                <span className=" text-primary-color-P4 ST-3">
                  You can teach only one subject.
                </span>
              </div>
            </div>
          }
          onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
          labelPlacement="outside"
          placeholder="Select a teaching subject"
          selectorIcon={<span></span>}
          isOpen={isOpen}
          startContent={
            <InputBGWrapperIcon>
              <NotebookOpenedIconBigger fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon>
              <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
            </InputBGWrapperIcon>
          }
          classNames={{
            trigger: ["select-wrapper-ipractis"],
            innerWrapper: ["select-ipractis", "w-full"],
            value: [
              "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
            ],
            listbox: ["text-primary-color-P4"],
          }}
        >
          {teachingSubjects?.map((teachingSubject) => (
            <SelectItem key={teachingSubject}>{teachingSubject}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Profile title and description */}
      <ProfileTitle />
    </div>
  );
};

export default SubjectsToTeach;