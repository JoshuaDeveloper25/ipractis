import Hero from "@/src/components/Home/Hero";
import BrowseSubjectsAndTutors from "../components/Home/BrowseSubjectsAndTutors";
import EasyStepsGetStarted from "../components/Home/EasyStepsGetStarted";
import MeetOurServices from "../components/Home/MeetOurServices";
import VariousInterestingSubject from "../components/Home/VariousInterestingSubject";
import LessonsSupport from "../components/Home/LessonsSupport";
import SafeLearning from "../components/Home/SafeLearning";

const page = () => {
  return (
    <main>
      {/* Hero and Carousel of Languagues */}
      <Hero />

      {/* Browse our subjects and tutors, cards and carousel */}
      <BrowseSubjectsAndTutors />

      {/* Only few easy steps to get started */}
      <EasyStepsGetStarted />

      {/* Meet Our Services */}
      <MeetOurServices />

      {/* Various Interesting Subject */}
      <VariousInterestingSubject />

      {/* Discover how online lessons can suport you */}
      <LessonsSupport />

      {/* Safe learning environment */}
      <SafeLearning />
    </main>
  );
};

export default page;
