/*
Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
*/

import { useEffect, useState, useCallback } from "react"

function debounce(callback, delay){
  let timer;
  return(value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay)
  }
}
function App() {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([])

   
    const fetchData = useCallback(debounce(async (searchQuery) => {

      if (searchQuery.trim()) {
        try {
          const response = await fetch(`http://localhost:3333/products?search=${searchQuery}`);
          const data = await response.json();
          setSuggestions(data);
          console.log(data)
        } catch (error) {
          console.error('Errore durante la ricerca:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(query);
  }, [query, fetchData]);
  
   return (
    <>
    <div className="search-container">
      <input
      type="text"
      name="text"
      placeholder="Cerca..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
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
