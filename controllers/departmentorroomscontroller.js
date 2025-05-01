const {Sequelize ,Datatypes} =require('sequelize');
const { Organizations, Locations, Departments_or_Rooms } = require('../config/db');
const departments_or_rooms = require('../models/departments_or_rooms');

module.exports.AddDepartment_or_Rooms = async( req , res, next  )=> {
  try{
    const{ department_or_room_name,organization_Id,locations_Id}= req.body;
        
        if( !department_or_room_name ||!organization_Id ||!locations_Id) {
            return res.status(400).json({error : "Required Fields are missing"});
        }
        const organizations = await Organizations.findByPk(organization_Id);
        if (!organizations) {
          return res.status(404).json({ error: 'organizations not found.' });
        }
        const locations = await Locations.findByPk(locations_Id);
        if (!organizations) {
          return res.status(404).json({ error: 'locations not found.' });
        }
    const newDepartmentorrooms = await Departments_or_Rooms.create({  
        department_or_room_name,
        organization_Id,
        locations_Id
    })
    res.status(201).json(newDepartmentorrooms);
  } catch (error) {
    console.error('Error creating Department or room Name:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.GetAllDepartment_or_Rooms = async (req, res, next) => {
    try {
      const departments_or_room = await Departments_or_Rooms.findAll({
      include: [
        {
          model: Organizations,
          attributes: ['organization_name'], 
        },
        {
            model: Locations,
            attributes: ['location_name']
        },
      ],
    });

      if (departments_or_room.length === 0) {
        return res.status(404).json({ message: 'No location found' });
      }
  
      res.status(200).json(departments_or_room);
    } catch (error) {
      console.error('Error fetching department or rooms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.Departments_or_RoomsDetails = async (req, res, next) => {
    try {
      const { departments_or_rooms_Id } = req.params;
      const departments_or_room = await Departments_or_Rooms.findByPk(departments_or_rooms_Id,{
        include: [
            {
              model: Organizations,
              attributes: ['organization_name'], 
            },
            {
                model: Locations,
                attributes: ['location_name']
            },
          ],
        });
  
      if (departments_or_room.length === 0) {
        return res.status(404).json({ message: 'No department or rooms found' });
      }
  
      res.status(200).json(departments_or_room);
    } catch (error) {
      console.error('Error fetching department or room:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
