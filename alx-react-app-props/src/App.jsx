import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <h1>User Profile</h1>
      <UserProfile
        name="Jane Doe"
        age={28}
        bio="Software engineer who loves building apps and exploring new technologies."
      />
    </div>
  );
}

export default App;
