migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptj4mrhi",
    "name": "model",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptj4mrhi",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
