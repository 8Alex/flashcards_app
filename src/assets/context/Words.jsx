import React, { useState, useEffect } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
const WordsContext = React.createContext();

function WordsContextProvider(props) {
  const [wordsСollection, setWordsСollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getWords();
  }, []);

  const getWords = () => {
    setIsLoading(true);
    fetch('itgirlschool/api/words')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsError(true);
        }
      })
      .then((response) => {
        setWordsСollection(response);
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editWords = (word) => {
    fetch(`itgirlschool/api/words/${word.id}/update`, {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          getWords();
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  const deleteWords = (id) => {
    fetch(`itgirlschool/api/words/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          getWords();
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  const addWords = (word) => {
    fetch('itgirlschool/api/words/add', {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          getWords();
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <WordsContext.Provider
      value={{
        wordsСollection,
        setWordsСollection,
        editWords,
        deleteWords,
        addWords,
      }}
    >
      {props.children}
    </WordsContext.Provider>
  );
}

export { WordsContextProvider, WordsContext };
