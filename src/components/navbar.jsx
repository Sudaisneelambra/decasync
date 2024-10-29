import style from '../css/navbar.module.css'
import logo from'../assets/images/logo.png'
import text from'../assets/images/text.png'
import menu from'../assets/images/ogmenu.png'
import close from '../assets/images/close.png'

import Button from './button'


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const openSideMedu =()=>setIsSideNavOpen(!isSideNavOpen)

    const closeSideMenu =()=>setIsSideNavOpen(false)

    const navigate = useNavigate();


    const checkScreenWidth = () => {
        if (window.innerWidth > 620) {
            setIsSideNavOpen(false);  
        }
    };

    useEffect(() => {
        checkScreenWidth();
    
        const handleResize = () => checkScreenWidth();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
       <nav className={`${style.main} w-full h-[90px] bg-[#1d1a22] relative`}>
            <div className={`${style.one} flex justify-center items-center`}>
                <img src={logo} alt=""  className={`${style['img-one']} h-[80%]`}  onClick={() => navigate('/')} />
                <h1 className={`text-[white] font-bold pl-2 text-[24px]`}  onClick={() => navigate('/')} >DECSYNC</h1>
            </div>
            <div className={`${style.two}  flex justify-center items-center font-[800] gap-4 pl-[50px] `}>
                <h1 className="text-[white]  w-[auto]" onClick={() => navigate('/supplier')}>ADD SUPPLIER</h1>
                <h1 className="text-[#d1bcff]  w-[auto]" onClick={() => navigate('/items')} >ADD ITEMS</h1>
            </div>
            <div className={`${style.three} flex justify-center items-center gap-3`}>
                <div className={style.btn}>
                    <Button onClick={() => navigate('/purchase')} buttonValue={'Purchase order'} />
                </div>
                {!isSideNavOpen && (
                    <img src={menu} alt="Menu Icon" className="h-[30px]" onClick={openSideMedu} />
                )}
            </div>
            <div className={`${style['side-nav']} absolute w-[280px] bg-[#1d1a22] h-[100vh] pl-6 flex flex-col gap-4 ${isSideNavOpen ? style['side-nav-active'] : ''}`}>
            <h1 className="flex justify-end pt-4 pr-4  w-[100%]">
                <img src={close} alt="Close" className="h-[30px]" onClick={closeSideMenu} />
            </h1>
            <h1 className={`${style['menu-h1']} mt-3 text-[white]`} onClick={() => navigate('/supplier')} >USER WALLET</h1>
            <h1 className={`${style['menu-h1']} text-[#d1bcff]`} onClick={() => navigate('/items')} >PRIVATE SALE - BUY</h1>
            <div className={`${style['side-button']} hidden`}>
                <Button onClick={() => navigate('/purchase')} buttonValue={'Purchase order'} />
            </div>
        </div>
       </nav>
    );
};

export default NavBar;
