import { Link } from 'react-router-dom';
import style from './header.module.css'
import { Button, Input, Drawer } from "antd";
import { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { GrCube } from "react-icons/gr";
import AllStore from '../../assets/AllStore';
import Fuse from 'fuse.js';

const Header = () => {
    const { Search } = Input;
    const refTask = useRef<any>();
    const [searchActive, setSearchActive] = useState(false)

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
        updateQuery("")
    };

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
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.menuPosition}>
                    
                    <Link to={'/'} className={style.flexTitle}>
                        <GrCube size={34}/>
                        <div>
                            <h2 className={style.h2}>Pixel.ru</h2>
                            <p className={style.itelP}>Промокоды</p>
                        </div>
                        
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
                    <Search onClick={() => setSearchActive(true)} allowClear  value={query} onChange={onSearch} className={style.searchInput} placeholder="Поиск" enterButton />
                    <div className={searchActive && query.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                        {characterResults.length > 0 ?
                            characterResults.slice(0, 4).map((result:any) => 
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
                    title={
                        <Link className={style.flexTitle} to={'/'}>
                            <GrCube size={34}/>
                            <div>
                                <h2 className={style.h2}>Pixel.ru</h2>
                                <p className={style.itelP}>Промокоды</p>
                            </div>
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
                        <Search onClick={() => setSearchActive(true)} allowClear  value={query} onChange={onSearch} className={style.searchInput} placeholder="Поиск" enterButton />
                        <div className={searchActive && query.length > 0 ? style.resultFullFlex : style.resultFullFlexNone} ref={refTask}>
                            {characterResults.length > 0 ?
                                characterResults.slice(0, 4).map((result:any) => 
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