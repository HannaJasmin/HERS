const { Sequelize, DataTypes } = require('sequelize');
const { Hers } = require('../config/db');
const bcrypt = require('bcrypt');

module.exports.AddHers =async (req,res,next)=>{
   
    try {
        const { code_name,organization,code_color,category,description,primary_responders,secondary_responders,tertory_responders} = req.body;
  
       if (!code_name || !code_color || !organization || !category ||!description ||!primary_responders ||!secondary_responders ||!tertory_responders) {
         return res.status(400).json({ error: 'All fields are required.' });
        }

        const newHers = await Hers.create({
            code_name,
            code_color,
            organization,
            category,
            description,
            primary_responders,
            secondary_responders,
            tertory_responders
        });
    
        res.status(201).json(newHers);
      } catch (error) {
        console.error('Error adding Hers:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    module.exports.GetAllHers = async (req, res, next) => {
        try {
          const hers = await Hers.findAll();
      
          if (hers.length === 0) {
            return res.status(404).json({ message: 'No hers found' });
          }
      
          res.status(200).json(hers);
        } catch (error) {
          console.error('Error fetching hers:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      module.exports.HersDetails = async (req, res, next) => {
        try {
          const { hers_Id } = req.params;
          const hers = await Hers.findByPk(hers_Id);
      
          if (hers.length === 0) {
            return res.status(404).json({ message: 'No hers found' });
          }
      
          res.status(200).json(hers);
        } catch (error) {
          console.error('Error fetching hers:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };