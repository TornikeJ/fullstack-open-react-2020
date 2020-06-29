import React from "react";
import axios from "axios";
import {  Container, Table, Card, Button} from "semantic-ui-react"; 
import { PatientsEntry } from '../types/Patients';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
// import { DiagnoseEntry } from '../types/Diagnose';
import EntryDetails from "./entryDetials";
import { addEntry } from '../state/reducer';
import { Entry } from "../types/Entry";
import AddEntryModal from "../AddPatientModal/entryModal";



const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const [diagnose, setDiagnose]=useState<DiagnoseEntry[]>()
    const [{ patient }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
  
    const submitNewEntry = async (values: any) => {
      try {
          console.log(values)
        let inputEntry={...values}
        if(inputEntry.type === 'Hospital'){
            inputEntry={...inputEntry, discharge:{
                date:values.dischargeDate,
                citeria:values.dischargeCriteria
            } }
        }
        console.log(inputEntry)
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          inputEntry
        );
        dispatch(addEntry(patient[id],newEntry));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    React.useEffect(() => {
        if(!patient[id]){
            axios.get<PatientsEntry>(`${apiBaseUrl}/patients/${id}`)
            .then(({data:PatientsEntry})=> dispatch(setPatient(PatientsEntry)))
            .catch(e=>console.error(e));
            
            // axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses/`)
            // .then(({data:DiagnoseEntry}) => {
            //     if(DiagnoseEntry){
            //         setDiagnose(DiagnoseEntry)
            //     }
            // })
            // .catch(e=>console.error(e));
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
        <Card.Group style={{flexDirection:'column'}}>
        {patient[id]?.entries?.map((entry,index)=>{return(
            <div key={index}>
                    <EntryDetails entry={entry}></EntryDetails>
                {/* <ul>
                    {entry.diagnosisCodes?.map((code,index)=>{return(
                        <li key={index}>{code} {diagnose?.map((d,i)=> {
                            return d.code === code? <span key={i}>{d.name}</span> : null
                        })}
                        </li>
                        )})}
                    </ul> */}
            </div>
        )})}
        </Card.Group>
    </Container>
    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
    )}

export default PatientPage