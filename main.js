/**
 * Scrivere la funzione getChefBirthday(id), che deve:
 * - Essere asincrona (async).
 * Utilizzare await per chiamare le API.
 * - Restituire una promise con la data di nascita dello chef con l'id passato come argomento.
 * - Grstire gli errori con try/catch e restituire un messaggio di errore in caso di fallimento.
 */

async function getChefBirthday(id) {
    try {
        // 1. Recuperare la recetta da https://dummyjson.com/recipes/{id}
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);

        if (!recipeResponse.ok) {
            throw new Error(`Errore nella richiesta della ricetta: ${recipeResponse.status}`);
        }

        const recipeData = await recipeResponse.json();

        // 2. Estrarre la userId dello chef dalla ricetta
        const userId = recipeData.userId;

        // 3. Recuperare i dettagli dello chef da https://dummyjson.com/users/{userId}
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);

        if (!userResponse.ok) {
            throw new Error(`Errore nella richiesta dell'utente: ${userResponse.status}`);
        }

        const userData = await userResponse.json();

        // 4. Restituire la data di nascita dello chef
        return userData.birthDate;
    } catch (error) {
        // Gestire gli errori e restituire un messaggio di errore
        console.error("Si è verificato un errore:", error.message);
        throw error; // Rilancia l'errore per permettere al chiamante di gestirlo
    }
}

// Esempio di utilizzo
getChefBirthday(1)
    .then(birthday => console.log("La data di nascita dello chef è:", birthday))
    .catch(error => console.error("Errore:", error.message));
