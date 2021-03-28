import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes'
import useAuth from './hooks/auth.hook'
import AuthContext from './context/authContext'
import 'materialize-css'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Router>
        <div className="container">
          <h1> hello </h1>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
