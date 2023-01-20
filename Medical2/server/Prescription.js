const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  medName: String,
  prescriptionDetails: String,
  uploadImg: String,
});

mongoose.model('prescription', PrescriptionSchema);
