import style from './menuLeft.module.css'
import { Link, useParams } from 'react-router-dom';
import store from '../../assets/store';
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { MdLocalPhone, MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiComputerLine, RiHome3Line, RiShoppingCartLine } from "react-icons/ri";
import { PiHamburgerBold, PiSneaker, PiBooks, PiPillBold, PiBookOpenTextBold } from "react-icons/pi";
import { IoBicycleOutline, IoTicketOutline } from "react-icons/io5";
import { LuBaby, LuBone } from "react-icons/lu";
import { MdOutlineRoomService } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { LuGamepad2 } from "react-icons/lu";

const MenuLeft = () => {
    const [nameStore, setNameStore] = useState(localStorage.getItem('nameStore')!)
    const { id } = useParams()
    const categories = [
            {
                name:"Все товары",
                img: <AiOutlineProduct color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "vse-tovari",
                en: ""
            },
            {
                name:"Банки",
                img: <TbCoins color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "banki",
                en: "Bank"
            },
            {
                name:"Еда",
                img:<PiHamburgerBold color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "eda",
                en: "Food"
            },
            {
                name:"Аптека",
                img: <PiPillBold color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "apteka",
                en: "Personal Care & Pharmacy"
            },
            {
                name:"Книги",
                img: <PiBooks color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "knigi",
                en: "Books"
            },
            {
                name:"Одежда и обувь",
                img:<PiSneaker color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "clothes-and-shoes",
                en: "Clothing"
            },
            {
                name:"Путешествия и билеты",
                img:<IoTicketOutline color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "travel-and-tickets",
                en: "Tours & Travels"
            },
            {
                name:"Развлечения",
                img: <LuGamepad2 color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "entertainments",
                en: "Entertainments"
            },
            {
                name:"Спорт",
                img:<IoBicycleOutline color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "sport",
                en: "Sport"
            },
            {
                name:"Электроника",
                img: <RiComputerLine color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "electronics",
                en: "Computers & Electronics"
            },
            {
                name:"Товары для дома",
                img: <RiHome3Line color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "tovary-dlya-doma",
                en: "Homeware"
            },
            {
                name:"Гипермаркеты",
                img: <RiShoppingCartLine color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "gipermarkety",
                en: "Marketplaces (including Chinese Stores)"
            },
            {
                name:"Услуги",
                img: <MdOutlineRoomService color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "uslugi",
                en: "Services"
            },
            {
                name:"Детские товары",
                img: <LuBaby color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "detskie-tovary",
                en: "Toys, Kids & Babies"
            },
            {
                name:"Товары для животных",
                img: <LuBone color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "tovary-dlya-zhivotnykh",
                en: "Pet products"
            },
            {
                name:"Образование",
                img: <PiBookOpenTextBold color='rgb(24, 117, 240)' size={40}/>,
                nameEn: "obrazovanie",
                en: "Online Education"
            }
        ]

    useEffect(() => {
        setNameStore(localStorage.getItem('nameStore')!)
    },[id])

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
    }

    function localCategory(item:any) {
        localStorage.setItem('category', item.name);
        localStorage.setItem('categoryEn', item.en)
    }

    const index = store.findIndex((e) => e.textEn === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    // store[index].textEn
    return (
        <div className={style.menuPosition}>
            { index !== -1 ? 
                <div className={style.menuLeft}>
                    <div className={style.imgItelFlex}>
                        <img className={style.img} src={store[index].img} alt={store[index].textEn} />
                        <h3>{store[index].text}</h3>
                    </div>
                    <Flex style={{marginBottom:"10px"}} vertical gap={"middle"}>
                        <p className={style.phoneText}><MdLocalPhone style={{minWidth:"26px"}} size={26}/> {store[index].phone}</p>
                        <p className={style.phoneText}><MdOutlineEmail style={{minWidth:"26px"}} size={26}/> {store[index].mail}</p>
                        <p className={style.phoneText}><MdOutlineLocationOn style={{minWidth:"26px"}} size={26}/> {store[index].address}</p>
                    </Flex>
                    <div className={style.btnFlex}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultBg:"rgb(73, 155, 242)",
                                        defaultColor:"white",
                                        defaultHoverBg:"rgb(55, 138, 248)",
                                        defaultHoverColor:"white",
                                    },
                                },
                            }}
                        >
                            <Button target="_blank" href={store[index].link} className={style.btnCodCod} color="default">
                                Перейти в магазин <FaExternalLinkAlt size={14}/>
                            </Button>
                        </ConfigProvider>

                    </div>
                </div>
                : ''
            }
            
            <div className={style.menuLeft}>
                <h3 className={style.h3}>Популярные магазины</h3>
                <div className={style.flexMenu}>
                    {store.map((item) => 
                        <Link className={style.block} key={item.text} onClick={() => localName(item.text)} to={`/catalog/${item.textEn}`}>
                            <button className={style.item}>
                                <img className={style.img} src={item.img} alt={item.textEn} />
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            <div className={style.menuLeft}>
                <h3 className={style.h3}>Все категории</h3>
                <div className={style.leftCategory}>
                    {categories.map((category) => 
                        <Link key={category.name} onClick={() => localCategory(category)} to={category.name === "Все товары" ? "/catalog" : `/catalog/category/${category.nameEn}`}>
                            <button className={style.categorias} key={category.name}>
                                <div className={style.categoriasImg}>{category.img}</div>
                                <p className={style.categoriasText}>{category.name}</p>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MenuLeft