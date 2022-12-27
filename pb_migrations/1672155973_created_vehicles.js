migrate((db) => {
  const collection = new Collection({
    "id": "v6k3qrmek67fy2i",
    "created": "2022-12-27 15:46:13.281Z",
    "updated": "2022-12-27 15:46:13.281Z",
    "name": "vehicles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0xvgub8z",
        "name": "avatar",
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
      },
      {
        "system": false,
        "id": "yns2smnj",
        "name": "name",
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
        "id": "mmx0ddlu",
        "name": "model",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("v6k3qrmek67fy2i");

  return dao.deleteCollection(collection);
})
