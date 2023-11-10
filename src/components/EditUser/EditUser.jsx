import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './edituser.scss';

function EditUser() {
   
   const dispatch = useDispatch();

   
   const token = useSelector((state) => state.auth.token); // Obtient le token d'authentification
   const user = useSelector((state) => state.name.username); // Obtient le nom d'utilisateur actuel
   const firstname = useSelector((state) => state.name.firstname); // Obtient le prénom
   const lastname = useSelector((state) => state.name.lastname); // Obtient le nom de famille

   // État local pour gérer l'affichage du formulaire
   const [showForm, setShowForm] = useState(false);

   // État local pour stocker le nouveau nom d'utilisateur
   const [newUsername, setNewUsername] = useState('');

   // Fonction pour basculer l'affichage du formulaire
   const toggleForm = () => {
      setShowForm(!showForm);
   };

   // Fonction pour gérer les modifications dans le champ de saisie du nouveau nom d'utilisateur
   const handleInputChange = (event) => {
      setNewUsername(event.target.value);
   };

   // Fonction pour gérer la soumission du formulaire
   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         // Envoie une requête HTTP PUT au serveur pour mettre à jour le nom d'utilisateur
         const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userName: newUsername }),
         });

         if (response.ok) {
            console.log(response);

            // Met à jour le nom d'utilisateur dans le store Redux en dispatchant une action
            dispatch({
               type: 'SET_USER',
               payload: {
                  username: newUsername,
                  firstname: firstname,
                  lastname: lastname,
               },
            });
         } else {
            console.error('Erreur lors de l envoi du nouveau nom d utilisateur');
         }
      } catch (error) {
         console.error('Erreur lors de la requête :', error);
      }

      // Réinitialise le champ de saisie et masque le formulaire
      setNewUsername('');
      setShowForm(false);
   };

   // Utilise useEffect pour préremplir le champ de saisie avec le nom d'utilisateur actuel
   useEffect(() => {
      setNewUsername(user);
   }, [user]);

   // Rendu JSX du composant
   return (
      <>
         <section className="account-header">
            <h1>Welcome back, {firstname} {lastname}!</h1>

            {/* Affiche un bouton pour activer le formulaire */}
            {!showForm && (
               <button className="transaction-button button" onClick={toggleForm}>Edit your name</button>
            )}
         </section>

         {/* Affiche le formulaire de modification si showForm est vrai */}
         {showForm && (
            <form className="account-form" onSubmit={handleSubmit}>
               <label>First Name:</label>
               <input type="text" value={firstname} disabled/>
               
               <label>Last Name:</label>
               <input type="text" value={lastname} disabled />
               
               {/* Champ de saisie pour le nouveau nom d'utilisateur */}
               <label>New Username:</label>
               <input type="text" value={newUsername} onChange={handleInputChange} required/>
               
               {/* Bouton de confirmation pour soumettre le formulaire */}
               <button type="submit" className='transaction-button button'>Confirm</button>
            </form>
         )}
      </>
   );
}

export default EditUser;
