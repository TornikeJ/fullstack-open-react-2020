interface calculateBMIValues {
    value1: number;
    value2: number;
  }

const parseArguments = (args: Array<string>) : calculateBMIValues => {
    if(args.length !== 4){
        throw new Error('Provided should be four inputs')
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          value1: Number(args[2]),
          value2: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBMI= (height:number, weight: number) : string => {
    const heightToM=height/100;
    const result=weight/(heightToM*heightToM)

    if(result < 15){
        return 'Very severely underweight'
    } 
    else if(result >= 15 && result <16){
        return 'Severely underweight'
    }
    else if(result >= 16 && result <18.5){
        return 'Underweight'
    }
    else if(result >= 18.5 && result <25){
        return 'Normal (healthy weight)'
    }
    else if(result >= 25 && result <30){
        return 'Overweight'
    }
    else if(result >= 30 && result <35){
        return 'Obese Class I (Moderately obese)'
    }
    else if(result >= 35 && result <40){
        return 'Obese Class II (Severely obese)'
    }
    else{
        return 'Obese Class III (Very severely obese)'
    }
}



try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBMI(value1, value2));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
