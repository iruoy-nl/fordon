migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // remove
  collection.schema.removeField("smpx0uy3")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smpx0uy3",
    "name": "mileage",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
