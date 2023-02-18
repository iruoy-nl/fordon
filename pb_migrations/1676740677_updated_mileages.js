migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6b72sddk63kgn72")

  collection.updateRule = "@request.auth.id = vehicle.user.id"
  collection.deleteRule = "@request.auth.id = vehicle.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6b72sddk63kgn72")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
