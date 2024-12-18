import style from './catalog.module.css'
import { Outlet } from "react-router-dom";
import MenuLeft from '../menuLeft/menuLeft'

const Home = () => {

    return (
        <div className={style.container}>
            <div className={style.flexMain}>
                <Outlet/>
                <MenuLeft/>
            </div>
        </div>
    )
}

export default Home