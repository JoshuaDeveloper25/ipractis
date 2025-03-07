import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { getDateYearsAgo } from "@/src/lib/utils/getDateYearsAgo";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

// React imports
import { useController } from "react-hook-form";

// Icons
import {
  RightArrowMediumIcon,
  LeftArrowMediumIcon,
  CalendarBiggerIcon,
  BabyWalkerIcon,
  QuestionMark,
} from "../../Icons";

const BirthDateInput = ({ errors, control }) => {
  const {
    field: birthDate,
    fieldState: { error: birthDateError },
  } = useController({
    name: "birthDate",
    control: control,
    defaultValue: moment(getDateYearsAgo(18)).format("YYYY/MM/D"),
  });

  const handleDateChange = (date) => {
    const dateString = date ? moment(date).format("YYYY/MM/D") : null;
    birthDate.onChange(dateString);
  };

  const incrementDay = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.add(1, "day").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const decrementDay = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.subtract(1, "day").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const incrementMonth = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.add(1, "month").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const decrementMonth = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.subtract(1, "month").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const incrementYear = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.add(1, "year").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const decrementYear = () => {
    const currentDate = moment(birthDate.value, "YYYY/MM/D");
    const newDate = currentDate.subtract(1, "year").format("YYYY/MM/D");
    birthDate.onChange(newDate);
  };

  const renderCustomHeader = ({
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    date,
  }) => {
    return (
      <div className="flex justify-between items-center gap-1.5 mb-1.5">
        {/* Group of arrows (Months) */}
        <div className="flex-[60%] flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
          <button type="button" onClick={decreaseMonth}>
            <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>

          <span className="fill-primary-color-P4 mx-1.5 ST-3">
            {date.toLocaleString("en-US", { month: "long" })}
          </span>

          <button type="button" onClick={increaseMonth}>
            <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>
        </div>

        {/* Group of arrows (Years) */}
        <div className="flex-1 flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
          <button type="button" onClick={decreaseYear}>
            <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>

          <span className="fill-primary-color-P4 mx-1.5 ST-3">
            {date.getFullYear()}
          </span>

          <button type="button" onClick={increaseYear}>
            <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="!mt-4 group">
      {/* label */}
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Birth date <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      {/* Inputs */}
      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          birthDate.value,
          "birthDate"
        )}
      >
        <div
          className={`flex justify-between gap-1.5 rounded-2xl p-1.5 ST-3 ${
            birthDateError?.message
              ? "form-input-error"
              : "bg-primary-color-P11"
          } group-hover:bg-secondary-color-S9`}
        >
          {/* Icon */}
          <div>
            <InputBGWrapperIcon>
              <BabyWalkerIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          </div>

          {/* Date */}
          <div className="relative flex-[30%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={
                birthDate.value
                  ? moment(birthDate.value, "YYYY/MM/D").format("D")
                  : ""
              }
              name="birthDateNumber"
              type="text"
              readOnly
            />

            {birthDate.value && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
                  onClick={decrementDay}
                  type="button"
                >
                  <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>

                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                  onClick={incrementDay}
                  type="button"
                >
                  <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>
              </>
            )}
          </div>

          {/* Month */}
          <div className="relative flex-[65%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={
                birthDate.value
                  ? getMonthNumberAsText(
                      moment(birthDate.value, "YYYY/MM/D").format("MM")
                    )
                  : ""
              }
              name="birthDateMonth"
              type="text"
              readOnly
            />

            {birthDate.value && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
                  onClick={decrementMonth}
                  type="button"
                >
                  <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>

                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                  onClick={incrementMonth}
                  type="button"
                >
                  <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>
              </>
            )}
          </div>

          {/* Year */}
          <div className="relative flex-[45%]">
            <input
              className="input-ipractis text-center w-full outline-none rounded-xl !p-0 pointer-events-none h-9"
              value={
                birthDate.value
                  ? moment(birthDate.value, "YYYY/MM/D").format("YYYY")
                  : ""
              }
              name="birthDateYear"
              type="text"
              readOnly
            />

            {birthDate.value && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
                  onClick={decrementYear}
                  type="button"
                >
                  <LeftArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>

                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10"
                  onClick={incrementYear}
                  type="button"
                >
                  <RightArrowMediumIcon fillColor={"fill-primary-color-P8"} />
                </button>
              </>
            )}
          </div>

          {/* Calendar Trigger Icon */}
          <div>
            <DatePicker
              renderCustomHeader={renderCustomHeader}
              onChange={handleDateChange}
              onBlur={birthDate.onBlur}
              showPopperArrow={false}
              value={birthDate.value}
              dateFormat="YYYY/MM/D"
              dropdownMode="select"
              calendarStartDay={1}
              selected={
                birthDate.value
                  ? moment(birthDate.value, "YYYY/MM/D").toDate()
                  : getDateYearsAgo(18)
              }
              customInput={
                <button
                  className="p-1.5 rounded-[10px] bg-primary-color-P12"
                  type="button"
                >
                  <CalendarBiggerIcon fillColor={"fill-primary-color-P4"} />
                </button>
              }
            />
          </div>
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={birthDateError?.message} />
    </div>
  );
};

export default BirthDateInput;
