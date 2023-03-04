migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  collection.name = "logs"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k")

  collection.name = "maintenance_logs"

  return dao.saveCollection(collection)
})
