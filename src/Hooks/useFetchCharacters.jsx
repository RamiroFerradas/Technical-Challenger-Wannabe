import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { BASE_URL } from "../../BASE_URL";

export default function useFetchCharacters() {
  const [characters, setCharacters] = useLocalStorage("character", []);
  const [page, setPage] = useLocalStorage("page", 1);
  const [totalCharacters, setTotalCharacters] = useLocalStorage(
    "totalCharacters",
    ""
  );
  const fetchCharacters = async () => {
    try {
      const response = (await axios.get(`${BASE_URL}people/?page=${page}`))
        .data;
      setCharacters(await response.results);
      setTotalCharacters(await response.count);
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    if (!characters.length) fetchCharacters();
  }, [page, characters.length]);

  return {
    page,
    setPage,
    characters,
    totalCharacters,
    setCharacters,
    fetchCharacters,
    setTotalCharacters,
  };
}

//Hook perzonalizado para poder extraer los personajes de la api (10 por pedido) en la pagina que se le indique. Posible de reutilizar para extraer la informacion en cualquier parte de la pagina.
