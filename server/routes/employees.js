// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/get', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new employee
router.post('/post', async (req, res) => {
  const { name, age, address, department } = req.body;
  try {
    const newEmployee = new Employee({ name, age, address, department });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update an employee by ID
router.put('/:id', async (req, res) => {
  const { name, age, address, department } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, age, address, department },
      { new: true }
    );
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
