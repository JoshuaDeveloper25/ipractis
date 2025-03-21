import { hasIncompleteFields } from "@/src/lib/utils/hasIncompleteFields";
import {
  tabAvailabilityFields,
  sectionHeaderContent,
  tabBackgroundFields,
  tabProfileFields,
  tabSubjectFields,
  tabsButtons,
} from "@/src/data/dataTeacherRegistration";

import { ChevronRightBiggerIcon, DocumentIcon } from "../Icons";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import SectionHeader from "../Shared/SectionHeader";

const TabsButtons = ({ activeTab, setActiveTab, draft }) => {
  const completedTabProfile = hasIncompleteFields(tabProfileFields, draft);
  const completedTabSubject = hasIncompleteFields(tabSubjectFields, draft);
  const completedTabBackground = hasIncompleteFields(tabBackgroundFields, draft);
  const completedTabAvailability = hasIncompleteFields(tabAvailabilityFields, draft);

  const allTabsCompleted = !completedTabProfile && !completedTabSubject && !completedTabBackground && !completedTabAvailability;

  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
          >
            {completedTabSubject && TabIndex === 1}
            <span
              className={`p-1 rounded-[10px] ${
                activeTab === TabIndex
                  ? "bg-tertiary-color-SC5"
                  : completedTabProfile && TabIndex === 0
                  ? "bg-quaternary-color-A6"
                  : completedTabSubject && TabIndex === 1
                  ? "bg-quaternary-color-A6"
                  : completedTabBackground && TabIndex === 2
                  ? "bg-quaternary-color-A6"
                  : completedTabAvailability && TabIndex === 3
                  ? "bg-quaternary-color-A6"
                  : !allTabsCompleted && TabIndex === 4
                  ? "bg-quaternary-color-A6"
                  : !allTabsCompleted && TabIndex === 5
                  ? "bg-quaternary-color-A6"
                  : "bg-quinary-color-VS6"
              }`}
            >
              <TabButton.Icon
                fillColor={
                  activeTab === TabIndex
                    ? "fill-primary-color-P12"
                    : "fill-primary-color-P1"
                }
              />
            </span>

            <span className="md:block hidden">{TabButton?.textButton}</span>
          </button>
        ))}
      </div>

      {activeTab === 4 ? (
        <SectionHeader
          wrapperSectionHeaderClassName={`flex flex-col md:flex-row sm:items-center items-start md:gap-[70px] gap-4 p-8 rounded-[22px] bg-tertiary-color-SC11 MT-1`}
          descriptionText={sectionHeaderContent[2]?.descriptionText}
          titleText={sectionHeaderContent[2]?.titleText}
          descriptionClassName={"mt-[4px]"}
          titleIcon={<DocumentIcon />}
          titleClassName="MT-SB-1"
        >
          <div className="flex-1 w-full">
            <button
              className="btn btn-secondary flex justify-between items-center gap-2.5 p-1.5 ps-4 rounded-2xl w-full MT-SB-1"
              onClick={() => setActiveTab(5)}
              type="button"
            >
              <span className="px-1.5">Apply now!</span>{" "}
              <InputBGWrapperIcon>
                <ChevronRightBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
              </InputBGWrapperIcon>
            </button>
          </div>
        </SectionHeader>
      ) : (
        <SectionHeader
          wrapperSectionHeaderClassName={`p-8 rounded-[22px] ${
            activeTab === 5
              ? "bg-quinary-color-VS10"
              : "bg-quaternary-color-A10"
          }`}
          descriptionText={
            activeTab < 4
              ? sectionHeaderContent[0]?.descriptionText
              : sectionHeaderContent[1]?.descriptionText
          }
          titleText={
            activeTab < 4
              ? sectionHeaderContent[0]?.titleText
              : sectionHeaderContent[1]?.titleText
          }
          descriptionClassName={"mt-[4px]"}
          titleIcon={<DocumentIcon />}
          titleClassName="MT-SB-1"
        />
      )}
    </section>
  );
};

export default TabsButtons;
