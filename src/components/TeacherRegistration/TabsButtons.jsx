import {
  tabAvailabilityFields,
  sectionHeaderContent,
  tabBackgroundFields,
  tabProfileFields,
  tabSubjectFields,
  tabsButtons,
} from "@/src/data/dataTeacherRegistration";

import { ChevronRightBiggerIcon, DocumentIcon } from "../Icons";
import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import SectionHeader from "../Globals/SectionHeader";

const TabsButtons = ({ activeTab, setActiveTab, setSaved, saved, draft }) => {
  const unCompletedTabProfile = Object.values(tabProfileFields(draft)).includes(
    ""
  );
  const unCompletedTabSubject = Object.values(tabSubjectFields(draft)).includes(
    ""
  );
  const unCompletedTabBackground = Object.values(
    tabBackgroundFields(draft)
  ).includes("");
  const unCompletedTabAvailability = Object.values(
    tabAvailabilityFields(draft)
  ).includes("");

  console.log(unCompletedTabProfile)
  console.log(tabProfileFields(draft))

  return (
    <section>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-SB-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => {
              setActiveTab(TabIndex);
              setSaved(false);
            }}
          >
            <span
              className={`p-1 rounded-[10px] ${
                activeTab === TabIndex
                  ? "bg-tertiary-color-SC5"
                  : unCompletedTabProfile && TabIndex === 0
                  ? "bg-quaternary-color-A6"
                  : unCompletedTabSubject && TabIndex === 1
                  ? "bg-quaternary-color-A6"
                  : unCompletedTabBackground && TabIndex === 2
                  ? "bg-quaternary-color-A6"
                  : unCompletedTabAvailability && TabIndex === 3
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

            <span className="md:block hidden font-bold">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      {saved ? (
        <>
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
                onClick={() => {
                  setActiveTab(4);
                  setSaved(false);
                }}
                type="button"
              >
                <span className="px-1.5">Apply now!</span>{" "}
                <InputBGWrapperIcon>
                  <ChevronRightBiggerIcon
                    fillColor={"fill-tertiary-color-SC5"}
                  />
                </InputBGWrapperIcon>
              </button>
            </div>
          </SectionHeader>
        </>
      ) : (
        <SectionHeader
          wrapperSectionHeaderClassName={`p-8 rounded-[22px] ${
            activeTab === 4
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
