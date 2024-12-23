import { Link } from 'react-router-dom';
import style from './header.module.css'
import { Button, Input, Drawer } from "antd";
import { useEffect, useRef, useState } from 'react';
import store from '../../assets/store';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
    const { Search } = Input;
    const [search, setSearch] = useState<any>("")
    const [searchResult, setSearchResult] = useState<any>([])
    const refTask = useRef<any>();
    const [searchActive, setSearchActive] = useState(false)

    const handleChange = (event:any) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        // if (search.length > 2) {
            const results = store.filter((s) =>
                s.text.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResult(results);
        // }
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

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
        setSearchActive(false)
    }
    //// выдвижное меню
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSearch("")
    };

    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.menuPosition}>
                    
                    <Link to={'/'}>
                        <h2 className={style.h2}>PromoPoint</h2>
                    </Link>
                    <div className={style.menuMax}>
                        <Link to={'/catalog'}>
                            <Button className={style.link} color="default" variant="link">
                                Все промокоды
                            </Button>
                        </Link>
                        <Link to={'/category'}>
                            <Button className={style.link} color="default" variant="link">
                                Категории
                            </Button>
                        </Link>
                    </div>
                    
                </div>
                <div className={style.flex}>
                    <Search onClick={() => setSearchActive(true)} allowClear  value={search} onChange={handleChange} className={style.searchInput} placeholder="Поиск" enterButton />
                    <div className={searchActive && search.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                        {searchResult.length > 0 ?
                            searchResult.slice(0, 4).map((result:any) => 
                                <Link onClick={() => localName(result.text)} to={`/catalog/${result.textEn}`} className={style.resultFlex} key={result.textEn}>
                                    <img className={style.resultImg} src={result.img} alt={result.text} />
                                    <p className={style.resultText}>{result.text}</p>
                                </Link>
                            )
                            : <p className={style.resultNone}>Не найдено</p>
                        }
                    </div>
                </div>
                <Button className={style.burgerHeader} onClick={showDrawer}>
                    <GiHamburgerMenu size={25} color='black'/>
                </Button>
                <Drawer
                    title={<Link to={'/home'}>
                            <h2 onClick={onClose} className={style.h2}>PromoPoint</h2>
                        </Link>}
                    placement={"left"}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={"left"}
                    extra={
                          <button className={style.crossHeader} onClick={onClose}><RxCross2 size={22}/></button>
                    }
                >
                    <div className={style.flexMin}>
                        <Search onClick={() => setSearchActive(true)} allowClear  value={search} onChange={handleChange} className={style.searchInput} placeholder="Поиск" enterButton />
                        <div className={searchActive && search.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                            {searchResult.length > 0 ?
                                searchResult.slice(0, 4).map((result:any) => 
                                    <Link onClick={() => localName(result.text)} to={`/catalog/${result.textEn}`} className={style.resultFlex} key={result.textEn}>
                                        <img className={style.resultImg} src={result.img} alt={result.text} />
                                        <p className={style.resultText}>{result.text}</p>
                                    </Link>
                                )
                                : <p className={style.resultNone}>Не найдено</p>
                            }
                        </div>
                    </div>
                    <div className={style.menuMin}>
                        <Link to={'/catalog'}>
                            <Button className={style.link} onClick={onClose} color="default" variant="link">
                                Все промокоды
                            </Button>
                        </Link>
                        <Link to={'/category'}>
                            <Button className={style.link} onClick={onClose} color="default" variant="link">
                                Категории
                            </Button>
                        </Link>
                        <Link to={'/info'}>
                            <Button className={style.link} onClick={onClose} color="default" variant="link">
                                Информация
                            </Button>
                        </Link>
                        <Link to={'/category'}>
                            <Button className={style.link} onClick={onClose} color="default" variant="link">
                                Контакты
                            </Button>
                        </Link>
                    </div>
                </Drawer>
            </div>
        </header>
    )
}

export default Header