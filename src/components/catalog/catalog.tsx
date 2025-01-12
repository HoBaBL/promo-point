import style from './catalog.module.css'
import { Outlet } from "react-router-dom";
import MenuLeft from '../menuLeft/menuLeft'
import MenuButtom from './menuButtom';

const Home = () => {

    return (
        <div className={style.container}>
            <div className={style.flexMain}>
                <Outlet/>
                <MenuLeft/>
                
            </div>
            <div className={style.buttomMenu}>
                <MenuButtom/>
            </div>
        </div>
    )
}

export default Home