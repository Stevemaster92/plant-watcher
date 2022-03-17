const db = require("firebase-admin").firestore();
const config = require("../config");

class FirestoreClient {
    constructor(collection = "") {
        this._collection = collection;
    }

    get collection() {
        return db.collection(this._collection);
    }

    getKey(id) {
        return this._collection + "::" + id;
    }

    async put(item) {
        item.createdAt = Date.now();

        return await this.collection.doc().set(item);
    }

    async get(id) {
        const doc = await this.collection.doc(this.getKey(id)).get();

        if (doc.exists) {
            return doc.data();
        }

        throw new Error("No such document found");
    }

    async getAll(where = [], orderBy = "") {
        let coll = this.collection;

        if (where && where.length >= 3) {
            coll = coll.where(...where);
        }
        if (orderBy) {
            coll = coll.orderBy(orderBy);
        }

        const snapshot = await coll.get();

        const items = [];
        if (!snapshot.empty) {
            snapshot.forEach((doc) => {
                items.push(doc.data());
            });
        }

        return items;
    }
}

class Stations extends FirestoreClient {
    constructor() {
        super("Station");
    }

    async get(id) {
        const item = await super.get(id);

        // If no config is present, assign the default config.
        if (item && !item.hasOwnProperty("config")) {
            item.config = config.item;
            this.put(item);
        }

        return item;
    }

    async put(item) {
        // If no config is present, assign the default config.
        if (item && !item.hasOwnProperty("config")) {
            item.config = config.station;
        }

        if (item && !item.hasOwnProperty("createdAt")) {
            item.createdAt = Date.now();
        }

        return await this.collection.doc(this.getKey(item.stationId)).set(item);
    }
}

class SensorData extends FirestoreClient {
    constructor() {
        super("SensorData");
    }

    async getAll(where, orderBy) {
        const data = await super.getAll(where, orderBy);

        // Convert timestamp in ms to Date object.
        data.map((d) => (d.createdAt = new Date(d.createdAt)));

        return data;
    }

    getAllByStation(stationId) {
        return this.getAll(["stationId", "==", Number.parseInt(stationId)], "createdAt");
    }
}

module.exports = {
    Stations,
    SensorData,
};
