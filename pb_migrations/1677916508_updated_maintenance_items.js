migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  collection.name = "services"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui")

  collection.name = "maintenance_items"

  return dao.saveCollection(collection)
})
