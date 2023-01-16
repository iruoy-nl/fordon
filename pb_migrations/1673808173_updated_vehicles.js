migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  collection.listRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  collection.listRule = null

  return dao.saveCollection(collection)
})
