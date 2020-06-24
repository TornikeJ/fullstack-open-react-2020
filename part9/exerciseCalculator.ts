export interface result { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


interface calculateExerciseValues {
    value1: Array<number>;
    value2: number;
  }

const parseArguments = (args: Array<string>) : calculateExerciseValues => {

    const days : Array<String> = args.slice(2,args.length-1);
    let daysToInt : Array<number>=[]
    console.log(days);

    days.forEach((day: string) => {
        if(!isNaN(Number(day))){
            daysToInt.push(Number(day));
        } else{
            throw new Error('Provided values were not numbers!:'+day);
        }
    });

    if (!isNaN(Number(args[args.length-1]))) {
        return {
          value1: daysToInt,
          value2: Number(args[args.length-1])
        };
      } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (hours : Array<number>, target : number) : result =>{
    let sum=0;
    let trainingDays=0;

    hours.forEach(hour=> {
        if(hour>0){
            trainingDays+=1;
        }
        if(!isNaN(hour)){
            sum+=hour;
        }
    });

    const average=sum/hours.length;
    const success=average > target;
    const rating=average >= target? 3:average>=target*2/3? 2:1;
    const ratingDescription=rating === 3? 'cool keep going' : rating ===2? 'not too bad but could be better':'are you even trying?';

    const result : result ={
        periodLength:hours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return result;
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value1, value2));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
