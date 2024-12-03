import SectionHeader from "../Globals/SectionHeader";

// Icons && images
import wrench from "@/public/icons/wrench.png";

const RightColumn = () => {
  return (
    <article className="flex-1 w-full">
      <SectionHeader
        descriptionText="Briefly explain the problem to help us assist you."
        titleText="Describe Your Issue"
        descriptionClassName="mt-1"
        titleClassName="MT-SB-1"
        iconAlt={"Wrench Icon"}
        iconClassName="w-6"
        iconSrc={wrench}
      />

      <div className="my-[50px]"></div>
    </article>
  );
};

export default RightColumn;