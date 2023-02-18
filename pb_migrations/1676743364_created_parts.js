migrate((db) => {
  const collection = new Collection({
    "id": "0m9oc0ids758h97",
    "created": "2023-02-18 18:02:44.681Z",
    "updated": "2023-02-18 18:02:44.681Z",
    "name": "parts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dxrtizkg",
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
        "id": "suypem83",
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
        "id": "psanhf5p",
        "name": "url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "7etziwnm",
        "name": "price",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("0m9oc0ids758h97");

  return dao.deleteCollection(collection);
})
