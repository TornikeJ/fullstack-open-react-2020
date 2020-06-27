import { newEntry, HealthCheckRating, Entry } from '../types/Entry';

const toNewEntry = (object:any): Entry => {

    const isString = (text: any): text is string => {
        return typeof text === 'string' || text instanceof String;
      };

    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    const isHealthCheckRating = (param :any) : param is HealthCheckRating => {
      return Object.values(HealthCheckRating).includes(param);
  }

    const isType = (entry: Entry): boolean => {
        switch(entry.type){
          case "HealthCheck":
            return true
          case "Hospital":
            return true
          case "OccupationalHealthcare":
            return true
          default:
            return false
        }
    };

    const parseDescription = (description: any): string => {
        if (!description || !isString(description)) {
          throw new Error('Incorrect or missing description: ' + description);
        }
      
        return description;
    }

    const parseSpecialist = (specialist: any): string => {
        if (!specialist || !isString(specialist)) {
          throw new Error('Incorrect or missing specialist: ' + specialist);
        }
      
        return specialist;
    }
    const parseEmployerName = (employerName: any): string => {
        if (!employerName || !isString(employerName)) {
          throw new Error('Incorrect or missing empyloyer name: ' + employerName);
        }
      
        return employerName;
    }

    const parseDischarge = (discharge : any) : {date:string;criteria:string} =>{
      if(isString(object.discharge.criteria)&&isDate(object.discharge.date)){
        return {
          date:discharge.date,
          criteria:discharge.criteria
        }
      } 

      throw new Error('incorrect parameters for discharge')
    }

    const parseType = (object: any): any => {
        if (!object || !isType(object)) {
          throw new Error('Incorrect or missing type: ' + object.type);
        }
      
        return object.type;
    }

    const parseDate = (date: any): string => {
        if (!date || !isDate(date)) {
          throw new Error('Incorrect or missing date: ' + date);
        }
      
        return date;
    }

    const parseHealthCheck = (data: any): HealthCheckRating => {
      if (!data || !isHealthCheckRating(data)) {
          throw new Error('Incorrect or missing healthCheck: ' + data);
      } 
      return data;
    };


    let verifyEntry:newEntry = {
        description:parseDescription(object.description),
        date:parseDate(object.date),
        specialist:parseSpecialist(object.specialist),
        id:'',
        type:parseType(object),
    }
    

    const verify=(verifyEntry:newEntry):Entry=>{
      if(verifyEntry.type==="HealthCheck"){
      const newEntry : Entry ={
        ...verifyEntry,
        type:"HealthCheck",
        healthCheckRating:parseHealthCheck(object.healthCheckRating)
      }
      return newEntry
    } else if(verifyEntry.type==="Hospital"){
        const newEntry : Entry ={
          ...verifyEntry,
          type:"Hospital",
          discharge:parseDischarge(object.discharge)
        }
        return newEntry
      }

    const newEntry : Entry ={
      ...verifyEntry,
      type:"OccupationalHealthcare",
      employerName:parseEmployerName(object.employerName)
    }
    return newEntry

  }

  return verify(verifyEntry);
} 

export default toNewEntry;