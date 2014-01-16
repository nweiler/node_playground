// basic-mongo.js
//import the mongo driver that we installed above and grab
// the MongoClient that helps us connect
var MongoClient = require("mongodb").MongoClient
// connecting requires passing a mongodb uri
// these can take lots of options, but here we keep it simple 
// and connect to the superhero db with a username and password
// you will need to change this!
MongoClient.connect("mongodb://localhost:27017/superhero", function(err, db) {
  // if we didn't connect, throw the error
  if (err) throw err

  // in mongo, documents are grouped in collection (like a table)
  // lets make one!
  var superheroes = db.collection("superheroes")
  // inserting a new document is easy, just pass arbitrary json
  superheroes.insert({name: "Addison", superpower: "insert"}, 
    function(err, result) {
      if (err) throw err

      // all documents in mongo get assigned a unique id, _id
      // we use this to find the document we just inserted
      var _id = result[0]._id

      // to update, we write a 'selector', and then the update
      // notice the use of $set, it is a special operator 
      // that sets the fields in the document, otherwise, we would
      // wipe out the existing document
      superheroes.update({_id: _id}, {$set: {superpower: "update"}}, function(err) {
        if (err) throw err

        // finding a document needs a selector like above
        superheroes.findOne({_id: _id}, function(err, doc) {
          if (err) throw err
          console.log(doc.name + " has the power to " + doc.superpower)
          // close our database so the process will die
          db.close()
        }) 
      })

   })
})
