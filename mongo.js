const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://<username>:<password>@cluster0.62frb.mongodb.net/<database>?retryWrites=true&w=majority'

const createProducts = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('products').insertOne(newProduct);
    } catch (error) {
        return res.json({message: 'Could not save data'});
    }
    client.close();

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    let products;

    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch (error) {
        return res.json({message: 'Could not fetch data'});
    }
    client.close();

    res.json(products);
};

exports.createProducts = createProducts;
exports.getProducts = getProducts;