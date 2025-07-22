import React from 'react';
import { useRecipeStore } from '../recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  return (
    <button
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
          deleteRecipe(recipeId);
        }
      }}
      style={{marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px'}}
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
