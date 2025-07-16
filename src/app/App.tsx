import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import {routes} from '../routes/routes'
import {CartProvider} from '../context/CartContext'
import {UserProvider} from '../context/UserContext'

function App() {
  return (
    <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route)=>{
            return <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map(({path, element})=>{
                return <Route key={path} path={path} element={element}></Route>
              })}
            </Route>
          })}
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </UserProvider>
  )
}
export default App
