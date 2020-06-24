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

const calculateBMI= (height:number, weight: number) => {
    const heightToM=height/100;
    const result=weight/(heightToM*heightToM)

    console.log(result)

    if(result < 15){
        console.log('Very severely underweight')
    } 
    else if(result >= 15 && result <16){
        console.log('Severely underweight')
    }
    else if(result >= 16 && result <18.5){
        console.log('Underweight')
    }
    else if(result >= 18.5 && result <25){
        console.log('Normal (healthy weight)')
    }
    else if(result >= 25 && result <30){
        console.log('Overweight')
    }
    else if(result >= 30 && result <35){
        console.log('Obese Class I (Moderately obese)')
    }
    else if(result >= 35 && result <40){
        console.log('Obese Class II (Severely obese)')
    }
    else if(result >= 40){
        console.log('Obese Class III (Very severely obese)')
    }
}



try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBMI(value1, value2);
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
