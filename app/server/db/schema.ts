import { Db, MongoServerError } from 'mongodb';

const validateWithSchema = async (db: Db) => {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'city', 'country', 'longitude', 'latitude'],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: 'string',
                    description: '"name" is required'
                },
                city: {
                    bsonType: 'string',
                    description: '"city" is required'
                },
                region: {
                    bsonType: 'string'
                },
                country: {
                    bsonType: 'string',
                    description: '"country" is required'
                },
                flag: {
                    bsonType: 'string'
                },
                longitude: {
                    bsonType: 'decimal',
                    description: '"longitude" is required'
                },
                latitude: {
                    bsonType: 'decimal',
                    description: '"latitude" is required'
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
