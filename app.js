var MongoClient = require('mongodb').MongoClient;
var serviceBindings = require('kube-service-bindings');
var _db;

let bindings;
try {
    // check if the deployment has been bound to a pg instance through
    // service bindings. If so use that connect info
    bindings = serviceBindings.getBinding('MONGODB', 'mongodb');
    console.log('check bindings');
    console.log(bindings);
} catch (err) { // proper error handling here
};

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const url = bindings.url + '?retryWrites=true&w=majority';
    console.log('check url 1001');
    console.log(url);
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    MongoClient.connect(url, bindings.connectionOptions, function(err, db) {
                                   if (err) {
                                        console.log(err);
                                        console.log(url);
                                        console.log(bindings.connectionOptions);
                                    } else {
                                        _db = db;
                                    }
console.log(_db);
listDatabases(_db);

});
    console.log('check client');
    //console.log(client);

//    try {

    // Connect to the MongoDB cluster
    //await client.connect();
    console.log('Connected successfully to server');

 
    // Make the appropriate DB calls
    //await  listDatabases(_db);
    // Create a single new listing
    console.log('add to collection');
    await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        }
    );


    // Make the appropriate DB calls

//    } finally {
        // Close the connection to the MongoDB cluster
//        await client.close();
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

async function createListing(client, newListing){
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
    const result = await client.db("pacman").collection("pacman").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
