export interface result { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours : Array<number>, target : number) : result =>{
    if(hours.length !== 7){
        throw new Error('Not enough days provided')
    }

    let sum=0;
    let trainingDays=0;
    hours.forEach(hour => {
        if(hour>0){
            trainingDays+=1
        }
        sum+=hour
    });

    const average=sum/hours.length
    const success=average > target
    const rating=average >= target? 3:average>=target*2/3? 2:1
    const ratingDescription=rating === 3? 'cool keep going' : rating ===2? 'not too bad but could be better':'are you even trying?'

    const result : result ={
        periodLength:hours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }

    return result
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],3.5))