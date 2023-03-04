migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d0u7d4ud",
    "name": "service",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "e63uni87349sjui",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d0u7d4ud",
    "name": "maintenance_item",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "e63uni87349sjui",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
