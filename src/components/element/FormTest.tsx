import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MyTextField, MyRadio, MyCheckBox } from "../element/MyCustomInput";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

const FormTest: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }],
        }}
        validationSchema={validationSchema}
        // custom validation;
        // validate={(values) => {
        //   const errors: Record<string, string> = {};
        //
        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob";
        //   }
        //
        //   return errors;
        // }}

        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          //make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField
              placeholder="First Name"
              name="firstName"
              type="input"
            />
            {/* Default Field Input 
            <Field placeholder="First Name" name="firstName" type="input" label="First Name" as={TextField} /> 
            */}

            {/* Default Field Input
            <div>
              <Field placeholder="Last Name" name="lastName" type="input" label="Last Name" as={TextField} />
            </div>
            */}

            {/* Default Field Input 
              <Field name="isTall" type="checkbox" as={Checkbox} />
            */}

            <div>Cookies</div>
            <MyCheckBox
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              label="chocolate chip"
            />
            <MyCheckBox
              name="cookies"
              type="checkbox"
              value="snickerdoodle"
              label="snickerdoodle"
            />
            <MyCheckBox 
              name="cookies" 
              type="checkbox" 
              value="sugar"
              label="sugar" 
            />

            <div>Yogurt</div>
            {/* Default Field Input
            <Field name="yogurt" type="radio" value="peach" as={Radio} />
            <Field name="yogurt" type="radio" value="blueberry" as={Radio} />
            <Field name="yogurt" type="radio" value="apple" as={Radio} /> 
            */}
            <MyRadio 
              name="yogurt"
              type="radio" 
              value="peach" 
              label="peach" 
            />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <MyRadio 
              name="yogurt" 
              type="radio" 
              value="apple" 
              label="apple" 
            />

            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>

            <FieldArray name="pets">
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: "frog",
                        name: "",
                        id: "" + Math.random(),
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={index}>
                        <MyTextField
                          placeholder=""
                          name={`pets.${index}.name`}
                        />
                        <div>
                          <Field
                            name={`pets.${index}.type`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="cat">cat</MenuItem>
                            <MenuItem value="dog">dog</MenuItem>
                            <MenuItem value="frog">frog</MenuItem>
                          </Field>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            x
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormTest;
