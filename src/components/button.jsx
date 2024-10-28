const Button =({onClick, buttonValue})=>{
    return(
        <>
            <button  className={`bg-[#ffacec] px-3 py-[6px] text-[15px] font-[600] rounded-full`} onClick={onClick} >{buttonValue}</button>
        </>
    )
}

export default Button