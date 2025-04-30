const { Sequelize, DataTypes } = require('sequelize');
const { Trigger_hers } = require('../config/db');

module.exports.AddTriggerHers = async (req, res, next) => {
  try {
    const {
      organization,
      location,
      additional_location_details,
      department_or_room,
      emergency_code,
      additional_department_or_room_details,
      message
    } = req.body;

    if (!organization || !location || !additional_location_details || !emergency_code) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const newTriggerHers = await Trigger_hers.create({
      organization,
      location,
      additional_location_details,
      department_or_room,
      emergency_code,
      additional_department_or_room_details,
      message
    });

    res.status(201).json(newTriggerHers);
  } catch (error) {
    console.error('Error adding TriggerHers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.GetAllTriggerHers = async (req, res, next) => {
    try {
      const triggerhers = await Trigger_hers.findAll();
  
      if (triggerhers.length === 0) {
        return res.status(404).json({ message: 'No hers found' });
      }
  
      res.status(200).json(triggerhers);
    } catch (error) {
      console.error('Error fetching triggerhers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.TriggerHersDetails = async (req, res, next) => {
    try {
      const { triggerhers_Id } = req.params;
      const triggerhers = await Trigger_hers.findByPk(triggerhers_Id);
  
      if (triggerhers.length === 0) {
        return res.status(404).json({ message: 'No triggerhers found' });
      }
  
      res.status(200).json(triggerhers);
    } catch (error) {
      console.error('Error fetching triggerhers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };