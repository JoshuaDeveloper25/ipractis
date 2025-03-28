import SectionHeader from "../../Shared/SectionHeader";
import HowWorksAndSkills from "./HowWorksAndSkills";
import { AnalyticIcon } from "../../Icons";

const TabStatus = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 5 && "hidden"}`}>
      <SectionHeader
        descriptionText={"Your application is currently pending approval. We appreciate your patience and will notify you as soon as your application has been reviewed. Feel free to edit your profile to improve it."}
        titleIcon={<AnalyticIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={
          "bg-primary-color-P11 rounded-[32px] p-8 mb-[50px]"
        }
        titleText="Your application is waiting for approval"
        titleClassName="MT-SB-1"
      />

      <HowWorksAndSkills />
    </div>
  );
};

export default TabStatus;
