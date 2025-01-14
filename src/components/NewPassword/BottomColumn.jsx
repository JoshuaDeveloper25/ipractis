import SectionHeader from "@/src/components/Globals/SectionHeader";
import { PadLockClosedIcon } from "../Icons";
import { Suspense } from "react";
import Form from "./Form";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Please enter your new password to access your account.`}
        titleIcon={
          <PadLockClosedIcon
            fillColor={"fill-primary-color-P1"}
            versionIcon={2}
          />
        }
        titleText={`Make a new password`}
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
      />

      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
};

export default BottomColumn;
