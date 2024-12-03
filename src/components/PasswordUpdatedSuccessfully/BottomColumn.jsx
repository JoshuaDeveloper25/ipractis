import SectionHeader from "@/src/components/Globals/SectionHeader";
import Link from "next/link";

// Images && icons
import lockOpened from "@/public/icons/locked-opened.png";

const BottomColumn = () => {
  return (
    <div className="bg-primary-color-P12 p-8 mt-4 rounded-2xl">
      <SectionHeader
        descriptionText={`Your password has been updated. You can now log in with your new password.`}
        titleText={`Password Changed Successfully`}
        descriptionClassName="mt-1"
        iconAlt={"Lock Opened Icon"}
        iconClassName="w-[16px]"
        titleClassName="MT-SB-1"
        iconSrc={lockOpened}
      />

      <div className="mt-[50px]">
        <Link
          href={"/login"}
          className="btn btn-primary w-full py-3 px-4 rounded-2xl flex justify-center items-center MT-SB-1 mt-3"
        >
          Go to login page
        </Link>
      </div>
    </div>
  );
};

export default BottomColumn;