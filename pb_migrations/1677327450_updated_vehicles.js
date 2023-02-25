migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bxxdvorg",
    "name": "license_plate",
    "type": "text",
    "required": false,
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

  // remove
  collection.schema.removeField("bxxdvorg")

  return dao.saveCollection(collection)
})
