import  {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'


export default function Navbar(){
 
 const {user,logout} =useAuth();

 const handleSearch =(e)=>{
  e.preventDefault();
const query=e.target.search.value
console.log("Search",query)
//conncet later

 }


  return (
    
    <nav className='flex justify-between items-center p-4 bg-green-700/90 '>
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
      <Link to='./browse'>Browse animals</Link>
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