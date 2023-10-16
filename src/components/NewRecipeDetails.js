import { useParams , useNavigate } from 'react-router-dom';
import React from 'react';

function NouvelleRecetteDetail() {
    const Navigate = useNavigate();
    
    const lastPage = () => {
        Navigate('/');
    };

    const { id } = useParams();
    const nouvellesRecettes = JSON.parse(localStorage.getItem('nouvellesRecettes')) || [];
    const nouvelleRecette = nouvellesRecettes.find(recette => recette.id === id);

    if (!nouvelleRecette) {
        return (
        <div>
            <div>Recette non trouvée (c'était pas demandé de ne pas l'afficher)</div>
            <button onClick={lastPage} className="btn btn-secondary mb-3">Retour</button>
        </div>
        );
      }
    return (
        <div className="container">
        <div className="card">
            <img src={nouvelleRecette.image} className="card-img-top img-fluid mx-auto w-50 mt-2" alt={nouvelleRecette.name} />
            <div className="card-body">
            <h2 className="card-title text-center">{nouvelleRecette.name}</h2>
            <p className="card-text">{nouvelleRecette.description}</p>
            <button onClick={lastPage} className="btn btn-secondary mb-3">Retour</button>
            </div>
        </div>
        </div>
    );
}

export default NouvelleRecetteDetail;

