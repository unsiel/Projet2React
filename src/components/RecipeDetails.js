import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecetteDetail = () => {
  const { id } = useParams();
  const [recette, setrecette] = useState(null);
  const Navigate = useNavigate();
  
  const lastPage = () => {
    Navigate('/');
  };

  useEffect(() => {
    const fetchrecette = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setrecette(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching recette details: ', error);
      }
    };

    fetchrecette();
  }, [id]);
  
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const toggleFavorite = () => {
    if (recette) {
      const isCurrentlyFavorite = favorites.some((favrecette) => favrecette.idMeal === recette.idMeal);
      if (isCurrentlyFavorite) {
        const updatedFavorites = favorites.filter((favrecette) => favrecette.idMeal !== recette.idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        const updatedFavorites = [...favorites, recette];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
    }
  };
  const isFavorite = recette && favorites.some((favrecette) => favrecette.idMeal === recette.idMeal);

  if (!recette) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
      <div className="card">
        <img src={recette.strMealThumb} className="card-img-top img-fluid mx-auto w-50 mt-2" alt={recette.strMeal}/>
        <div className="card-body">
          <h2 className="card-title text-center">{recette.strMeal}</h2>
          <p className="card-text">{recette.strInstructions}</p>
          <div className='row justify-content-around'> 
            <button className='btn btn-secondary mb-3' onClick={toggleFavorite}>{isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button>
            <button onClick={lastPage} className="btn btn-secondary mb-3">Retour</button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default RecetteDetail;