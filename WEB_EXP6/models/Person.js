const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Customer', 'Supplier', 'Employee', 'Manager', 'Owner', 'Adviser']
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Person', personSchema);