migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6b72sddk63kgn72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6plmjgym",
    "name": "date",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6b72sddk63kgn72")

  // remove
  collection.schema.removeField("6plmjgym")

  return dao.saveCollection(collection)
})
