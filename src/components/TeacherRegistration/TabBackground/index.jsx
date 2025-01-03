import SectionHeader from "../../Globals/SectionHeader";
import { LuggageIcon, UserBigIcon, UserIcon } from "../../Icons";

const TabBackground = ({ activeTab }) => {
  return (
    <div className={`${activeTab !== 2 && "hidden"}`}>
      <SectionHeader
        descriptionText="Share your academic qualifications, work experience, and any relevant achievements to build credibility as a tutor."
        titleIcon={<LuggageIcon fillColor={"fill-primary-color-P1"} />}
        wrapperSectionHeaderClassName={"p-4 mb-[50px]"}
        titleText="Background section"
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

export default TabBackground;
