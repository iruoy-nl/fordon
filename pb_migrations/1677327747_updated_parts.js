migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0m9oc0ids758h97")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8nzzniq2",
    "name": "cost",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0m9oc0ids758h97")

  // remove
  collection.schema.removeField("8nzzniq2")

  return dao.saveCollection(collection)
})
