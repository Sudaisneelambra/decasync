import style from '../css/loading.module.css'


const Loading = ()=>{
    return(
        <div className="w-full h-screen fixed top-0 flex justify-center items-center backdrop-blur z-[1000]">
            <div className={style['custom-loader']}></div>
        </div>

    )
}


export default Loading