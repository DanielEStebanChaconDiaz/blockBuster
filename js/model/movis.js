// movis.js
import { connect } from "../../helpers/db/connect.js";

export class movis extends connect {
  static instanceMovis;
  db;
  collection;
  constructor() {
    if (movis.instanceMovis) {
      return movis.instanceMovis;
    }
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection('movis');
    movis.instanceMovis = this;
  }
  destructor() {
    movis.instanceMovis = undefined;
    connect.instanceConnect = undefined;
  }
  async getAllCopiesNumber() {
    await this.conexion.connect();
    const res = await this.collection.aggregate([
      {
        $unwind: "$format"
      },
      {
        $match: {
          "format.name": "dvd"
        }
      },
      {
        $group: {
          _id: null,
          copias: { $sum: "$format.copies" }
        }
      }
    ]).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllMoviesGenre() {
    await this.conexion.connect();
    const res = await this.collection.aggregate(
      [
        {

          $unwind: "$genre"
        },
        {
          $group: {
            _id: "$genre",
          }
        },
        {
          $project: {
            _id: 0,
            genero: "$_id"
          }
        }
      ]
    ).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllMoviesForActor() {
    await this.conexion.connect();
    const res = await this.collection.aggregate([
      {

        $unwind: "$character"
      },
      {
        $match: {
          "character.id_actor": 1
        }
      }
    ]).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllDvdPrice() {
    await this.conexion.connect();
    const res = await this.collection.aggregate([
      {
        $unwind: "$format"
      },
      {
        $match: {
          "format.name": "dvd"
        }
      },
      {
        $group: {
          _id: null,
          valor: { $sum: { $multiply: ["$format.value", "$format.copies"] } }
        }
      }
    ]).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllMoviesForJohnDoe() {
    await this.conexion.connect();
    const res = await this.collection.aggregate([
      {
        $unwind: "$character"
      },
      {
        $lookup: {
          from: "authors",
          localField: "character.id_actor",
          foreignField: "id_actor",
          as: "actor"
        }
      },
      {
        $match: {
          "actor.full_name": "John Doe"
        }
      }
    ]).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllMoviesForPrincipalActor() {
    await this.conexion.connect();
    const res = await this.collection.find({ "character.rol": "principal" }, { name: 1, "character.$": 1 }).toArray();
    await this.conexion.close();
    return res;
  }
  async getAllMoviesForFiccionCience() {
    await this.conexion.connect();
    const res = await this.collection.find(
      {
        genre: "Ciencia Ficcion",
        "character.id_actor": 3
      },
      {
        name: 1,
        genre: 1,
        "character.$": 1
      }
    ).pretty(); toArray();
    await this.conexion.close();
    return res;
  }
  async getAllCopiesNumberOfMovies() {
    await this.conexion.connect();
    const res = await this.collection.aggregate([
      { $unwind: "$format" },
      { $match: { "format.name": "dvd" } },
      { $sort: { "format.copies": -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          name: 1,
          "format.name": 1,
          "format.copies": 1
        }
      }
    ]).toArray();
    await this.conexion.close();
    return res;
  }
  async getTotalMoviesAwards() {
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "character.id_actor",
          foreignField: "id_actor",
          as: "actor_info"
        }
      },
      {
        $unwind: "$actor_info"
      },
      {
        $unwind: "$actor_info.awards"
      },
      {
        $group: {
          _id: null,
          total_premios: { $sum: 1 }
        }
      }
    ]).toArray();
    await this.conexion.close();
    return data;
  }
  async getJohnDoeBluerayMovies() {
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "character.id_actor",
          foreignField: "id_actor",
          as: "actor_info"
        }
      },
      {
        $match: {
          "actor_info.full_name": "John Doe",
          "format.name": "Bluray"
        }
      },
      {
        $project: {
          name: 1,
          formato: "$format.name",
          _id: 0
        }
      }
    ]).toArray();
    await this.conexion.close();
    return data;
  }
  async getBlurayCopiesValue() {
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate([
      {
        $unwind: "$format"
      },
      {
        $match: {
          "format.name": "Bluray"
        }
      },
      {
        $group: {
          _id: null,
          valor_total: {
            $sum: { $multiply: ["$format.copies", "$format.value"] }
          },
          copias: { $first: "$format.copies" }
        }
      },

      {
        $project: {
          _id: 0,
          valor_total: 1,
          copias: 1
        }
      }


    ]).toArray();
    await this.conexion.close();
    return data;
  }
  async getMoviesWithAuthor2() {
    await this.conexion.connect();
    const collection = this.db.collection('movis');
    const data = await collection.aggregate([
      {
        $match: {
          "character.id_actor": 2
        }
      },
      {
        $project: {
          name: 1,
          actores: "$character.id_actor",
          _id: 0
        }
      }
    ]).toArray();
    await this.conexion.close();
    return data;
  }
}