const {Sequelize ,Datatypes} =require('sequelize');
const { Organizations, Locations } = require('../config/db');

module.exports.AddLocations = async( req , res, next  )=> {
  try{
    const{ location_name,organization_Id}= req.body;
        
        if( !location_name ||!organization_Id ) {
            return res.status(400).json({error : "Required Fields are missing"});
        }
        const organizations = await Organizations.findByPk(organization_Id);
        if (!organizations) {
          return res.status(404).json({ error: 'organizations not found.' });
        }
    const newLocations = await Locations.create({  
        location_name,
        organization_Id
    })
    res.status(201).json(newLocations);
  } catch (error) {
    console.error('Error creating Locations:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  }; 
  
  module.exports.GetAllLocations = async (req, res, next) => {
    try {
      const locations = await Locations.findAll({
      include: [
        {
          model: Organizations,
          attributes: ['organization_name'], 
        },
      ],
    });

      if (locations.length === 0) {
        return res.status(404).json({ message: 'No location found' });
      }
  
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.LocationsDetails = async (req, res, next) => {
    try {
      const { locations_Id } = req.params;
      const locations = await Locations.findByPk(locations_Id,{
        include: [
            {
              model: Organizations,
              attributes: ['organization_name'], 
            },
          ],
        });
  
      if (locations.length === 0) {
        return res.status(404).json({ message: 'No locations found' });
      }
  
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
