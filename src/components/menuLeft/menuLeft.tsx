import style from './menuLeft.module.css'
import { Link, useParams } from 'react-router-dom';
import store from '../../assets/store';
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { MdLocalPhone, MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const MenuLeft = () => {
    const [nameStore, setNameStore] = useState(localStorage.getItem('nameStore')!)
    const { id } = useParams()

    useEffect(() => {
        setNameStore(localStorage.getItem('nameStore')!)
    },[id])

    function localName(item:string) {
        localStorage.setItem('nameStore', item);
    }

    const index = store.findIndex((e) => e.text === nameStore)

    return (
        <div className={style.menuPosition}>
            { id === store[index].textEn ? 
                <div className={style.menuLeft}>
                    <Flex style={{marginBottom:"20px"}} gap={"middle"}>
                        <img className={style.img} src={store[index].img} alt={store[index].textEn} />
                        <h3>{store[index].text}</h3>
                    </Flex>
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
        </div>
    )
}

export default MenuLeft