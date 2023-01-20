const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./Doctor');
require('./user');
require('./Appointment');
require('./Prescription');

app.use(bodyParser.json());
const Doctor = mongoose.model('doctor');
const User = mongoose.model('user');
const Appointment = mongoose.model('appointment');
const Prescription = mongoose.model('prescription');
// 5Y1z8tzgY1nKEfkj

const mongoUri =
  'mongodb+srv://SyedUsamaShah:5Y1z8tzgY1nKEfkj@cluster0.mumqokd.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('connected to mongo ');
});
mongoose.connection.on('error', error => {
  console.log('error', error);
});

app.get('/d', (req, res) => {
  Doctor.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/a', (req, res) => {
  Appointment.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// app.get('/', async (req, res) => {
//   const result = await Appointment.find({});
//   res.send({
//     result,
//   });
// });

//appointment
app.post('/send-appoin', (req, res) => {
  console.log(req.body);
  const appointment = new Appointment({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    notes: req.body.notes,
  });
  appointment
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/appointment-delete/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Appointment Not Found'});
    }
    res.status(200).json({success: true, message: 'Appointment Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Appointment Routes (delete)',
      error: err,
    });
  }
});

app.put('/update-appointment/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
      },
      {new: true},
    );

    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Appointment Not Found'});
    }

    res
      .status(200)
      .send({user: result, message: 'Appointment Updated Successfully!'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Appointment Router (put)',
      error: err,
    });
  }
});

//prescription
app.get('/p', (req, res) => {
  Prescription.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/send-pres', (req, res) => {
  console.log(req.body);
  const prescription = new Prescription({
    medName: req.body.medName,
    prescriptionDetails: req.body.prescriptionDetails,
    uploadImg: req.body.uploadImg,
  });
  prescription
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/prescription-delete/:id', async (req, res) => {
  try {
    const result = await Prescription.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Prescription Not Found'});
    }
    res.status(200).json({success: true, message: 'Prescription Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Prescription Routes (delete)',
      error: err,
    });
  }
});

//doctordetails
app.post('/send-data', (req, res) => {
  console.log(req.body);
  const doctor = new Doctor({
    name: req.body.name,
    speciality: req.body.speciality,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  });
  doctor
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/delete', (req, res) => {
  Doctor.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data);
      res.send('Deleted');
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/update', (req, res) => {
  Doctor.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    speciality: req.body.speciality,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  })
    .then(data => {
      console.log(data);
      res.send('updated');
    })
    .catch(err => {
      console.log(err);
    });
});

// app.post('/register', async (req, res) => {
//   const {name, email, password} = req.body;
//   try {
//     await User.create({
//       name,
//       email,
//       password,
//     });
//     res.send({status: 'Registered'});
//   } catch (error) {
//     res.send({status: 'error'});
//   }
// });

app.post('/Login', (req, res) => {
  const {email, password} = req.body;
  User.findone({email: email}, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({message: 'login sucess', user: user});
      } else {
        res.send({message: 'wrong credentials'});
      }
    } else {
      res.send('not register');
    }
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  User.findOne({email: email}, (err, user) => {
    if (user) {
      res.send({message: 'user already exist'});
    } else {
      const user = new User({name, email, password});
      user.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.send({message: 'sucessfull'});
        }
      });
    }
  });
});

app.listen(5000, () => {
  console.log('server running');
});
