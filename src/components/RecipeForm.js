import React, { useState } from 'react';

const RecipeForm = ({ onRecipeSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { id, name, image, description };
    onRecipeSubmit(newRecipe);
    setId('');
    setName('');
    setImage('');
    setDescription('');
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div>
        <label className="form-label">Nom de la recette:</label>
        <input class="form-control" type="text" placeholder="Nom de la recette" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="form-group">
        <label className="form-label">URL de l'image:</label>
        <input class="form-control" type="text" placeholder="URL de l'image" value={image} onChange={(e) => setImage(e.target.value)}/>
      </div>
      <div className="form-group">
        <label className="form-label">Description de la recette:</label>
        <textarea class="form-control" placeholder="Description de la recette" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="form-group">
      <label className="form-label">ID de la recette:</label>
      <input className="form-control" type="number" placeholder="ID de la recette" value={id} onChange={(e) => setId(e.target.value)}/>
    </div>
      <button type="submit" className="btn btn-secondary">Ajouter la recette</button>
    </form>
  );
};

export default RecipeForm;
