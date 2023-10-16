import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetails';
import NouvelleRecetteDetail from './components/NewRecipeDetails';

function App() {
  const [newRecettes, setNewRecettes] = useState([]);
  const [nouvelleRecette, setnouvelleRecette] = useState([]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeList newRecettes={newRecettes} />} />
        <Route path="/recette/:id" element={<RecipeDetail />} />
        <Route path="/nouvelle-recette/:id" element={<NouvelleRecetteDetail nouvelleRecette={nouvelleRecette} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;