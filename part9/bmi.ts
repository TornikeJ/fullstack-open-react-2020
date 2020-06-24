const calculateBMI= (height:number, weight: number) :string =>{
    const heightToM=height/100;
    const result=weight/(heightToM*heightToM)

    console.log(result)

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
        return 'Obese Class I (Moderately obese)'
    }
    else if(result >= 35 && result <40){
        return 'Obese Class II (Severely obese)'
    }
    else if(result >= 40){
        return 'Obese Class III (Very severely obese)'
    }
}

console.log(calculateBMI(180,74))