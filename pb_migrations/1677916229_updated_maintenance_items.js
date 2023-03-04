migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w4d4tewo",
    "name": "mileage",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vauy23xj",
    "name": "months",
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
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w4d4tewo",
    "name": "mileage",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vauy23xj",
    "name": "months",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
