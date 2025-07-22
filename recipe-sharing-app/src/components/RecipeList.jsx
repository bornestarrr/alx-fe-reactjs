import { Link } from 'react-router-dom';
// Inside map render
{recipes.map(recipe => (
  <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <Link to={`/recipe/${recipe.id}`}>
      <h3>{recipe.title}</h3>
    </Link>
    <p>{recipe.description}</p>
  </div>
))}
