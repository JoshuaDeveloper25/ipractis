import { formatHourTo12WithPeriod } from "@/src/lib/helpers/formatHourTo12WithPeriod";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import InputBGWrapperIcon from "./InputBGWrapperIcon";
import {
  columnsHeaderWorkSchedule,
  rowsWorkSchedule,
  timeZones,
} from "@/src/data/dataTeacherRegistration";

// External imports
import { useFieldArray } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@nextui-org/react";

// Icons
import {
  ChevronDownBigIcon,
  ChevronLeftBigIcon,
  ChevronRightMediumIcon,
  EarthIcon,
} from "../Icons";

// React imports
import { useEffect, useState } from "react";

const WorkScheduleTable = ({
  wrapperClassName,
  bookedLessonSpot,
  showCurrentDate,
  timeZoneFilter,
  fromToFilter,
  control,
}) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/Chicago");
  const [currentDay, setCurrentDay] = useState("");
  const [weekDates, setWeekDates] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // We use "useFieldArray" to manage the selected slots
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "workSchedule",
  });

  console.log(fields);

  // All that happen in this useEffect are the DEFAULT VALUES for the calendar
  useEffect(() => {
    // Get actual date
    const today = new Date();

    // Get day of week (0 - sunday, 1 - monday, ..., 6 - saturday)
    const currentDay = today.getDay();

    // Calculate the difference of days up to the first day of the week (Monday, for example)
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay; // if it's sunday, we go back 6 days

    // Calculate the date of the first day of the week (Monday)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() + daysToMonday);

    // Calculate the date of the last day of the week (Sunday)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Helper function to format a date object into an object with actualDate, actualMonth, and actualYear
    const formatDateObject = (date) => {
      return {
        actualDate: date.getDate(),
        actualMonth: date.getMonth(),
        actualYear: date.getFullYear(),
      };
    };

    // Format the first and last day of the week
    const formattedMinDate = formatDateObject(firstDayOfWeek);
    const formattedMaxDate = formatDateObject(lastDayOfWeek);

    // Create an array of 7 consecutive dates (Monday, Tuesday, ..., Sunday)
    const generatedWeekDates = Array.from({ length: 7 }, (_, index) => {
      const newDate = new Date(firstDayOfWeek);
      newDate.setDate(firstDayOfWeek.getDate() + index);
      return newDate;
    });

    // Set the generated week dates
    setWeekDates(generatedWeekDates);

    // Update the state of minDate and maxDate with the formatted objects
    setMinDate(formattedMinDate);
    setMaxDate(formattedMaxDate);

    // Set the current day of the week
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date().toLocaleDateString("en-US", {
      timeZone: userTimeZone,
    });
    setCurrentDay(new Date(now).getDate());
  }, []);

  // This is the main logic of the calendar, the goal of this func is to update the week dates by the timezone of the calendar!
  const updateWeekDates = (selectedTimeZone) => {
    const adjustedWeekDates = weekDates?.map((date) => {
      // Convert the date to the selected time zone
      const options = {
        timeZone: selectedTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      // Correctly break down the date to reconstruct it in the correct time zone
      const [month, day, year] = formattedDate.split("/");
      return new Date(`${year}-${month}-${day}T00:00:00`);
    });

    setWeekDates(adjustedWeekDates);

    setMinDate({
      actualDate: adjustedWeekDates[0].getDate(),
      actualYear: adjustedWeekDates[0].getFullYear(),
      actualMonth: adjustedWeekDates[0].getMonth(),
    });

    setMaxDate({
      actualDate: adjustedWeekDates[6].getDate(),
      actualYear: adjustedWeekDates[6].getFullYear(),
      actualMonth: adjustedWeekDates[6].getMonth(),
    });

    // 🟢 Here we also adjust the current date according to the time zone
    const today = new Date();
    const options = {
      timeZone: selectedTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedToday = new Intl.DateTimeFormat("en-US", options).format(
      today
    );

    const [month, day, year] = formattedToday.split("/");
    const correctedDate = new Date(`${year}-${month}-${day}T00:00:00`);

    setCurrentDay(correctedDate.getDate());
  };

  // Once we change the timezone in select, we update the changes to updateWeekDates (Because time changes depending on Timezone)
  const handleTimeZoneChange = (e) => {
    const selectedTimezone = e.target.value;
    setSelectedTimeZone(selectedTimezone);
    updateWeekDates(selectedTimezone);
  };

  // Function to handle the selection of day and hour
  const handleGetDayAndHour = (hour, day) => {
    // Format the hour in 12-hour format with AM/PM
    const formattedHour = formatHourTo12WithPeriod(hour);

    // Check if there is already a record for the selected day
    const existingIndex = fields.findIndex((slot) => slot.day === day);

    if (existingIndex !== -1) {
      // If it already exists, check if the hour is already in the array
      const existingHours = fields[existingIndex].hour;
      const hourIndex = existingHours.indexOf(formattedHour);

      if (hourIndex !== -1) {
        // If the hour exists, remove it
        const updatedHours = existingHours.filter((h) => h !== formattedHour);

        // If no hours remain, remove the entire day
        if (updatedHours.length === 0) {
          remove(existingIndex);
        } else {
          // Update the array of hours
          update(existingIndex, { day, hour: updatedHours });
        }
      } else {
        // If the hour does not exist, add it
        update(existingIndex, { day, hour: [...existingHours, formattedHour] });
      }
    } else {
      // If there is no record for the day, create it with the selected hour
      append({ day: day, hour: [formattedHour] });
    }
  };

  // This is if a slot of calendar is selected (returns true or false)
  const isSelected = (hour, day) => {
    // Format the hour in 12-hour format with AM/PM
    const formattedHour = formatHourTo12WithPeriod(hour);

    // Check if the slot is selected
    return fields.some(
      (slot) => slot.day === day && slot.hour.includes(formattedHour)
    );
  };

  // This is for decrementing days of a month (- 7)
  const handleDecrementWeek = () => {
    setWeekDates((prevDates) =>
      prevDates?.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      })
    );

    setMinDate((prevMin) => {
      const newDate = new Date(
        prevMin.actualYear,
        prevMin.actualMonth,
        prevMin.actualDate - 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });

    setMaxDate((prevMax) => {
      const newDate = new Date(
        prevMax.actualYear,
        prevMax.actualMonth,
        prevMax.actualDate - 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });
  };

  // This is for incrementing days of a month (+ 7)
  const handleIncrementWeek = () => {
    setWeekDates((prevDates) =>
      prevDates?.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      })
    );

    setMinDate((prevMin) => {
      const newDate = new Date(
        prevMin.actualYear,
        prevMin.actualMonth,
        prevMin.actualDate + 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });

    setMaxDate((prevMax) => {
      const newDate = new Date(
        prevMax.actualYear,
        prevMax.actualMonth,
        prevMax.actualDate + 7
      );
      return {
        actualDate: newDate.getDate(),
        actualMonth: newDate.getMonth(),
        actualYear: newDate.getFullYear(),
      };
    });
  };

  return (
    <section className={wrapperClassName}>
      {/* FILTER TO AND FROM! E.G = January 1th to 7th and viceversa! */}
      {fromToFilter && (
        <div className="flex items-center justify-center gap-8 mb-4">
          <button onClick={handleDecrementWeek} type="button">
            <ChevronLeftBigIcon fillColor={"fill-primary-color-P1"} />
          </button>

          <h3 className="text-primary-color-P1 ST-4">From</h3>

          <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9 w-[284px]">
            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-2 !py-1.5 w-[48px] h-9"
              defaultValue={minDate?.actualDate}
              name="birthDateNumber"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[141px] h-9"
              defaultValue={getMonthNumberAsText(minDate?.actualMonth + 1)}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              defaultValue={minDate?.actualYear}
              name="birthDateYear"
              readOnly
            />
          </div>

          <h3 className="text-primary-color-P1 ST-4">To</h3>

          <div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9 w-[284px]">
            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[52px] h-9"
              name="birthDateNumber"
              defaultValue={maxDate?.actualDate}
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[137px] h-9"
              defaultValue={getMonthNumberAsText(maxDate?.actualMonth + 1)}
              name="birthDateMonth"
              readOnly
            />

            <input
              type="text"
              className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
              name="birthDateYear"
              defaultValue={maxDate?.actualYear}
              readOnly
            />
          </div>

          <button onClick={handleIncrementWeek} type="button">
            <ChevronRightMediumIcon fillColor={"fill-primary-color-P1"} />
          </button>
        </div>
      )}

      {/* THIS IS FOR DESKTOP SCREENS - 768px to up */}
      <Table
        className="md:block hidden"
        classNames={{
          th: "bg-transparent !bg-none p-0",
        }}
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="!h-0 w-[27.50px]" key="empty-column">
            <div className="bg-secondary-color-S4 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-5 p-2 w-[80%]">
              {"Format"}
            </div>{" "}
          </TableColumn>

          {Array.from({ length: 24 }, (_, index) => {
            // Adjust the index to start from 1 instead of 0
            const adjustedIndex = (index + 1) % 24; // This ensures that 23 + 1 = 0, and 0 + 1 = 1, etc.
            const displayHour = adjustedIndex % 12 || 12; // Displays 1 to 12 instead of 0 to 11

            return (
              <TableColumn
                className="!h-0 w-[27.50px]"
                key={`hour-${adjustedIndex}`}
              >
                <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-SB-3 h-5 w-[90%] mx-auto">
                  {displayHour} {/* Shows only the number (1 or 12) */}
                </div>
              </TableColumn>
            );
          })}
        </TableHeader>

        <TableBody>
          {columnsHeaderWorkSchedule.map((column, rowIndex) => {
            const columnDate = weekDates[rowIndex];

            const isToday =
              columnDate instanceof Date &&
              !isNaN(columnDate) &&
              columnDate.getDate() === currentDay &&
              columnDate.getMonth() === new Date().getMonth() &&
              columnDate.getFullYear() === new Date().getFullYear();

            return (
              <TableRow key={column.key}>
                <TableCell className="!p-0">
                  <div
                    className={`text-primary-color-P12 rounded-md text-center w-[80%] my-1 ${
                      isToday ? "bg-tertiary-color-SC5" : "bg-primary-color-P1"
                    }`}
                  >
                    <div className={`text-primary-color-P12 ST-3`}>
                      {column.label}
                    </div>
                  </div>
                </TableCell>

                {Array.from({ length: 24 }, (_, hourIndex) => {
                  const adjustedHourIndex = (hourIndex + 1) % 24; // Adjusts the index to start from 1

                  return (
                    <TableCell
                      className={`${
                        isToday
                          ? "bg-tertiary-color-SC5 [&:nth-child(2)]:rounded-s-lg last:rounded-r-lg h-7 !w-[27.50px] !p-1"
                          : "!p-0 !pb-0.5"
                      } !px-0.5`}
                      key={`${column.key}-${adjustedHourIndex}`}
                    >
                      <button
                        className={`${
                          isSelected(adjustedHourIndex, column.label)
                            ? "bg-quinary-color-VS10"
                            : "bg-primary-color-P11"
                        } flex justify-center items-center rounded-md ST-4 h-5 w-full mx-auto`}
                        onClick={() =>
                          handleGetDayAndHour(adjustedHourIndex, column.label)
                        }
                        type="button"
                      ></button>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* THIS IS FOR RESPONSIVE SCREENS - 768px to bottom */}
      <Table
        className="md:hidden block"
        classNames={{
          th: "bg-transparent !bg-none p-0",
        }}
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="w-[40.50px] mx-auto" key="custom-column">
            <div className="bg-primary-color-P12 ST-SB-3 h-6 w-full">
              <p></p>
            </div>

            <div className="bg-primary-color-P12 ST-SB-3 h-6 w-full mt-1.5">
              <p></p>
            </div>
          </TableColumn>

          {columnsHeaderWorkSchedule.map((column, rowIndex) => {
            const columnDate = weekDates[rowIndex];

            const isToday =
              columnDate instanceof Date &&
              !isNaN(columnDate) &&
              columnDate.getDate() === currentDay &&
              columnDate.getMonth() === new Date().getMonth() &&
              columnDate.getFullYear() === new Date().getFullYear();

            return (
              <TableColumn className="h-auto w-[40.50px]" key={column.key}>
                <div
                  className={`${
                    isToday
                      ? "bg-tertiary-color-SC5 text-primary-color-P12"
                      : "bg-primary-color-P12 text-primary-color-P1"
                  } p-1 text-center rounded-lg h-full w-[40.50px] mx-auto`}
                >
                  <div className="ST-SB-3 !px-0">{column.label}</div>

                  <div
                    className={`${
                      isToday
                        ? "bg-primary-color-P12 text-tertiary-color-SC5"
                        : "bg-primary-color-P1 text-primary-color-P12"
                    } rounded-md flex justify-center items-center mt-0.5 h-5`}
                  >
                    <p className="ST-4">
                      {showCurrentDate
                        ? columnDate instanceof Date && !isNaN(columnDate)
                          ? columnDate.toLocaleDateString().split("/")[0]
                          : "--"
                        : "X"}
                    </p>
                  </div>
                </div>
              </TableColumn>
            );
          })}
        </TableHeader>

        <TableBody>
          {rowsWorkSchedule.map((row) => (
            <TableRow className="" key={row.hour}>
              <TableCell className="!p-0 w-[40.50px]">
                <div className="bg-primary-color-P1 text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-5 w-[32.50px] mx-auto">
                  {row?.hour}
                </div>
              </TableCell>

              {columnsHeaderWorkSchedule.map((column, rowIndex) => {
                const columnDate = weekDates[rowIndex];

                const isToday =
                  columnDate instanceof Date &&
                  !isNaN(columnDate) &&
                  columnDate.getDate() === currentDay &&
                  columnDate.getMonth() === new Date().getMonth() &&
                  columnDate.getFullYear() === new Date().getFullYear();

                return (
                  <TableCell
                    className={`${
                      isToday
                        ? "bg-tertiary-color-SC5 isSelected h-5 !w-[32.50px] !p-1"
                        : "!p-0"
                    }`}
                    key={column?.key}
                  >
                    <button
                      className={`${
                        isSelected(row?.hour, column?.label)
                          ? "bg-quinary-color-VS10"
                          : "bg-primary-color-P11"
                      } text-primary-color-P12 flex justify-center items-center rounded-md ST-4 h-5 !w-[32.50px] mx-auto`}
                      onClick={() =>
                        handleGetDayAndHour(row?.hour, column?.label)
                      }
                      type="button"
                    >
                      {column?.slot}
                    </button>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Spots - booked, available, unavailable and also timezone filter */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-4">
          {bookedLessonSpot && (
            <div className="flex items-center gap-2.5">
              <div className="h-[18px] w-[18px] bg-quaternary-color-A10 rounded-md"></div>
              <h3 className="ST-3 text-primary-color-P1">Booked lesson</h3>
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <div className="h-[18px] w-[18px] bg-quinary-color-VS10 rounded-md"></div>
            <h3 className="ST-3 text-primary-color-P1">Available for lesson</h3>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-[18px] w-[18px] bg-primary-color-P11 rounded-md"></div>
            <h3 className="ST-3 text-primary-color-P1">Unavailable</h3>
          </div>
        </div>

        <div>
          {timeZoneFilter && (
            <Select
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
              defaultSelectedKeys={["America/Chicago"]}
              name="timeZoneCalendar"
              onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
              placeholder="Select a time zone"
              selectorIcon={<span></span>}
              isOpen={isOpen}
              startContent={
                <InputBGWrapperIcon>
                  <EarthIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon>
                  <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                trigger: ["select-wrapper-ipractis"],
                innerWrapper: ["select-ipractis", "w-full"],
                value: [
                  "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                ],
                listbox: ["text-primary-color-P4"],
              }}
            >
              {timeZones?.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkScheduleTable;
