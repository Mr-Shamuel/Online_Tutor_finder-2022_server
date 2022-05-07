

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const ObjectId = require('mongodb').ObjectId;
const password = 'HVT6a9kkMhUPgGaQ';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shamuel:shamuel@cluster0.3dkyp.mongodb.net/OnlineTutor2022?retryWrites=true&w=majority";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = 4000;

app.get('/', (req, res) => {
    res.send("Hey sam, Server stared!");
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const ClientsCollection = client.db("OnlineTutor2022").collection("Clients");
    const PostFormCollection = client.db("OnlineTutor2022").collection("PostForm");
    const UpdateTutorCollection = client.db("OnlineTutor2022").collection("UpdateTutor");
    const UpdateStudentCollection = client.db("OnlineTutor2022").collection("UpdateStudent");
    const applicantDetailsCollection = client.db("OnlineTutor2022").collection("applicant");

    //adding info to database

    app.post('/Clients', (req, res) => {

        const name = req.body.name;
        const mail = req.body.email;
        const pass = req.body.password;
        const phone = req.body.phone;
        const institute = req.body.institute;
        const gender = req.body.gender;
        const role = req.body.role;
        ClientsCollection.insertOne({ name, mail, pass, gender, role, phone, institute })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })





    app.get('/Clients', (req, res) => {
        ClientsCollection.find({})
            .toArray((err, documents) => {
                console.log(documents);
                res.send(documents);
            })
    });


    //adding role 

    app.post('/role', (req, res) => {
        const email = req.body.email;
        // console.log(req.body);
        ClientsCollection.find({ mail: email })
            .toArray((err, documents) => {
                // console.log(documents);
                res.send(documents);
            })
    })
    

    // post a form  as a student
    app.post('/PostForm', (req, res) => {

        const name = req.body.name;
        const email = req.body.email;

        const phone = req.body.phone;
        const institute = req.body.institute;
        const location = req.body.location;
        const medium = req.body.medium;
        const salary = req.body.salary;
        const className = req.body.class;
        const subject = req.body.subject;
        PostFormCollection.insertOne({ name, email, phone, institute, location, medium, salary, subject, className })
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/postinfo', (req, res) => {
        PostFormCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    app.post('/isUser', (req, res) => {
        const email = req.body.email;
        // console.log(req.body);
        UpdateTutorCollection.find({ email: email })
            .toArray((err, documents) => {
                // console.log(documents);
                res.send(documents);
            })
    })

    app.patch('/teacherUpdate/:id', (req, res) => {
        const location = req.body.location;
        const medium = req.body.medium;
        const salary = req.body.salary;
        const className = req.body.class;
        const subject = req.body.subject;
        const email = req.body.email;
        console.log(location, medium, salary);
        UpdateTutorCollection.updateOne({ _id: ObjectId(req.params.id) }
            , {
                $set: { location: location, medium: medium, salary: salary, className: className, subject: subject },
            })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
    })
    app.post('/isStudent', (req, res) => {
        const email = req.body.email;
        // console.log(req.body);
        UpdateStudentCollection.find({ email: email })
            .toArray((err, documents) => {
                // console.log(documents);
                res.send(documents);
            })
    })

    //   student update
    app.patch('/studentUpdate/:id', (req, res) => {

        const email = req.body.email;
        const name = req.body.name;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const institute = req.body.institute;

        UpdateStudentCollection.updateOne({ _id: ObjectId(req.params.id) }
            , {
                $set: { email: email, name: name, phone: phone, gender: gender, institute: institute },
            })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
    })

    app.post('/UpdateStudent', (req, res) => {

        const email = req.body.email;
        const name = req.body.name;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const institute = req.body.institute;
        UpdateStudentCollection.insertOne({ email, name, institute, gender, phone })
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0);
            })
    })
    // UpdateTutor
    app.post('/UpdateTutor', (req, res) => {

        const location = req.body.location;
        const medium = req.body.medium;
        const salary = req.body.salary;
        const className = req.body.class;
        const subject = req.body.subject;
        const email = req.body.email;
        UpdateTutorCollection.insertOne({ email, location, medium, salary, subject, className })
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/updateinfo', (req, res) => {
        UpdateTutorCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    // for student
    app.get('/updateinfo2', (req, res) => {
        UpdateStudentCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    //applied tution info
    //    app.post('/applicantDetails' , (req, res) => {
    //     const applicant = req.body;
    //     console.log(applicant );

    //     applicantDetailsCollection.insertOne(applicant)
    //     .then(result => {
    //         res.send(result.insertedCount > 0);
    //     })
    // })

    // applying to student
    app.post('/applicantDetails', (req, res) => {


        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const gender = req.body.gender;

        applicantDetailsCollection.insertOne({ email, name, phone, gender })
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/applicantresponse', (req, res) => {
        applicantDetailsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    });
    










});

app.listen(process.env.PORT || port);