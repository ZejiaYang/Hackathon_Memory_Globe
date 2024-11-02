/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

/* global use, db */
// MongoDB Playground
const database = 'memory_database';
const collection = 'memories';

// Switch to (or create) the new database.
use(database);

// Modify the existing collection to update its schema.
db.runCommand({
  collMod: collection,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["text", "keywords", "emotion_scores", "neighbours"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Unique identifier for each memory entry."
        },
        timestamp: {
          bsonType: "date",
          description: "Date when the memory was created or last updated."
        },
        text: {
          bsonType: "string",
          description: "The main text content of the memory."
        },
        keywords: {
          bsonType: "object",
          required: ["noun", "adjective", "verb"],
          properties: {
            noun: {
              bsonType: "array",
              items: {
                bsonType: "string",
                description: "Array of strings representing noun keywords."
              },
              description: "Keywords that are nouns."
            },
            adjective: {
              bsonType: "array",
              items: {
                bsonType: "string",
                description: "Array of strings representing adjective keywords."
              },
              description: "Keywords that are adjectives."
            },
            verb: {
              bsonType: "array",
              items: {
                bsonType: "string",
                description: "Array of strings representing verb keywords."
              },
              description: "Keywords that are verbs."
            }
          },
          description: "Object containing arrays of keyword types: noun, adjective, and verb."
        },
        emotion_scores: {
          bsonType: "array",
          items: {
            bsonType: "double",
            description: "List of numeric values representing emotion scores."
          },
          description: "Array of numeric values for each emotion score."
        },
        neighbours: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
            description: "Array of ObjectIds representing neighbouring memories."
          },
          description: "List of neighbouring memory references."
        }
      }
    }
  }
});


// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

