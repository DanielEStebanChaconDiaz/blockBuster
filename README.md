# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   [
     {
       $unwind: "$format"
     },
     {
       $match: {
         "format.name" : "dvd"
       }
     },
     {
       $group: {
         _id: null,
         copias : {$sum: "$format.copies"}
       }
     }
   ]
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   [
     {
       $unwind: "$awards"
     },
     {
       $match: {
         "awards.name" : "Oscar Award"
       }
     }
   ]
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   [
     {
       $unwind: "$awards"
     },
     {
       $group: {
         _id: "$full_name",
         total_awards : {$sum : 1}
       }
     }
   ]
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   [
     {
       $match: {
         "date_of_birth" : {$gt: "1980"}
       }
     }
   ]
   ```
   
5. **Encontrar el actor con más premios:**

   ```javascript
   [
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
   ]
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
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
       $project:{
         _id: 0,
         genero: "$_id"
       }
     }
   ]
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   [
     {
       
       $unwind: "$character"
     },
     {
       $match: {
         "character.id_actor" : 1
       }
     }
   ]
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   [
     {
       $unwind: "$format"
     },
     {
       $match: {
         "format.name" : "dvd"
       }
     },
     {
       $group: {
         _id: null,
         valor : {$sum:{$multiply: ["$format.value", "$format.copies"]}}
       }
     }
   ]
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
   [
     {
       $unwind: "$character"
     },
     {
       $lookup: {
         from: "actor",
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
   ]
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        $unwind : "$id_actor"
      },
      {
        $group: {
          _id: null,
          cantidad_actores : {$sum: 1}
        }
      }
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
      {
        $addFields: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [new Date(), "$birthdate"] },
                365 * 24 * 60 * 60 * 1000
              ]
            }
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
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    db.movis.find({
            "social_media.instagram": { $exists: 1}
        }).project({_id: 0, full_name: 1, social_media: 1})
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    db.movis.find({ "character.rol": "principal" }, { name: 1, "character.$": 1 })
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    [
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
    ]
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
  [
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
          formato : "$format.name",
          _id: 0
        }
      }
    ]
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    db.movis.find(
      { 
        genre: "Ciencia Ficcion", 
        "character.id_actor": 3 
      },
      { 
        name: 1, 
        genre: 1, 
        "character.$": 1 
      }
    ).pretty();
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    [
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
    ]
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
      {
        $unwind: "$awards"
      },
      {
        $match: {
          "awards.year" : {$gt: 2015}
        }
      }
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    [
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
            copias: {$first: "$format.copies"}
          }
        },
        
        {
          $project: {
            _id: 0,
            valor_total: 1,
            copias: 1
          }
        }
      
        
      ]
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
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
      ]
    ```

