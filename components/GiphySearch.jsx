import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Input } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';
import Loader from './Loader';

function GiphySearch() {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [favorite, setFavorite] = useState([]);

  const API_KEY = process.env.GIPHY_API_KEY;
  console.log('giphyAPIIOI', API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'p3lbVi04fV3K6nJq7RauIiEUo9LUIVLT',
            limit: 100,
          },
        });

        console.log(results);
        setGifs(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // adds the favorite gifs id's
  const addToFavorite = (id) => {
    if (!favorite.includes(id)) setFavorite(favorite.concat(id));
    console.log(id);
  };

  // this one does the exact opposite, it removes the favorite gifs id's
  const removeFavorite = (id) => {
    const index = favorite.indexOf(id);
    console.log(index);
    const temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
  };

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return gifs.map((gif) => {
      return (
        <div key={gif.id}>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.likeButton}
              onClick={() => addToFavorite(gif.id)}
            >
              ❤️Fav{' '}
            </Button>
          </div>
          <Card>
            {' '}
            <Image src={gif.images.fixed_height.url} alt="" />
          </Card>
        </div>
      );
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: 'p3lbVi04fV3K6nJq7RauIiEUo9LUIVLT',
          q: search,
          limit: 100,
        },
      });
      setGifs(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  const findfavorite = gifs.filter((gif) => favorite.includes(gif.id));

  return (
    <div className={styles.main}>
      {renderError()}
      <div className={styles.formContainer}>
        <Input
          className={styles.search}
          value={search}
          onChange={handleSearchChange}
          placeholder="search"
        />
        <Button
          onClick={handleSubmit}
          inverted
          color="purple"
          className={styles.button}
        >
          Go
        </Button>
      </div>
      <div className={styles.gifContainer}>
        <div className={styles.gifList}>
          <div className={styles.gifs}>
            <h2 className={styles.allGifsTitle}>All Gifs</h2>
            <Card.Group>{renderGifs()}</Card.Group>
          </div>
        </div>
        <div className={styles.favoriteGiftsTitle}>
          <h1>Favorite Gifs</h1>
          {findfavorite.map((gif) => {
            return (
              <div key={gif.id}>
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.removeButton}
                    onClick={() => removeFavorite(gif.id)}
                  >
                    ❤️Remove
                  </Button>
                </div>
                <Card>
                  {' '}
                  <Image src={gif.images.fixed_height.url} alt="" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GiphySearch;
