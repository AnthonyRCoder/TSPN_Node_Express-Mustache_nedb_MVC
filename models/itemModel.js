// models/item.js

const nedb = require('nedb');

class Item {
    constructor(dbFilePath = 'items.db') {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }

init() {
    this.db.insert({
      
    });

    console.log('db entry Peter item')

}        

getAllFoods() {
    // Return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        // Get the current date
        const currentDate = new Date();

        // Use the find() function of the database to get the data
        // Filter out expired items and items marked as unusable
        this.db.find({ $and: [{ expirationDate: { $gte: currentDate.toISOString() } }, { usable: true }] }, function(err, foods) {
            // If error occurs, reject Promise
            if (err) {
                reject(err);
            } else {
                resolve(foods); // If no error, resolve the promise with the filtered data
                // Log the returned data
                console.log('Function getAllFoods() returns: ', foods);
            }
        });
    });
}


       
addFood(productName, type, expirationDate, availability, imageUrl, pantry, price, usable, selected = false) {
    var food = {
        productName: productName,
        type: type,
        expirationDate: expirationDate,
        availability: availability,
        imageUrl: imageUrl,
        pantry: pantry,
        price: price,
        usable: usable,
        selected: selected
    };
    
    console.log('Adding food item:', food);
    this.db.insert(food, function(err, doc) {
        if (err) {
            console.log('Error inserting document:', err);
        } else {
            console.log('Document inserted into the database:', doc);
        }
    });
}

  getFoodsByUser(authorName) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'author': authorName }, function(err, foods) {
        if (err) {
            reject(err);
        } else {
            resolve(foods);
        console.log('getFoodsByUser returns: ', foods);
    }
})
})
}

getFoodsById(productID) {
    return new Promise((resolve, reject) => {
        this.db.find({ '_id': productID }, function(err, foods) {
        if (err) {
            reject(err);
        } else {
            resolve(foods);
        console.log('getFoodsById returns: ', foods);
    }
})
})
}


  deleteItemById(itemId) {
    return new Promise((resolve, reject) => {
        this.db.remove({ _id: itemId }, {}, (err, numRemoved) => {
            if (err) {
                reject(err);
            } else {
                resolve(numRemoved);
            }
        });
    });
}

updateSelectedItem(itemId) {
    // Return a Promise object to handle asynchronous operation
    return new Promise((resolve, reject) => {
        // Use NeDB's update method to update the item
        this.db.update({ _id: itemId }, { $set: { selected: true } }, {}, function(err, numAffected) {
            if (err) {
                reject(err); // If error, reject the Promise
            } else {
                resolve(numAffected); // If successful, resolve with the number of affected documents
            }
        });
    });
}



}

module.exports = Item;
