import style from './home.module.css'
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from 'react-router-dom';
import { LuGamepad2 } from "react-icons/lu";
import { RiComputerLine, RiHome3Line, RiShoppingCartLine } from "react-icons/ri";
import { PiHamburgerBold, PiSneaker, PiBooks, PiPillBold } from "react-icons/pi";
import { IoBicycleOutline, IoTicketOutline } from "react-icons/io5";
import { TbCoins } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { Modal, ConfigProvider, Button, Input} from "antd";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";
import store from '../../assets/store';

const supabase = createClient("https://bgzzybfspduugexyavws.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnenp5YmZzcGR1dWdleHlhdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNTEwMzMsImV4cCI6MjAzOTkyNzAzM30.nCq3Rex2zdCKgJPdVzGhzmNVOEoM-LwBF3TF_cPvUhs");

type promoTableType = {
    id:number,
    promo: string,
    description: string,
    comments: string,
    like: number,
    img: string,
    code:string,
    working:string,
    time: string,
    store: string,
    date:number,
    num: number
}

const Home = () => {
    const [promoTable, setPromoTable] = useState<promoTableType[] | null>([]);
    const [loading, setLoading] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
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

    //// модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storeActive, setStoreActive] = useState<promoTableType>()
    const [search, setSearch] = useState<any>("")
    const [searchResult, setSearchResult] = useState<any>([])
    const refTask = useRef<any>();

    const showModal = (item:promoTableType) => {
      setIsModalOpen(true);
      setStoreActive(item)
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      setCopy(false)
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setCopy(false)
    };
    /////
    const [copy, setCopy] = useState(false)
    const copyTextToClipboard = async (text:any) => {
        setCopy(true)
        try {
          await navigator.clipboard.writeText(text);
          console.log(text);
        } catch (err) {
          console.error('Ошибка:', err);
        }
    };

    useEffect(() => {
        getPromo();
    }, []);
  
    async function getPromo() {
        const { data, error } = await supabase.from("promo").select();
        setPromoTable(data);
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
    }

    const { Search } = Input;

    const handleChange = (event:any) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const results = store.filter((s) =>
            s.text.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(results);
    }, [search]);

    useEffect(() => {
        document.addEventListener("mousedown", MimoClick)
        return () => {
            document.removeEventListener("mousedown", MimoClick)
        }
    },[])

    const MimoClick = (event:any) => {
        if (refTask.current && refTask.current.contains(event.target)) {
            setSearchActive(true)
        } else {
            setSearchActive(false)
        }
    }

    function localCategory(item:string) {
        localStorage.setItem('category', item);
    }

    const date = new Date()
    // .sort((a, b) => b.id - a.id)
    return (
        <div className={style.home}>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className={style.modalMaxText}>{storeActive?.description}</p>
                <p className={style.textStore}>{storeActive?.store}</p>
                <p>{storeActive?.comments}</p>
                <p style={{fontSize:"16px"}}>Ваша скидка <span className={style.minusPrice}>-{storeActive?.promo}</span></p>
                <div className={style.modalFlex}>
                    <p className={style.modalCode}>{storeActive?.code}</p>
                    <Button onClick={() => copyTextToClipboard(storeActive?.code)} className={style.modalCodeBtn}>
                        {!copy ? <IoMdCopy size={20}/> : <IoMdCheckmark size={20}/>}
                    </Button>
                </div>
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
                    <Button className={style.btnCodCod} color="default">
                        Перейти в магазин
                    </Button>
                </ConfigProvider>
            </Modal>
            <h1 className={style.h1}>Промокоды для магазинов</h1>
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
            {/* .slice(0,4) */}
            <div className={style.newPromo}>    
                <h3 className={style.h3}>Новые промокоды</h3>
                <div className={style.fullBlog}>
                    {!loading ? 'Загрузка'
                        :
                        promoTable?.sort((a, b) => b.num - a.num).map((item) => 
                            date < new Date(item.time) ?
                        <div key={String(item.id)} className={style.bigItem}>
                            <div  className={style.item} >
                                <div className={style.imgItemBox}>
                                    <img className={style.imgItem} src={item.img} alt="" />
                                </div>
                                <div className={style.textPosition}>
                                    <div>
                                        {/* <p className={style.textDescription}>{item.description}</p> */}
                                        <h4 className={style.h4}>{item.store}</h4>
                                        <p className={style.minusPrice}>- {item.promo}</p>
                                    </div>
                                    <div className={style.codPosition}>
                                        {date < new Date(item.time) ? <p className={style.Pdate}>до {item.working}</p> : <p className={style.Pdate} style={{color:'red'}}>Срок акции истёк</p>}
                                        
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
                                            <Button disabled={date > new Date(item.time)} className={style.btnCodCod} color="default" onClick={() => showModal(item)}>
                                                Показать код
                                            </Button>
                                        </ConfigProvider>
                                    </div>
                                </div>
                                
                            </div> 
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
                                <Button disabled={date > new Date(item.time)} className={style.btnCodCodMin} color="default" onClick={() => showModal(item)}>
                                    Показать код
                                </Button>
                            </ConfigProvider>
                        </div>
                            
                            : ""
                        )
                    }
                </div>
                <div className={style.btnFullblogPosition}>
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
                        <Link to={'/catalog'}>
                            <Button className={style.btnFullblog} color="default" >
                                Показать ещё
                            </Button>
                        </Link>
                    </ConfigProvider>
                </div>
            </div>
            <div className={style.searchBlock}>
                <h3 className={style.h3Search}>Поиск магазинов</h3>
                <Search onClick={() => setSearchActive(true)} allowClear size="large" value={search} onChange={handleChange} className={style.searchInput} placeholder="Поиск" enterButton />
                <div className={searchActive  && search.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                    {searchResult.length > 0 ?
                        searchResult.map((result:any) => 
                            <Link onClick={() => localName(result.text)} to={`/catalog/${result.textEn}`} className={style.resultFlex} key={result.textEn}>
                                <img className={style.resultImg} src={result.img} alt={result.text} />
                                <p className={style.resultText}>{result.text}</p>
                            </Link>
                        )
                        : <p className={style.resultNone}>Не найдено</p>
                    }
                </div>
            </div>
            <div className={style.searchBlock}>
                <h3 className={style.h3Search}>Категории</h3>
                <div className={style.categoriasPosition}>
                    {categories.map((categorias) => 
                        <Link key={categorias.name} onClick={() => localCategory(categorias.name)} to={`/catalog/category/${categorias.nameEn}`}>
                            <button style={{width:"100%"}} className={style.categorias} key={categorias.name}>
                                <div className={style.categoriasImg}>{categorias.img}</div>
                                <p className={style.categoriasText}>{categorias.name}</p>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={style.searchBlock}>
                <div className={style.infoBlock}>
                    <h3 className={style.h3Search}>Информация</h3>
                    <p><span className={style.promoSpan}>Промокод</span> — это специальное кодовое слово или набор букв и цифр, дающий право на приобретение товара или услуги на специальных условиях</p>
                    <p className={style.promoSpanBig}>Виды промокодов:</p>
                    <ul>
                        <li><span className={style.promoSpan}>Одноразовый промокод.</span> Индивидуальный набор символов, который может использовать только один клиент.</li>
                        <li><span className={style.promoSpan}>Многоразовый промокод.</span> Код, которым можно воспользоваться ограниченное или неограниченное количество раз.</li>
                    </ul>
                    <p className={style.promoSpanBig}>Где найти промокоды:</p>
                    <ul>
                        <li>Интернет-магазины отправляют промокоды на почту — можно подписаться на рассылку магазина;</li>
                        <li>Магазин может дать личный промокод;</li>
                        <li>Иногда компании делятся промокодами в соцсетях.</li>
                    </ul>
                    <p className={style.promoSpanBig}>Как использовать промокод:</p>
                    <ol>
                        <li>Скопировать кодовое слово из купона.</li>
                        <li>Открыть сайт нужного продавца.</li>
                        <li>Положить в корзину желаемые товары.</li>
                        <li>Перейти в корзину.</li>
                        <li>Вставить код в специальное поле на одном из этапов оформления заказа.</li>
                    </ol>
                    <p className={style.promoSpan}>Чтобы промокод сработал, часто нужно выполнить определённые условия. Например, купить на сумму больше тысячи рублей или заказать минимум три товара.</p>
                </div>
            </div>
        </div>
    )
}

export default Home