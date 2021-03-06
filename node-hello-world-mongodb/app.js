const { MongoClient } = require('mongodb')
var serviceBindings = require('kube-service-bindings');

let bindings;
try {
    // check if the deployment has been bound to a pg instance through
    // service bindings. If so use that connect info
    bindings = serviceBindings.getBinding('MONGODB', 'mongodb');
} catch (err) { // proper error handling here
};

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const url = bindings.url + '?retryWrites=true&w=majority';
    console.log('check url');
    console.log(url);
    console.log(bindings.connectionOptions);

    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(url, bindings.connectionOptions);

//    try {

    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to server');

 
    // Make the appropriate DB calls
    await  listDatabases(client);

    // Make the appropriate DB calls

    // Create a single new listing
    await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        }
    );

//    } finally {
        // Close the connection to the MongoDB cluster
//      await client.close();
//    }

}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

