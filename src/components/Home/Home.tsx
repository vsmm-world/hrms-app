import './Home.css'

function Home() {

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the HRMS Portal</h1>
      {/* <p className="home-description">Keka? What Keka? Use this HRMS Portal and thank me later, buddy!</p> */}
      <p className="home-features">Explore our features:</p>
      <ul className="home-feature-list">
        <li className="home-feature">Employee Management</li>
        <li className="home-feature">Leave Management</li>
        <li className="home-feature">Role Managment </li>
        <li className="home-feature">Attandance Managment</li>
      </ul>
      <p className="home-signup">Sign up now to get started! <a href="/register">Sign up</a></p>
      <p className="home-login">Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Home;
