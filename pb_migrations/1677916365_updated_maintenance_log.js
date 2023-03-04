migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hezxwzpj",
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
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  // remove
  collection.schema.removeField("hezxwzpj")

  return dao.saveCollection(collection)
})
