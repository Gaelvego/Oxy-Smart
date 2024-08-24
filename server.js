const express = require('express');
const app = express();
const port = 8383;
const { FieldValue } = require('firebase-admin/firestore')
const { db } = require('./firebase.js')

// Express routes and middleware go here
app.use(express.json())

const patients= {
    'james': 28,
    'larry': 29,
    'lucy': 30,
    'jerry': 31,
}

app.post('/addpatient', async (req, res) => {
    const { sensor, value } = req.body
    const patientsRef = db.collection('patients').doc('patient1')
    const res2 = await patientsRef.set({
        [sensor]: value
    }, { merge: true })
    // friends[name] = status
    res.status(200).send(patients)
})

app.patch('/changestatus', async (req, res) => {
    const { sensor, newValue } = req.body
    const peopleRef = db.collection('patients').doc('patient1')
    const res2 = await peopleRef.set({
        [sensor]: newValue
    }, { merge: true })
    // friends[name] = newStatus
    res.status(200).send(patients)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))



/*
wss.on('connection', (ws) => {
    console.log('Client connected');
  
    // Send mock data to the connected client
    db.collection('sensorData').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      ws.send(JSON.stringify(data));
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });*/
