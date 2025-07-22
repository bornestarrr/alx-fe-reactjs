import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ ...recipe, title, description });
    setEditing(false);
  };

  if (!editing) {
    return <button onClick={() => setEditing(true)}>Edit</button>;
  }

  return (
    <form onSubmit={handleSubmit} style={{marginTop: '10px'}}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{marginRight: '10px', padding: '5px'}}
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        style={{marginRight: '10px', padding: '5px'}}
      />
      <button type="submit" style={{marginRight: '5px'}}>Save</button>
      <button type="button" onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
