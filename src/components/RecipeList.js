import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import { Link } from 'react-router-dom';

const ListeRecettes = () => {
  const [recettes, setRecettes] = useState([]);
  const [newRecettes, setNewRecettes] = useState([]);
  
  const [showAuthmodal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);
  const validAuthModal = () => setShowAuthModal(false);

  const [favorites, setFavorites] = useState([]);

  const [email, setEmail] = useState('');
  const isEmailFilled = /^[^\s@]+@[^\s@]+[.]+[^\s@]+$/.test(email);

  const [password, setPassword] = useState('');
  const isPasswordFilled = /^(?=.*[A-Z])(?=.*\d).{12,}$/.test(password);

  const isFormValid = isEmailFilled && isPasswordFilled;

  useEffect(() => {
    const fetchrecettes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecettes(response.data.meals);
      } catch (error) {
        console.error('Error fetching recettes: ', error);
      }
    };
  
    fetchrecettes();
  
    const storedRecettes = localStorage.getItem('newRecettes');
    if (storedRecettes) {
      setNewRecettes(JSON.parse(storedRecettes));
    }
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const isFavoriterecette = (recetteId) => {
    return favorites.some((favrecette) => favrecette.idMeal === recetteId);
  };

  const handlerecetteSubmit = (newRecette) => {
    const updatedNewRecettes = [...newRecettes, newRecette];
    setNewRecettes(updatedNewRecettes);

    localStorage.setItem('newRecettes', JSON.stringify(updatedNewRecettes));
  };

  return (
    <div className="container"> 
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>

      <div className='row justify-content-around  bg-white'>
        <h1 className="text-center">Les recettes du chef</h1>
        <button className='btn btn-secondary mt-4 mb-4' onClick={openAuthModal}>S'identifier</button>
      </div>
      

      {showAuthmodal && (
        <div className='container bg-light mb-4 pb-4'>
          <h1 className='text-center'>Authentification</h1>
          <button className='btn btn-secondary' onClick={closeAuthModal}>Fermer</button>
          <form onSubmit={validAuthModal} className='col-md-5 mx-auto'>
            <div className="form-group">
              <label className='form-label'>Nom</label>
              <input type="text" name="name" className="form-control" required/>
            </div>
            <div className="form-group">
              <label class="form-label" htmlFor="email">Email :</label>
              <input class="form-control" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label className='form-label'>Mot de passe (doit contenir majuscule, chiffre et 12 caractères au moins)</label>
              <input type="password" id ="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" disabled={!isFormValid} className="btn btn-secondary">S'enregistrer</button>
          </form>
        </div>
      )}

      <div className="row bg-white">
        {recettes.map((recette) => (
          <div className="col-4 px-4 card" key={recette.idMeal}>
            <a style={{ color: 'inherit', textDecoration: 'none' }} href={`/recette/${recette.idMeal}`}>
              <img src={recette.strMealThumb} alt={recette.strMeal} className="img-fluid" />
              <p className="text-center">{recette.strMeal}{isFavoriterecette(recette.idMeal) && (
              <span className="text-warning">★</span>
            )}</p>
            </a>
          </div>
        ))}
        {newRecettes.map((recette, index) => (
          <div className="col-4 px-4 card" key={index}>
            <Link to={`http://localhost:3001/nouvelle-recette/${recette.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <img src={recette.image} alt={recette.name} className="img-fluid" />
              <p className="text-center">{recette.name} {isFavoriterecette(recette.idMeal) && (
              <span className="text-warning">★</span>
            )}</p>
            </Link>
          </div>
        ))}
      </div>
      <br></br>
      <RecipeForm onrecetteSubmit={handlerecetteSubmit} />
    </div>
  );
};

export default ListeRecettes;
