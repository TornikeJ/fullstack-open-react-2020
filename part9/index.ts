import express from 'express'
import { calculateBMI } from './bmi';

const app = express()

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!')
})

app.get('/bmi',(req,res)=>{
    if(!req.query.height){
        res.status(400).json({'error':'height is missing in queries'})
    } else if(isNaN(Number(req.query.height))){
        res.status(400).json({'error':'malformatted parameters'})
    }  
    const height=Number(req.query.height)
    
    if(!req.query.weight){
        res.status(400).json({'error':'weight is missing in queries'})
    } else if(isNaN(Number(req.query.weight))){
        res.status(400).json({'error':'malformatted parameters'})
    }  

    const weight=Number(req.query.weight)

    res.status(200).json(
        {
            weight,
            height,
            bmi: calculateBMI(height,weight)
        }
    )
})

const PORT=3003

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})