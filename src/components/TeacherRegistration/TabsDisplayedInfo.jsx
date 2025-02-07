import TabsButtonsBottomNav from "./TabsButtonsBottomNav";
import TabAvailability from "./TabAvailability/index";
import TabBackground from "./TabBackground/index";
import TabProfile from "./TabProfile/index";
import TabSubject from "./TabSubject/index";
import TabStatus from "./TabStatus/index";

// React imports
import { CalendarDate, parseDate } from "@internationalized/date";
import { useState } from "react";
import axios from "axios";

// Zod schemas
import {
  tabAvailabilitySchema,
  tabBackgroundSchema,
  tabProfileSchema,
  tabSubjectSchema,
} from "@/src/lib/schema";

// Images && icons
import ukFlag from "@/public/flags/united-kingdom.png";
import italyFlag from "@/public/flags/italy.png";
import franceFlag from "@/public/flags/france.png";
import spainFlag from "@/public/flags/spain.png";

const TabsDisplayedInfo = ({
  setActiveTab,
  activeTab,
  saved,
  setSaved,
  draft,
  // setDraft,
}) => {
  // TAB PROFILE STATES
  const [birthDate, setBirthDate] = useState(
    draft?.birthDate && !isNaN(Date.parse(draft?.birthDate))
      ? parseDate(draft?.birthDate)
      : undefined
  );
  const [masteredLanguages, setMasteredLanguages] = useState(draft?.languages);
  const [isTabProfilePending, setIsTabProfilePending] = useState(false);
  const [selectedGender, setSelectedGender] = useState(draft?.gender);
  const [introText, setIntroText] = useState(draft?.introduction);
  const countryFlags = {
    UnitedKingdom: ukFlag,
    France: franceFlag,
    Spain: spainFlag,
    Italy: italyFlag,
  };
  const [selectedCountry, setSelectedCountry] = useState({
    key: draft?.country || "United Kingdom",
    image: countryFlags[draft?.country] || ukFlag,
    alt: `Flag of ${draft?.country}`,
  });
  let validBirthDate = new CalendarDate(
    birthDate?.year,
    birthDate?.month,
    birthDate?.day
  );

  // TAB SUBJECT STATES
  const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);
  const [teachToAmateurPersons, setTeachToAmateurPersons] = useState(
    draft?.teachToYoungPersons
  );
  const [teachToYoungPersons, setTeachToYoungPersons] = useState(
    draft?.teachToAmateurPersons
  );
  const [selectedLevel, setSelectedLevel] = useState(draft?.studentLevel);
  const [isTabSubjectPending, setIsTabSubjectPending] = useState(false);
  const [subjectToTeach, setSubjectToTeach] = useState(draft?.subject);
  const [withdrawal, setWithdrawal] = useState(draft?.withdrawal);

  // TAB BACKGROUND STATES
  const [isTabBackgroundPending, setIsTabBackgroundPending] = useState(false);
  const [experiences, setExperiences] = useState(draft?.careerExperience);
  const [educations, setEducations] = useState(draft?.education);

  // TAB AVAILAIBILITY STATES
  const [isTabAvailabilityPending, setIsTabAvailabilityPending] =
    useState(false);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uploadProfileImage", e?.target?.uploadProfileImage?.files[0]);
    const uploadedImage = formData.get("uploadProfileImage");

    const actualDraftInfo = draft;

    try {
      setIsTabProfilePending(true);
      setIsTabSubjectPending(true);
      setIsTabBackgroundPending(true);
      setIsTabAvailabilityPending(true);

      // TAB PROFILE
      if (activeTab === 0) {
        actualDraftInfo.birthDate = validBirthDate?.toString().includes("NaN")
          ? ""
          : validBirthDate?.toString();
        actualDraftInfo.middleName = e?.target?.middleName?.value;
        actualDraftInfo.firstName = e?.target?.firstName?.value;
        actualDraftInfo.lastName = e?.target?.lastName?.value;
        actualDraftInfo.uploadProfileImage = uploadedImage;
        actualDraftInfo.country = selectedCountry?.key;
        actualDraftInfo.languages = masteredLanguages;
        actualDraftInfo.introduction = introText;
        actualDraftInfo.gender = selectedGender;

        const validationResult = tabProfileSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) {
          return setErrors(validationResult.error.issues);
        }

        const response = await axios.post(
          `/teacher/set/profile`,
          actualDraftInfo
        );

        setErrors([]);
        console.log(response, "PROFILE");
      }

      // TAB SUBJECT
      if (activeTab === 1) {
        actualDraftInfo.subjectIntroduction =
          e?.target?.subjectIntroduction?.value;
        actualDraftInfo.emailWithdrawal = e?.target?.emailWithdrawal?.value;
        actualDraftInfo.profileTitle = e?.target?.profileTitle?.value;
        actualDraftInfo.teachToAmateurPersons = teachToAmateurPersons;
        actualDraftInfo.hourlyPrice = e?.target?.hourlyPrice?.value;
        actualDraftInfo.teachToYoungPersons = teachToYoungPersons;
        actualDraftInfo.subSubject = selectedSubSubjects;
        actualDraftInfo.videoLink = e?.target?.videoLink?.value;
        actualDraftInfo.studentLevel = selectedLevel;
        actualDraftInfo.subject = subjectToTeach;
        actualDraftInfo.withdrawal = withdrawal;

        const validationResult = tabSubjectSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) {
          return setErrors(validationResult.error.issues);
        }

        const response = await axios.put(
          `/teacher/set/subject`,
          actualDraftInfo
        );

        setErrors([]);
        console.log(response, "SUBJECT");
      }

      // TAB BACKGROUND
      if (activeTab === 2) {
        actualDraftInfo.careerExperience = experiences;
        actualDraftInfo.education = educations;

        const validationResult = tabBackgroundSchema.safeParse(actualDraftInfo);

        if (!validationResult.success) {
          return setErrors(validationResult.error.issues);
        }

        const response = await axios.put(
          `/teacher/set/background`,
          actualDraftInfo
        );

        setErrors([]);
        console.log(response, "BACKGROUND");
      }

      // TAB AVAILABILITY
      if (activeTab === 3) {
        actualDraftInfo.dailyWorkTime = e?.target?.dailyWorkTime?.value;
        actualDraftInfo.timeZone = e?.target?.timeZone?.value;

        const validationResult =
          tabAvailabilitySchema.safeParse(actualDraftInfo);

        if (!validationResult.success) {
          return setErrors(validationResult.error.issues);
        }

        const response = await axios.put(
          `/teacher/set/availability`,
          actualDraftInfo
        );

        setErrors([]);
        setSaved(true);

        console.log(response, "AVAILABILITY");
      } else {
        setActiveTab((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsTabProfilePending(false);
      setIsTabSubjectPending(false);
      setIsTabBackgroundPending(false);
      setIsTabAvailabilityPending(false);
    }

    // setDraft(actualDraftInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-[1000px] md:px-16 px-8 sm:py-0 py-8 mx-auto`}
    >
      {/* 0 */}
      <TabProfile
        setMasteredLanguages={setMasteredLanguages}
        setSelectedCountry={setSelectedCountry}
        setSelectedGender={setSelectedGender}
        masteredLanguages={masteredLanguages}
        selectedCountry={selectedCountry}
        selectedGender={selectedGender}
        setBirthDate={setBirthDate}
        setIntroText={setIntroText}
        introText={introText}
        birthDate={birthDate}
        activeTab={activeTab}
        errors={errors}
        draft={draft}
      />

      {/* 1 */}
      <TabSubject
        setTeachToAmateurPersons={setTeachToAmateurPersons}
        setTeachToYoungPersons={setTeachToYoungPersons}
        setSelectedSubSubjects={setSelectedSubSubjects}
        teachToAmateurPersons={teachToAmateurPersons}
        selectedSubSubjects={selectedSubSubjects}
        teachToYoungPersons={teachToYoungPersons}
        setSubjectToTeach={setSubjectToTeach}
        setSelectedLevel={setSelectedLevel}
        subjectToTeach={subjectToTeach}
        setWithdrawal={setWithdrawal}
        selectedLevel={selectedLevel}
        withdrawal={withdrawal}
        activeTab={activeTab}
        errors={errors}
        draft={draft}
      />

      {/* 2 */}
      <TabBackground
        setExperiences={setExperiences}
        setEducations={setEducations}
        experiences={experiences}
        educations={educations}
        activeTab={activeTab}
        errors={errors}
      />

      {/* 3 */}
      <TabAvailability
        activeTab={activeTab}
        errors={errors}
        saved={saved}
        draft={draft}
      />

      {/* 4 */}
      <TabStatus activeTab={activeTab} />

      {/* Back && Save buttons */}
      <TabsButtonsBottomNav
        isTabAvailabilityPending={isTabAvailabilityPending}
        isTabBackgroundPending={isTabBackgroundPending}
        isTabSubjectPending={isTabSubjectPending}
        isTabProfilePending={isTabProfilePending}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setSaved={setSaved}
        saved={saved}
      />
    </form>
  );
};

export default TabsDisplayedInfo;
