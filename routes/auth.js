// 
//   file name: Auth route Handler
//   Student name: Arshdeep Singh
//   Student number: 301200480
//   Date : 24-06-2022  
//   Web App name: Portfolio
//
var express = require('express');
var router = express.Router();
var contacts = require('../models/contacts.model');
/* GET contacts listing.  READ */
router.get('/', function(req, res, next) {
    contacts.find({}).sort({ 'name': 1 }).exec((err, contacts) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('contacts/all-contacts', {
                title: 'Business Contacts',
                contacts: contacts
            });
        }
    });
});
//  GET the Contact Details page  to edit Contact
router.get('/:id', (req, res, next) => {

    const id = req.params.id;
    contacts.findById(id, (err, editcontact) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('contacts/details', {
                title: 'Edit Contact',
                contact: editcontact
            });
        }
    });
});
// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const updatecontact = {
      "_id": id,
      "name": req.body.name,
      "email": req.body.email,
      "number": req.body.number
  };
  contacts.update({"_id":id}, updatecontact,(err, updatecontact) => {
      if (err) {
          return console.error(err);
      } else {
        res.redirect("/auth/");
      }
  })

});
// GET - process the delete by contact id
router.get('/delete/:id', (req, res, next) => {
   const id = req.params.id;
   contacts.remove({"_id":id},(err) => {
    if (err) {
        return console.error(err);
    } else {
      res.redirect("/auth");
    }
  });

});
module.exports = router;