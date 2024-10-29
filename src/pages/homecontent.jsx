import { useNavigate } from "react-router-dom"


const HomeContent =()=>{


    const navigate = useNavigate()

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[40px] text-[white] font-bold">WELCOME TO DECASYNC WORLD</h1>
                <div className="flex justify-center gap-3 flex-col md:flex-row">
                    <button  onClick={()=>navigate('/showitems')}>Show Items</button>
                    <button onClick={()=>navigate('/showsuppliers')}>Show suppliers</button>
                    <button onClick={()=>navigate('/showpurchase')}>Show Purchase</button>
                </div>
            </div>
        </>
    )
}


export default HomeContent