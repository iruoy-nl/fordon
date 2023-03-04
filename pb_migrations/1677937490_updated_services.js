migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  collection.listRule = "@request.auth.id = vehicle.user.id"
  collection.createRule = "@request.auth.id = vehicle.user.id"
  collection.updateRule = "@request.auth.id = vehicle.user.id"
  collection.deleteRule = "@request.auth.id = vehicle.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  collection.listRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
