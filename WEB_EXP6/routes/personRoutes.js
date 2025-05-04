const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error('Error fetching people:', err);
    res.status(500).json({ message: 'Server error while fetching data' });
  }
});

// GET single person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    console.error('Error fetching person:', err);
    res.status(500).json({ message: 'Server error while fetching person' });
  }
});

// POST new person
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    console.error('Error creating person:', err);
    res.status(500).json({ message: 'Server error while creating person' });
  }
});

// PUT update person
router.put('/:id', async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating person:', err);
    res.status(500).json({ message: 'Server error while updating person' });
  }
});

// DELETE person
router.delete('/:id', async (req, res) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting person:', err);
    res.status(500).json({ message: 'Server error while deleting person' });
  }
});

module.exports = router;