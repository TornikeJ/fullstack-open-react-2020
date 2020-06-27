import express from 'express'
import patientsService from '../services/patients'
import toNewPatientsEntry from '../utils/toNewPatientsEntry';

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries())
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(patientsService.getPatient(id))
})

router.post('/', (req, res) => {
    try {
        const newPatientsEntry = toNewPatientsEntry(req.body)
        const addedEntry = patientsService.addEntry(newPatientsEntry)
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
})


export default router;