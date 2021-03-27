import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes'
import useStorage from './hooks/storage.hook';
import 'materialize-css'

function App() {
  const {loadFromStorage} = useStorage;
  const isAuthenticated = loadFromStorage('user') && loadFromStorage('user').token;
  const routes = useRoutes(isAuthenticated);
  return (
    <Router>
      <div className="container">
        <h1> hello </h1>
        {routes}
      </div>
    </Router>
  )
}

export default App
