import SectionHeader from "../../Shared/SectionHeader";
import InfoCard from "./InfoCard";

// Images && icons
import {
  NotificationBiggerIcon,
  NotificationBiggestIcon,
  MailBiggestIcon,
  PhoneBiggestIcon,
} from "../../Icons";

const NotificationsCheckUp = () => {
  return (
    <div>
      <SectionHeader
        descriptionText={
          "Verify your notification settings on all devices to receive timely updates and alerts."
        }
        wrapperSectionHeaderClassName="px-4"
        titleIcon={
          <NotificationBiggerIcon fillColor={"fill-primary-color-P1"} />
        }
        descriptionClassName={"mt-[4px] mb-4"}
        titleText={"Notifications Check-Up"}
        titleClassName="MT-SB-1"
      />

      <div className="grid grid-cols-3 gap-8">
        <InfoCard
          title="Browser's notifications"
          icon={NotificationBiggestIcon}
          description="Notifications"
          togglePosition="right"
          isActive={true}
          status="On"
        />

        <InfoCard
          description="Connected via App"
          icon={PhoneBiggestIcon}
          togglePosition="right"
          title="Connected app"
          isActive={true}
          status="Yes"
        />

        <InfoCard
          description="Notifications"
          title="Email Notifications"
          icon={MailBiggestIcon}
          togglePosition="right"
          isActive={true}
        />
      </div>
    </div>
  );
};

export default NotificationsCheckUp;
