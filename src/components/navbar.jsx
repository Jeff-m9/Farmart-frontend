import  {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {useCart} from '../Pages/CartContext'
import {ShoppingCart} from 'lucide-react'
  


export default function Navbar(){
 
 const {user,logout} =useAuth();
const {cart} =useCart();



 const handleSearch =(e)=>{
  e.preventDefault();
const query=e.target.search.value
console.log("Search",query)
//conncet later

 }


  return (
    
    <nav className='flex justify-between items-center w-full p-4 bg-green-700/90'>
      <Link to="/" className='text-2xl font-bold text-white' >FarmMart</Link>
    
    {user ?(
      <>
      <Link to='/dashboard' className=''>Dashboard</Link>
      <form onSubmit={handleSearch} className='flex relative items-center'> 
        <input  
        type="text"
        name="search"
        placeholder="Search animals ..."
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"

        />
        <button className='absolute right-2' type='submit'  >🔍</button>
      </form>
      <Link to='/browse'>Browse animals</Link>
      <Link to='./cart' className='relative'>
      <ShoppingCart className="w-6 h-6"/>
      {cart.length > 0 && (
      <span className='absolute -top-2 -right-2 bg-red-500 text-xs rounded-full flex items-center justify-center'>
        {cart.length}
      </span>
      )}
      </Link>
      <button onClick={logout}>Logout</button>
      </>
    ) : (
      <>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
      </>
    )
    
    }



    </nav>
  )

}