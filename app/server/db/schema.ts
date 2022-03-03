import { Db, MongoServerError } from 'mongodb';

const validateWithSchema = async (db: Db) => {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: ['longitude', 'latitude'],
            additionalProperties: false,
            properties: {
                _id: {},
                longitude: {
                    bsonType: 'number',
                    description: '"longitude" is required',
                },
                latitude: {
                    bsonType: 'number',
                    description: '"latitude" is required',
                }
            }
        }
    };

   await db.command({
        collMod: 'data',
        validator: jsonSchema
    }).catch(async (error: MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('data', {validator: jsonSchema});
        }
    });
};

export default validateWithSchema;
