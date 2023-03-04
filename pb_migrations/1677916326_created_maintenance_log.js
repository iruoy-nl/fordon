migrate((db) => {
  const collection = new Collection({
    "id": "i5kdqbh3no4fb3k",
    "created": "2023-03-04 07:52:06.116Z",
    "updated": "2023-03-04 07:52:06.116Z",
    "name": "maintenance_log",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rhhqc2hv",
        "name": "vehicle",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "lacp65tmw2w9jsx",
          "cascadeDelete": true
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i5kdqbh3no4fb3k");

  return dao.deleteCollection(collection);
})
