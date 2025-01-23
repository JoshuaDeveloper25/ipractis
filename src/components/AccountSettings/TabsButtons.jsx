import InputBGWrapperIcon from "../Globals/InputBGWrapperIcon";
import { tabsButtons } from "@/src/data/dataAccountSettings";
import CustomNextUiInput from "../Globals/CustomNextUiInput";
import SectionHeader from "../Globals/SectionHeader";
import { useState } from "react";

// Images && icons
import { CloseIcon, SearchBigIcon } from "../Icons";

const TabsButtons = ({ activeTab, setActiveTab }) => {
  const [featureSearch, setFeatureSearch] = useState("");

  return (
    <section className={"bg-primary-color-P11 rounded-[32px] p-4"}>
      <div
        className={`flex items-center gap-2.5 rounded-[22px] p-1.5 mb-4 bg-primary-color-P1`}
      >
        {tabsButtons.map((TabButton, TabIndex) => (
          <button
            key={TabIndex}
            className={`w-full flex gap-3 items-center md:justify-start justify-center p-1.5 rounded-2xl ST-SB-4 ${
              activeTab === TabIndex ? "btn btn-tertiary" : "btn btn-primary"
            }`}
            onClick={() => setActiveTab(TabIndex)}
          >
            <span className="bg-primary-color-P1 p-1 rounded-[10px]">
              <TabButton.Icon fillColor={"fill-primary-color-P12"} />
            </span>

            <span className="md:block hidden font-bold">
              {TabButton?.textButton}
            </span>
          </button>
        ))}
      </div>

      <SectionHeader
        titleIcon={<SearchBigIcon fillColor={"fill-primary-color-P1"} />}
        descriptionText={"Find any feature or settings quickly."}
        titleText={"Search for a feature or an option"}
        wrapperSectionHeaderClassName="space-y-4"
        headerContainerClassName="px-3"
        descriptionClassName={"mt-[4px]"}
        titleClassName="MT-SB-1"
      >
        <CustomNextUiInput
          classNames={{ inputWrapper: "!bg-primary-color-P12" }}
          nameInput={"featureSearch"}
          value={featureSearch}
          onChange={(e) => setFeatureSearch(e.target.value)}
          placeholder={"Search for a feature"}
          startContent={
            <InputBGWrapperIcon className="bg-primary-color-P11">
              <SearchBigIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon
              className={"bg-primary-color-P11 cursor-pointer"}
              onClick={() => setFeatureSearch("")}
            >
              <CloseIcon strokeColor={"stroke-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
        />
      </SectionHeader>
    </section>
  );
};

export default TabsButtons;
