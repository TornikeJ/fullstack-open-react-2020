import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, HealthCheckOption, SelectHealthCheckField } from './FormField';
import {  Entry, HealthCheckRating } from '../types/Entry';


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const init:Entry={description: "",
    date: "",
    specialist:"",
    type:"HealthCheck",
    healthCheckRating:HealthCheckRating.CriticalRisk,
    id:''
  }

  return (
    <Formik
      initialValues={init}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date Of Entry"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Type"
              name="type"
              value="HealthCheck"
              component={TextField}
            />
            <SelectHealthCheckField
              label="HealthCheck"
              name="healthCheck"
              options={healthCheckOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
