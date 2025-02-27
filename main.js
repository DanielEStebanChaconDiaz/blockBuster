// main.js
import { movis } from "./js/model/movis.js";
import { authors } from "./js/model/authors.js"

let obj;

obj = new movis();

console.log('1. Contar el número total de copias de DVD disponibles en todos los registros:', await obj.getAllCopiesNumber());
console.log('6. Listar todos los géneros de películas distintos:', await obj.getAllMoviesGenre());
console.log('7. Encontrar películas donde el actor con id 1 haya participado:', await obj.getAllMoviesForActor());
console.log('8. Calcular el valor total de todas las copias de DVD disponibles:', await obj.getAllDvdPrice());
console.log('9. Encontrar todas las películas en las que John Doe ha actuado:', await obj.getAllMoviesForJohnDoe());
console.log('13. Encontrar todas las películas en las que participan actores principales:', await obj.getAllMoviesForPrincipalActor());
console.log('14. Encontrar el número total de premios que se han otorgado en todas las películas:', await obj.getTotalMoviesAwards());
console.log('15. Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:', await obj.getJohnDoeBluerayMovies());
console.log('16. Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:', await obj.getAllMoviesForFiccionCience());
console.log('17. Encontrar la película con más copias disponibles en formato DVD:', await obj.getAllCopiesNumberOfMovies());
console.log('19. Calcular el valor total de todas las copias de Blu-ray disponibles:', await obj.getBlurayCopiesValue());
console.log('20. Encontrar todas las películas en las que el actor con id 2 haya participado:', await obj.getMoviesWithAuthor2())
obj.destructor();

obj = new authors()
console.log('2. Encontrar todos los actores que han ganado premios Oscar', await obj.getAllAuthorsAwards());
console.log('3. Encontrar la cantidad total de premios que ha ganado cada actor:', await obj.getAllTotalAwards());
console.log('4. Obtener todos los actores nacidos después de 1980:', await obj.getAllAuthorsYear());
console.log('5. Encontrar el actor con más premios:', await obj.getAllMostAwards());
console.log('10. Encontrar el número total de actores en la base de datos:', await obj.getTotalAuthors());
console.log('11. Encontrar la edad promedio de los actores en la base de datos:', await obj.getEdadProm());
console.log('12. Encontrar todos los actores que tienen una cuenta de Instagram:', await obj.getAllInstagram());
console.log('18. Encontrar todos los actores que han ganado premios después de 2015:', await obj.getAwards2015());