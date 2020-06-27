import express from 'express'
import patientsService from '../services/patients'
import toNewPatientsEntry  from '../utils/toNewPatientsEntry';
import toNewEntry  from '../utils/toNewEntry';

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
        const addedEntry = patientsService.addPatient(newPatientsEntry)
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id
        const newEntry = toNewEntry(req.body)
        const addedEntry = patientsService.addEntry(id, newEntry)
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
})


export default router;