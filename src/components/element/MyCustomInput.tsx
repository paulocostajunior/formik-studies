import React from "react";
import { FieldAttributes, useField } from "formik";
import { TextField, Radio, FormControlLabel, Checkbox } from "@material-ui/core";

type MyRadioProps = { label: string } & FieldAttributes<{}>;
type MyCheckBoxProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label}/>
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({placeholder, ...props}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
};

const MyCheckBox: React.FC<MyCheckBoxProps> = ({label, ...props}) => {
    const [field] = useField<{}>(props);
    return <FormControlLabel {...field} control={<Checkbox />} label={label} />
}

export {
    MyRadio,
    MyTextField,
    MyCheckBox
};