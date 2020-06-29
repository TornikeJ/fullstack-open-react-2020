import React, { useState } from "react";
import { Grid, Button} from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, HealthCheckOption, SelectHealthCheckField, SelectTypeField, TypesOption } from './FormField';
import { Entry, HealthCheckRating } from '../types/Entry';
import { TypeOption } from "../types";


interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
];

const typeOptions: TypesOption[] = [
  { value: TypeOption.HealthCheck, label: "HealthCheck" },
  { value: TypeOption.Hospital, label: "Hospital" },
  { value: TypeOption.OccupationalHealthcare, label: "Occupation Healthcare" }
];


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  type BaseEntry = Omit<Entry,'type'>
  const init:BaseEntry={
    description: "",
    date: "",
    specialist:"",
    id:''
  }
  const [form, setForm] = useState<Entry>({...init,type:'HealthCheck',healthCheckRating:HealthCheckRating.Healthy});

  const allRequiredFields = {...form, dischargeDate:"",dischargeCriteria:"", employerName:""}

  const updateForm = (values : Entry) =>{
    const base : BaseEntry = { 
      description:values.description,
      date:values.date,
      specialist:values.specialist,
      id:''   
     }
    switch(values.type){
      case "HealthCheck":
        setForm({...base,type:'HealthCheck',healthCheckRating:HealthCheckRating.Healthy})
        break;
      case "Hospital":
        setForm({...base,type:'Hospital',discharge:{date:"",criteria:""}})
        break;
      case "OccupationalHealthcare":
        setForm({...base,type:'OccupationalHealthcare',employerName:""})
        break
      default:
        setForm({...base,type:'HealthCheck',healthCheckRating:HealthCheckRating.Healthy})
    }
  }

  return (
    <Formik
      initialValues={allRequiredFields}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.type === 'Hospital' && values.dischargeCriteria === "") {
          errors.dischargeCriteria = requiredError;
        }
        if (values.type === 'Hospital' && !values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (values.type === 'OccupationalHealthcare' && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {(props) => {
        if(props.values.type !== form.type){
          updateForm(props.values)
        }

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
            <SelectTypeField
              label="Type"
              name="type"
              options={typeOptions}
            />
            {
              form.type === 'Hospital'?
              <>
                <Field
                  label="Date of discharge"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
              :null
            }
            {
              form.type === 'OccupationalHealthcare'?
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />:null
            }
            {
              form.type === 'HealthCheck'?
              <SelectHealthCheckField
                label="HealthCheck"
                name="healthCheckRating"
                options={healthCheckOptions}
              />:null
            }
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
