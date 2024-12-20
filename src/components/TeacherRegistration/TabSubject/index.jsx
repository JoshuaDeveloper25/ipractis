import { NotebookOpenedIcon, UserBigIcon, UserIcon } from "../../Icons";
import SectionHeader from "../../Globals/SectionHeader";

const TabSubject = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 1 && "hidden"}`}>
      <SectionHeader
        descriptionText="Select the subjects you wish to teach and provide detailed information about your expertise."
        titleIcon={<NotebookOpenedIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={"p-4 mb-[50px]"}
        titleText="Subject section"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-16">
        <div className="space-y-8 p-8 rounded-2xl bg-primary-color-P12">
          <SectionHeader
            descriptionText="Upload a photo to personalize your profile."
            titleIcon={<UserIcon fillColor={"fill-primary-color-P1"} />}
            titleText="Profile Picture"
            titleClassName="MT-SB-1"
          />

          <div className="flex items-start gap-8">
            {/* Profile Image Input */}
            <div className="relative">
              <input
                type="file"
                className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              />

              <div className="w-[100px] h-[100px] rounded-2xl p-[25px] bg-primary-color-P11">
                <UserBigIcon fillColor={"fill-primary-color-P6"} />
              </div>
            </div>

            {/* Instructions Image Input */}
            <ul className="ps-4 ST-1 list-disc text-primary-color-P4">
              <li>You must be clearly visible and centered in the picture.</li>
              <li>Use a plain background to avoid distractions.</li>
              <li>The picture should be a recent, high-quality image.</li>
              <li>
                Ensure good lighting so your face is well-lit and clearly
                visible.
              </li>
              <li>Avoid using filters or overly edited images.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSubject;
