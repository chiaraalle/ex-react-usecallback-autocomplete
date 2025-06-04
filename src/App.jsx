/*
 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
Crea un campo di input (<input type="text">) in cui l’utente può digitare.

Effettua una chiamata API a: 
/products?search=[query]

La query deve essere sostituita con il testo digitato.
Mostra i risultati API sotto l'input in una tendina di suggerimenti.
Se l'utente cancella il testo, la tendina scompare.
Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
*/

import { useEffect, useState } from "react"

function App() {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([])

   useEffect(()=> {
    /*if(query.trim()){
      fetch(`http://localhost:3333/products?search=${query}`)
    .then(response => response.json())
    .then(data => setSuggestions(data))
    .catch(error => console.error(error))
    } else {
      setSuggestions([])
    }*/
    const fetchData = async () => {
      if (query.trim()) {
        try {
          const response = await fetch(`http://localhost:3333/products?search=${query}`);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Errore durante la ricerca:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
    
   }, [query])
  
   return (
    <>
    <div>
      <input
      type="text"
      placeholder="Cerca..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      />

       {suggestions.length > 0 ? (
        <ul className="suggestions-list">
          {suggestions.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : null}

    </div>
      
    </>
  )
}

export default App
