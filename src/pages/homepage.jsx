import NavBar from "../components/navbar"

import bg from '../assets/images/bg.jpg'
import { Outlet } from "react-router-dom"
import Loading from "../components/loading"
import { useContext } from "react"
import { MyContext } from "../context/context"


const Home =()=>{

    const {loadingValue} = useContext(MyContext);

    return(
        <>
            {loadingValue ? (
                <Loading />
            ) : (
                <div className="w-full min-h-screen flex flex-col">
                    <NavBar />
                    <div
                        className="flex-grow flex justify-center items-center"
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                    >
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    )
}


export default Home