// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArr) {

    const directors = moviesArr.map(movie => {
        return movie.director;
    });

    return directors;

}

function getUniqueDirectors(moviesArr) {
    return getUnique(getAllDirectors(moviesArr));
}

function getUnique(arr) {

    if (!arr.length) return null;

    const newArray = [];

    arr.forEach(element => {

        if (!newArray.includes(element)) {
            newArray.push(element);
        };
    });

    return newArray;

}

// console.log(getAllDirectors(movies));
// console.log(getUniqueDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArr) {

    if (!moviesArr) return 0;

    const moviesSteven = moviesArr.filter(function (movie) {

        const containsDrama = movie.genre.includes("Drama");

        const isSteven = movie.director === "Steven Spielberg";

        return (isSteven === true && containsDrama === true);

    });

    return moviesSteven.length;

}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    if (!moviesArray.length) return 0;

    const totalScore = moviesArray.reduce(function (acc, movie) {

        let score = 0;

        if (movie.score) {
            score = movie.score;
        }

        // const score = movie.score? movie.score: 0;

        return acc + score;

    }, 0);

    const avg = totalScore / moviesArray.length;


    //console.log(avg, +avg.toFixed(2));


    return +avg.toFixed(2);


}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

    const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));

    const avgDramaMovies = scoresAverage(dramaMovies);

    return avgDramaMovies;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    const newArray = moviesArray.map(m => m);

    const sortedMovies = newArray.sort((a, b) => {
        if (a.year > b.year) {
            return 1;
        } else if (a.year < b.year) {
            return - 1;
        } else {
            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }
        }
    });

    return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    const newArray = moviesArray.map(m => m);

    const sortedMovies = newArray.sort((a, b) => {

        if (a.title > b.title) return 1
        else if (a.title < b.title) return -1
        else return 0;
    });

    const allTitles = sortedMovies.map(movie => movie.title);

    const first20Titles = allTitles.slice(0, 20);

    // console.log(allTitles, first20Titles);

    return first20Titles;

}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {

    const newArray = JSON.parse(JSON.stringify(moviesArray));

    const newArray2 = newArray.map(m => {

        const durPartsArray = m.duration.split(' ');

        let hour = 0;
        let minutes = 0;

        if (durPartsArray.length > 1) {
            hour = +durPartsArray[0].replace('h', '');
            minutes = +durPartsArray[1].replace('min', '');
        }
        else {

            if (durPartsArray[0].includes('h'))
                hour = +durPartsArray[0].replace('h', '');
            else
                minutes = +durPartsArray[0].replace('min', '');

        }

        const totalMinutes = (hour * 60) + minutes;

        m.duration = totalMinutes;

        return m;

    });

    return newArray2;

}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if(!moviesArray.length) return null;


    const yearsArr = [];

    moviesArray.forEach(movie => {

        let yearObj = yearsArr.find(y => y.year === movie.year);

        if (!yearObj) {

            yearObj = {
                year: movie.year,
                totalScore: 0,
                countMovies: 0
            };

            yearsArr.push(yearObj);

        }

        yearObj.totalScore += movie.score;

        yearObj.countMovies++;

    });


    yearsArr.forEach(y => {
        y.avg = y.totalScore / y.countMovies;
    });

    yearsArr.sort((a, b) => {

        if(a.avg > b.avg) return -1
        else if (a.avg < b.avg) return 1
        else {
            if (a.year > b.year) return 1
            else if (a.year < b.year) return -1
            else return 0
        }


    });

    return `The best year was ${yearsArr[0].year} with an average score of ${yearsArr[0].avg}`;

}
