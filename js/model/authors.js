import { connect } from "../../helpers/db/connect.js";

export class authors extends connect {
    static instanceauthors;
    db;
    collection;
    constructor() {
        if (authors.instanceAuthors) {
            return authors.instanceAuthors;
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('authors');
        authors.instanceAuthors = this;
    }
    destructor(){
        authors.instanceAuthors = undefined;
        connect.instanceConnect = undefined;
    }
    async getAllAuthorsAwards(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
              $unwind: "$awards"
            },
            {
              $match: {
                "awards.name" : "Oscar Award"
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getAllTotalAwards(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
              $unwind: "$awards"
            },
            {
              $group: {
                _id: "$full_name",
                total_awards : {$sum : 1}
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getAllAuthorsYear(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
              $match: {
                "date_of_birth" : {$gt: "1980"}
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getAllMostAwards(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
              $unwind: "$awards"
            },
            {
              $group: {
                _id: "$full_name",
                total_awards : {$sum : 1}
              }
            },
            {
              $sort: {
                "total_awards": -1
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getTotalAuthors(){
        await this.conexion.connect();
        const res = await this.collection.countDocuments();
        await this.conexion.close();
        return res;
    }
    async getAllInstagram(){
        await this.conexion.connect();
        const res = await this.collection.find({
            "social_media.instagram": { $exists: 1}
        }).project({_id: 0, full_name: 1, social_media: 1}).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getAwards2015(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
              $unwind: "$awards"
            },
            {
              $match: {
                "awards.year" : {$gt: 2015}
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
    async getEdadProm(){
        await this.conexion.connect();
        const res = await this.collection.aggregate([
            {
                $project: {
                        age:{
                            $subtract:[
                                {$year: new Date()},
                                {$year:{$dateFromString:{dateString: "$date_of_birth"}}}
                            ]
                        }
                }
            },
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                }
            },
            {
              $project: {
                _id: 0,
                averageAge: 1
              }
            }
          ]).toArray(); 
        await this.conexion.close();
        return res;
    }
}