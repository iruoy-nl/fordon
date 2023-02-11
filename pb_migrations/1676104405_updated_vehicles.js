migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvc87m8j",
    "name": "photo",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lacp65tmw2w9jsx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvc87m8j",
    "name": "photo",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
