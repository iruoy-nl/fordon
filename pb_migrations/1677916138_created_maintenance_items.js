migrate((db) => {
  const collection = new Collection({
    "id": "e63uni87349sjui",
    "created": "2023-03-04 07:48:58.433Z",
    "updated": "2023-03-04 07:48:58.433Z",
    "name": "maintenance_items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "coqrtfdu",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w4d4tewo",
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
        "id": "vauy23xj",
        "name": "months",
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
        "id": "ajyvrk02",
        "name": "action",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "tighten",
            "inspect",
            "replace",
            "clean"
          ]
        }
      },
      {
        "system": false,
        "id": "mqoosmyx",
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
  const collection = dao.findCollectionByNameOrId("e63uni87349sjui");

  return dao.deleteCollection(collection);
})
