import style from './home.module.css'
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from 'react-router-dom';
import { LuGamepad2 } from "react-icons/lu";
import { RiComputerLine, RiHome3Line, RiShoppingCartLine } from "react-icons/ri";
import { PiHamburgerBold, PiSneaker, PiBooks, PiPillBold,PiBookOpenTextBold } from "react-icons/pi";
import { IoBicycleOutline, IoTicketOutline } from "react-icons/io5";
import { TbCoins } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { Modal, ConfigProvider, Button, Input, Flex, Skeleton} from "antd";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";
import { LuBaby, LuBone } from "react-icons/lu";
import { MdOutlineRoomService } from "react-icons/md";
import store from '../../assets/store';
import Fuse from 'fuse.js';
import AllStore from '../../assets/AllStore';

const supabase = createClient("https://bgzzybfspduugexyavws.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnenp5YmZzcGR1dWdleHlhdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNTEwMzMsImV4cCI6MjAzOTkyNzAzM30.nCq3Rex2zdCKgJPdVzGhzmNVOEoM-LwBF3TF_cPvUhs");

type ComersType = {
    id: number, 
    name:string,
    site: string,
    rating: string,
    advcampaign_id: number,
    advcampaign_name: string,
    logo: string,
    description: string | undefined,
    species: string,
    promocode: string,
    promolink: string | undefined,
    gotolink: string,
    date_start: any,
    date_end: any,
    exclusive: boolean,
    types: string,
    categories: string,
    special_category: string | undefined,
    discount: string | undefined,
    is_takeads_coupon: boolean
}

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
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

    //// модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [search, setSearch] = useState<any>("")
    const refTask = useRef<any>();

    const [storeActiveComers, setStoreActiveComers] = useState<ComersType>()
    const showModalComers = (item:ComersType) => {
        setIsModalOpen(true);
        setStoreActiveComers(item)
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
        getComers()
    }, []);


    const [comers, setComers] = useState<ComersType[] | null>([])
    async function getComers() {
        const { data, error } = await supabase.from("PromoComers").select().eq('species', 'promocode').range(0, 3);
        setComers(data);
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
    }

    const { Search } = Input;

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

    function localCategory(item:any) {
        localStorage.setItem('category', item.name);
        localStorage.setItem('categoryEn', item.en)
    }

    const date = new Date()

    //// скролл в начало страницы
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    //// Поиск Fuse
    const [query, updateQuery] = useState('');

    const fuse = new Fuse(AllStore, {
        keys: [
          'text',
          'textEn',
          'nameBaza'
        ]
    });

    function onSearch({ currentTarget }:any) {
        updateQuery(currentTarget.value);
    }
    const results = fuse.search(query);
    const characterResults = results.map(character => character.item);


    return (
        <div className={style.home}>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className={style.modalMaxText}>{storeActiveComers?.name}</p>
                <p className={style.textStore}>{storeActiveComers?.advcampaign_name}</p>
                <p>{storeActiveComers?.description}</p>
                <p style={{fontSize:"16px"}}>Ваша скидка <span className={style.minusPrice}>-{storeActiveComers?.discount}</span></p>
                <div className={style.modalFlex}>
                    <p className={style.modalCode}>{storeActiveComers?.promocode}</p>
                    <Button onClick={() => copyTextToClipboard(storeActiveComers?.promocode)} className={style.modalCodeBtn}>
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
                    <Button target="_blank" href={storeActiveComers?.gotolink} className={style.btnCodCod} color="default">
                        Перейти в магазин
                    </Button>
                </ConfigProvider>
            </Modal>
            <h1 className={style.h1}>Промокоды для магазинов</h1>
            <div className={style.searchBlock}>
                <h3 className={style.h3}>Популярные магазины</h3>
                <div className={style.storePosition}>
                    {store.map((item) => 
                        <Link className={style.linkImgItem} key={item.text} onClick={() => localName(item.text)} to={`/catalog/${item.textEn}`}>
                            <button className={style.itemStore} >
                                <img className={style.img} src={item.img} alt={item.text} />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <div className={style.newPromo}>    
                <h3 className={style.h3}>Новые промокоды</h3>
                <div className={style.fullBlog}>
                    {!loading ? 
                            <>
                                <Flex gap='middle' style={{width:'100%'}}>
                                    <Skeleton.Image active={true} style={{width:'200px'}}/>
                                    <Flex style={{width:'100%'}} gap='small' vertical>
                                        <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                    </Flex>
                                </Flex>
                                <Flex gap='middle'>
                                    <Skeleton.Image active={true} style={{width:'200px'}}/>
                                    <Flex style={{width:'100%'}} gap='small' vertical>
                                        <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                    </Flex>
                                </Flex>
                                <Flex gap='middle' style={{width:'100%'}}>
                                    <Skeleton.Image active={true} style={{width:'200px'}}/>
                                    <Flex style={{width:'100%'}} gap='small' vertical>
                                        <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                    </Flex>
                                </Flex>
                                <Flex gap='middle'>
                                    <Skeleton.Image active={true} style={{width:'200px'}}/>
                                    <Flex style={{width:'100%'}} gap='small' vertical>
                                        <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                        <Skeleton.Input active={true} style={{width:'100%', height:'24px', minWidth:"0px"}} />
                                    </Flex>
                                </Flex>
                            </>
                        :
                        comers?.map((item) => 
                            date >= new Date(item.date_start) ?
                        <div key={String(item.id)} className={style.bigItem}>
                            <div  className={style.item} >
                                <div className={style.flexImg}>
                                    <div className={style.imgItemBox}>
                                        <img className={style.imgItem} src={item.logo} alt="" />
                                    </div>
                                    <div>
                                        <p className={style.textDescription}>{item.name}</p>
                                        <h4 className={style.h4}>{item.advcampaign_name}</h4>
                                
                                        <p className={style.minusPrice}>- {item.discount !== undefined ? item.discount : ''}</p>
                                    </div>
                                </div>
                                <div className={style.textPosition}>
                                    <div className={style.codPosition}>
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
                                            <Button target="_blank" href={item.gotolink} disabled={date < new Date(item.date_start)} className={style.btnCodCod} color="default" onClick={() => showModalComers(item)}>
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
                                <Button disabled={date < new Date(item.date_start)} className={style.btnCodCodMin} color="default" onClick={() => showModalComers(item)}>
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
                <Search onClick={() => setSearchActive(true)} allowClear size="large" value={query} onChange={onSearch} className={style.searchInput} placeholder="Поиск" enterButton />
                <div className={searchActive  && query.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                    {characterResults.length > 0 ?
                        characterResults.map((result:any) => 
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
                        <Link key={categorias.name} onClick={() => localCategory(categorias)} to={`/catalog/category/${categorias.nameEn}`}>
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