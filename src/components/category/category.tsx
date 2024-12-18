import style from './category.module.css'
import { RiComputerLine, RiHome3Line, RiShoppingCartLine } from "react-icons/ri";
import { PiHamburgerBold, PiSneaker, PiBooks, PiPillBold } from "react-icons/pi";
import { IoBicycleOutline, IoTicketOutline } from "react-icons/io5";
import { TbCoins } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { LuGamepad2 } from "react-icons/lu";
import { Link } from 'react-router-dom';
import store from '../../assets/store';


const Category = () => {
    const categories = [
        {
            name:"Все товары",
            img: <AiOutlineProduct color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "vse-tovari"
        },
        {
            name:"Банки",
            img: <TbCoins color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "banki"
        },
        {
            name:"Еда",
            img:<PiHamburgerBold color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "eda"
        },
        {
            name:"Аптека",
            img: <PiPillBold color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "apteka"
        },
        {
            name:"Книги",
            img: <PiBooks color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "knigi"
        },
        {
            name:"Одежда и обувь",
            img:<PiSneaker color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "clothes-and-shoes"
        },
        {
            name:"Путешествия и билеты",
            img:<IoTicketOutline color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "travel-and-tickets"
        },
        {
            name:"Развлечения",
            img: <LuGamepad2 color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "entertainments"
        },
        {
            name:"Спорт",
            img:<IoBicycleOutline color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "sport"
        },
        {
            name:"Электроника",
            img: <RiComputerLine color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "electronics"
        },
        {
            name:"Товары для дома",
            img: <RiHome3Line color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "tovary-dlya-doma"
        },
        {
            name:"Гипермаркеты",
            img: <RiShoppingCartLine color='rgb(24, 117, 240)' size={40}/>,
            nameEn: "gipermarkety"
        }
    ]

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
    }

    function localCategory(item:any) {
        localStorage.setItem('category', item.name);
    }

    return(
        <div className={style.container}>
            <h1 className={style.h1}>Категории промокодов в интернет-магазинах</h1>
            <div className={style.block}>
                {categories.map((category) => 
                    <Link key={category.name} onClick={() => localCategory(category)} to={category.name === "Все товары" ? "/catalog" : `/catalog/category/${category.nameEn}`}>
                        <button className={style.categorias} key={category.name}>
                            <div className={style.categoriasImg}>{category.img}</div>
                            <p className={style.categoriasText}>{category.name}</p>
                        </button>
                    </Link>
                    
                )}
            </div>
            <div className={style.searchBlock}>
                <h3 className={style.h3}>Популярные магазины</h3>
                <div className={style.storePosition}>
                    {store.map((item) => 
                        <Link key={item.text} onClick={() => localName(item.text)} to={`/catalog/${item.textEn}`}>
                            <button className={style.itemStore} >
                                <img className={style.img} src={item.img} alt={item.text} />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Category