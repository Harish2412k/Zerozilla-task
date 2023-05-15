const AgencyClientRouter = require('express').Router();
const AgencyClientController = require('../Controller/AgencyClientController')

AgencyClientRouter.post('/create', AgencyClientController.create);
AgencyClientRouter.post('/createClient/:id', AgencyClientController.CreateClient)

AgencyClientRouter.get('/getAll', AgencyClientController.getAll)

AgencyClientRouter.get('/single/:id', AgencyClientController.getSingle)

AgencyClientRouter.patch('/update/:id', AgencyClientController.UpdateAgency)
AgencyClientRouter.patch('/ClientUpdate/:id', AgencyClientController.updateClient)

AgencyClientRouter.delete('/AgencyDelete/:id', AgencyClientController.deleteAgency)
AgencyClientRouter.delete('/ClientDelete/:id', AgencyClientController.deleteClient)

module.exports = AgencyClientRouter