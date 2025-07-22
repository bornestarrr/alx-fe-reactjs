import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if(title.trim() === '') return; // simple validation
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{padding: '5px', marginRight: '10px'}}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={3}
        style={{padding: '5px', marginRight: '10px', verticalAlign: 'top'}}
      />
      <button type="submit" style={{padding: '5px 10px'}}>Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
