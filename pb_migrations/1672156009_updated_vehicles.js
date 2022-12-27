migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6k3qrmek67fy2i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wzrqmxkx",
    "name": "user_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6k3qrmek67fy2i")

  // remove
  collection.schema.removeField("wzrqmxkx")

  return dao.saveCollection(collection)
})
