import express from 'express';
import { calculateBMI } from './bmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res)=>{
    if(!req.query.height){
        res.status(400).json({'error':'height is missing in queries'});
    } else if(isNaN(Number(req.query.height))){
        res.status(400).json({'error':'malformatted parameters'});
    }  
    const height=Number(req.query.height);
    
    if(!req.query.weight){
        res.status(400).json({'error':'weight is missing in queries'});
    } else if(isNaN(Number(req.query.weight))){
        res.status(400).json({'error':'malformatted parameters'});
    }  

    const weight=Number(req.query.weight);

    res.status(200).json(
        {
            weight,
            height,
            bmi: calculateBMI(height,weight)
        }
    );
});

app.post('/exercises',(req,res)=>{
    const body=req.body
    if(!req.body.daily_exercises){
        res.status(400).json({'error':'daily exercises are missing'});
    }

    const exercises=body.daily_exercises
    
    exercises.forEach((exercise: number) =>{
        if(isNaN(exercise)){
            res.status(400).json({'error':'malformatted parameters'});
        }
    })
    
    if(!req.body.target){
        res.status(400).json({'error':'targets are missing'});
    } else if(isNaN(req.body.target)){
        res.status(400).json({'error':'malformatted parameters'});
    }

    const target=body.target

    res.status(200).json(calculateExercises(exercises, target))
})

const PORT=3003;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});