import {createContext,useState,useContext, Children} from "react"

const FarmMartContext = createContext()

export const FarmmartProvider =({children})=>{
    const [user,setUser] = useState(null)
    const [cart,setCart] = useState([])
}