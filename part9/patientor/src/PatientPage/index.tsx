import React from "react";
import axios from "axios";
import { Container, Table} from "semantic-ui-react"; 
import { PatientsEntry } from '../types/Patients';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";



const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();
    React.useEffect(() => {
        console.log(patient[id])
        if(!patient[id]){
            axios.get<PatientsEntry>(`${apiBaseUrl}/patients/${id}`)
            .then(({data:PatientsEntry})=> dispatch(setPatient(PatientsEntry)))
            .catch(e=>console.error(e));
        }
    },[patient[id]?.id]);
    return(
    <div className="App">
    <Container textAlign="center">
        <h3>Patient</h3>
    </Container>
    <Table celled>
    <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Gender</Table.HeaderCell>
        <Table.HeaderCell>Occupation</Table.HeaderCell>
        <Table.HeaderCell>SSN</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row>
            <Table.Cell>{patient[id]?.name}</Table.Cell>
            <Table.Cell>{patient[id]?.gender}</Table.Cell>
            <Table.Cell>{patient[id]?.occupation}</Table.Cell>
            <Table.Cell>{patient[id]?.ssn}</Table.Cell>
        </Table.Row>
    </Table.Body>
    </Table>
    <Container textAlign="left">
        <h3>Entries</h3>
        {patient[id]?.entries?.map((entry,index)=>{return(
            <div key={index}>
                <p>{entry.date} {entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code,index)=>{return(
                        <li key={index}>{code}</li>
                    )})}
                </ul>
            </div>
        )})}
    </Container>
    </div>
    )}

export default PatientPage