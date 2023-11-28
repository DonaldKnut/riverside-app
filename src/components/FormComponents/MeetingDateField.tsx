import { EuiDatePicker, EuiFormRow } from "@elastic/eui";
import moment from "moment";
import React from "react";

const MeetingDateField = ({
  selected,
  setStartDate,
}: {
  selected: moment.Moment;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}) => {
  return (
    <>
      <EuiFormRow>
        <EuiDatePicker
          selected={selected}
          onChange={(date) => {
            setStartDate(date!);
          }}
        ></EuiDatePicker>
      </EuiFormRow>
    </>
  );
};

export default MeetingDateField;
