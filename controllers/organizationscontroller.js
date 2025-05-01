const {Sequelize ,Datatypes} =require('sequelize');
const { Organizations } = require('../config/db');

module.exports.AddOrganizations = async( req , res, next  )=> {
  try{
    const{ organization_name,organization_type,status,description}= req.body;
        
        if( !organization_name ||!organization_type ||!status ) {
            return res.status(400).json({error : "Required Fields are missing"});
        }

        const validStatuses = ['Active', 'Inactive'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: `Invalid status. Allowed values: ${validStatuses.join(', ')}` });
        }
    
    const newOrganizations = await Organizations.create({
        organization_name,
        organization_type,
        status,
        description: description || null
    })
    res.status(201).json(newOrganizations);
  } catch (error) {
    console.error('Error creating Organizations:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  }; 
  module.exports.GetAllOrganizations = async (req, res, next) => {
    try {
      const organizations = await Organizations.findAll();
  
      if (organizations.length === 0) {
        return res.status(404).json({ message: 'No organizations found' });
      }
  
      res.status(200).json(organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports.OrganizationsDetails = async (req, res, next) => {
    try {
      const { organizations_Id } = req.params;
      const organizations = await Organizations.findByPk(organizations_Id);
  
      if (organizations.length === 0) {
        return res.status(404).json({ message: 'No organization found' });
      }
  
      res.status(200).json(organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };  
   