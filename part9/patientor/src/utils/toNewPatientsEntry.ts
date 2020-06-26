import { NewPatientsEntry, Gender } from '../types/Patients';

const toNewPatientsEntry = (object:any): NewPatientsEntry => {

    const isString = (text: any): text is string => {
        return typeof text === 'string' || text instanceof String;
      };

    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    
    const isGender = (param :any) : param is Gender => {
        return Object.values(Gender).includes(param);
    }

    const parseName = (name: any): string => {
        if (!name || !isString(name)) {
          throw new Error('Incorrect or missing name: ' + name);
        }
      
        return name;
    }

    const parseSSN = (ssn: any): string => {
        if (!ssn || !isString(ssn)) {
          throw new Error('Incorrect or missing ssn: ' + ssn);
        }
      
        return ssn;
    }

    const parseOccupation = (occupation: any): string => {
        if (!occupation || !isString(occupation)) {
          throw new Error('Incorrect or missing occupation: ' + occupation);
        }
      
        return occupation;
    }

    const parseDate = (date: any): string => {
        if (!date || !isDate(date)) {
          throw new Error('Incorrect or missing date: ' + date);
        }
      
        return date;
    }

    const parseGender = (gender: any): Gender => {
        if (!gender || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        } 
        return gender;
      };

    const newEntry: NewPatientsEntry = {
        name:parseName(object.name),
        dateOfBirth:parseDate(object.dateOfBirth),
        ssn:parseSSN(object.ssn),
        gender:parseGender(object.gender),
        occupation:parseOccupation(object.occupation),
    }
  
  return newEntry;
} 

export default toNewPatientsEntry;