migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6k3qrmek67fy2i")

  // remove
  collection.schema.removeField("yns2smnj")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6k3qrmek67fy2i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yns2smnj",
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
