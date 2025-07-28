import  {Link} from 'react-router-dom'
import useAuth from '../context/useAuth'
import {useCart} from '../Pages/CartContext'
import {ShoppingCart} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function Navbar(){
 
 const {user,logout} =useAuth();
const {cart} =useCart();
const [results, setResults] = useState([]);
const [search,setSearch] =useState([])
const navigate =useNavigate();

 const handleSearch =(e)=>{
  e.preventDefault();
console.log("Search",search)
//conncet later
navigate(`/browse?name=${search}`)


 }
console.log("current User is ",user)

  return (
    
    <nav className='flex justify-between items-center space-x-4 w-full p-4 bg-green-700/90'>
      <Link to="/" className='text-4xl font-extrabold text-white' >FarmMart</Link>
    
    {user ?(
      <>
        <div className='flex justify-centre items-center space-x-3 font-bold text-black '>
      <Link to='/dashboard' className=''>Home</Link>
      <form onSubmit={handleSearch} className='flex relative items-center' > 
        <input  
        type="text"
        name="search"
        value={search}
        placeholder="Search animals ..."
        onChange={(e)=> setSearch(e.target.value)}

        className="w-full px-4 py-2 border bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"

        />
        <button className='absolute right-2' type='submit'  >🔍</button>
      </form>
      <Link to='/browse'>Browse animals</Link>
      </div>


      <div className='flex justify-between items-centre space-x-2'>
      <Link to='./cart' className='relative'>
      <ShoppingCart className="w-6 h-6"/>
      {cart.length > 0 && (
      <span className='absolute -top-2 -right-2 bg-red-500 text-xs rounded-full flex items-center justify-center'>
        {cart.length}
      </span>
      )}
      </Link>
      <Link to="/profile" aria-label="View shopping cart">
            <img
              src="/src/images/user_attributes_24dp_1F1F1F_FILL1_wght500_GRAD0_opsz48.svg"
              alt="Cart"
              className="h-8"
            />
          </Link>
      <button onClick={logout}>Logout</button>
      </div>
      </>
    ) 
    
    : (
      <>
      <Link to="./login">Login</Link>
      <Link to="/signup">Sign up</Link>
      </>
    )
    
    }



    </nav>
  )

}