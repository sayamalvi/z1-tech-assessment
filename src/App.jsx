import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'

function App() {

  return (
    <div className='outer-pokedex'>
      <div className='main-banner'>
        <h1 id="pokedex-heading">
          <Link to={'/'} className='home-route'>Mohammed Sayam Alvi - Z1 Tech Assessment (Pokemon App)</Link>
        </h1>
      </div>
      <CustomRoutes />
    </div>
  )
}

export default App
