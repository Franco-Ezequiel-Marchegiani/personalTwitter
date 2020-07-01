// *** Variables ***
const listaTweets = document.getElementById('lista-tweets');



//*** Event Listeners ***

eventListeners();

function eventListeners() {
     // Cuando se envía al formulario
     document.querySelector('#formulario').addEventListener('submit',agregarTweet);

     //Borrar Tweets
     listaTweets.addEventListener('click', borrarTweet);

     // Contenido cargado (DOM)
     document.addEventListener('DOMContentLoaded', localStorageListo);
}



// *** Funciones ***

//Añadir tweet del formulario
function agregarTweet(e) {
     e.preventDefault();
     
     //Lectura del valor del "textarea"
     const tweet = document.getElementById('tweet').value;

     // Crear botón de eliminar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText = 'X';

     //Creación del elemento e introducción del contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;

     // Añade el botón de borrar al tweet creado
     li.appendChild(botonBorrar);
     
     //Añade el tweet a la lista
     listaTweets.appendChild(li);


     //Añadir Tweet a Local Storage
     agregarTweetLocalStorage(tweet);
}

// Elimina Tweet del formulario
function borrarTweet(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-tweet') {
          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
     } 
}

// Mostrar datos del LocalStorage en la lista

function localStorageListo() {
     let tweets;
     
     tweets = obtenerTweetsLocalStorage();
     
     tweets.forEach(function(tweet) {
          // Crear botón de eliminar
             const botonBorrar = document.createElement('a');
                 botonBorrar.classList = 'borrar-tweet';
                  botonBorrar.innerText = 'X';

           //Creación del elemento e introducción del contenido a la lista
            const li = document.createElement('li');
             li.innerText = tweet;

         // Añade el botón de borrar al tweet creado
        li.appendChild(botonBorrar);
     
       //Añade el tweet a la lista
      listaTweets.appendChild(li);
     });
}


//Agrega Tweet a Local Storage
function agregarTweetLocalStorage(tweet) {
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     // Añadir el nuevo tweet
     tweets.push(tweet);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tweets', JSON.stringify(tweets) );
}


// Lectura de cantidad de tweets en local storage, retorna un
function obtenerTweetsLocalStorage() {
     let tweets;
     // Revisamos los valoes de local storage
     if(localStorage.getItem('tweets') === null ) {
          tweets = []; 
     } else {
          tweets = JSON.parse(localStorage.getItem('tweets') );
     }
     return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
     
     let tweets, tweetBorrar;
     
     //Toma 2 parámetros el "substring", desde donde hasta donde cortar (-1 para que no haya problema con la x)
     // Elimina la "X" del tweet
     tweetBorrar = tweet.substring(0, tweet.length - 1);
     
     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet, index){
          if(tweetBorrar === tweet) {
               tweets.splice(index, 1);
          }
     }) ;

     localStorage.setItem('tweets', JSON.stringify(tweets));

}