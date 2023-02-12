migrate((db) => {
  const collection = new Collection({
    "id": "6b72sddk63kgn72",
    "created": "2023-02-12 14:14:42.069Z",
    "updated": "2023-02-12 14:14:42.069Z",
    "name": "mileages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hvbjhs50",
        "name": "mileage",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "wsq3eyqe",
        "name": "vehicle",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "lacp65tmw2w9jsx",
          "cascadeDelete": true
        }
      }
    ],
    "listRule": "@request.auth.id = vehicle.user.id",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6b72sddk63kgn72");

  return dao.deleteCollection(collection);
})
