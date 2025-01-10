import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

export default async function(params, context) {
  if (params.parseToUTC) {
    dayjs.extend(utc);
  }
  dayjs.extend(localeData)
  let dt;
  if (Number.isInteger(params.input)) {
    if (String(params.input).length === 10) {
      dt =  dayjs.unix(params.input)
    } else if (String(params.input).length === 13) {
      dt =  dayjs(params.input)
    } else {
      throw new Error("input is not a valid timestamp")
    }
  } else {
    dt = dayjs(params.input)
    if (!dt.isValid()) {
      throw new Error("input is not a valid datestring")
    }
  }

  const output = dt.format(params.outputFormat)
  
  return {
    output: output,
    year: dt.year(),
    monthNumber: dt.month() + 1,
    month: dayjs.months()[dt.month()],
    day: dt.daysInMonth(),
    dayOfWeek: dayjs.weekdays()[dt.day()],
    hour: dt.hour(),
    minute: dt.minute(),
    second: dt.second(),
    millisecond: dt.millisecond()
  };
}