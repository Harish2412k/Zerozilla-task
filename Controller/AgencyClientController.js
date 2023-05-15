const Agency = require('../Model/AgencyModel');
const Client = require('../Model/ClientModel');

const AgencyClient = {

    // Create a new agency and client in a single request       
    create : async(req,res) => {
        const { name, address1, state, city, phone,clientId, clientName, email, clientPhone, totalBill } = req.body;

        if (!name || !address1 || !state || !city || !phone || !clientId || !clientName || !email || !clientPhone || !totalBill) {
            return res.status(400).send('Missing required fields');
        }
    
        try {
            const agency = await Agency.create({
                name,
                address1,
                address2: req.body.address2 || '',
                state,
                city,
                phone
            });
        
            const client = await Client.create({
                clientId,
                agencyId: agency._id,
                name: clientName,
                email,
                phone: clientPhone,
                totalBill
            });
        
            agency.clients.push(client._id);
            await agency.save();
        
            res.status(201).json({ agency, client });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    //create a new client and add it to agency
    CreateClient : async (req,res) => {
        const {clientId,clientName, email, clientPhone, totalBill } = req.body;
        if (!clientId ||!clientName || !email || !clientPhone || !totalBill) {
            return res.status(400).send('Missing required fields');
        }
        
        try {
            const agency = await Agency.findByIdAndUpdate( {_id : req.params.id },req.body);
            
            const client = await Client.create({
                clientId,
                agencyId: agency._id,
                name: clientName,
                email,
                phone: clientPhone,
                totalBill
            });
        
            agency.clients.push(client._id);
            await agency.save();
        
            res.status(201).json({ agency, client });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    getAll : async(req,res) => {
        try {
            const agencies = await Agency.find().populate('clients');
            res.json(agencies);
          } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }
    },
    getSingle: async(req,res) => {
        try {
            const agency = await Agency.findById(req.params.id).populate('clients');
                if (!agency) {
                    return res.status(404).send('Agency not found');
                }
                let topClients = agency.clients.sort((a, b) => b.totalBill - a.totalBill).slice(0);
                    topClients = topClients.map(client => ({
                        clientName: client.name,
                        totalBill: client.totalBill
                    }));
                res.json({
                    agencyName: agency.name,
                    topClients
                });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    },
    UpdateAgency : async(req,res) => {
        try {
            let data = await Agency.findById({ _id: req.params.id })
                if(!data)
                return res.status(404).json({ msg: "Agency doesn't exists."})
    
            const agency = await Agency.findByIdAndUpdate( {_id : req.params.id },req.body);
                res.status(200).json({ msg: "Agency updated successfully", agency: agency })
          
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    updateClient : async(req,res) => {
        try {
            let data = await Client.findById({ _id: req.params.id })
                if(!data)
                return res.status(404).json({ msg: "Client doesn't exists."})
    
            const ClientUpdate = await Client.findByIdAndUpdate( {_id : req.params.id },req.body);
                res.status(200).json({ msg: "ClientUpdate successfully", ClientUpdate: ClientUpdate })
          
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    deleteAgency : async(req,res) => {
        try {
            let data = await Agency.findByIdAndDelete({ _id: req.params.id})
                if(!data)
                return res.status(404).json({ msg: "Agency doesn't exists."})

                res.status(200).json({ msg: "Agency Deleted successfully"})
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    },
    deleteClient : async(req,res) => {
        try {
            let data = await Client.findByIdAndDelete({ _id: req.params.id})
                if(!data)
                return res.status(404).json({ msg: "Client doesn't exists."})

                res.status(200).json({ msg: "Agency Deleted successfully"})
        } catch (err) {
            return  res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = AgencyClient