import style from './menuLeft.module.css'
import { Link, useParams } from 'react-router-dom';
// import store from '../../assets/store';
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { MdLocalPhone, MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const MenuLeft = () => {
    const [nameStore, setNameStore] = useState(localStorage.getItem('nameStore')!)
    const { id } = useParams()
    const store = [
        {
            img: "https://avatars.mds.yandex.net/i?id=d6fe7fb58ea5685fda8027d9866b08ea5bfc6c77-4120592-images-thumbs&n=13",
            text: "Мегамаркет",
            textEn: "megamarket",
            phone: 88006000888,
            mail: "pr@megamarket.ru",
            address: "г. Москва, Спартаковская площадь, 16/15с6",
            link: "https://megamarket.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=429af5a3df1aafc735d4a9a98369af8919eba220-4578360-images-thumbs&n=13",
            text: "Самокат",
            textEn: "samokat",
            phone: 88005050015,
            mail: "support@samokat.ru",
            address: "192019, Санкт-Петербург, улица Седова, 11, литер А, офис 627",
            link: "https://samokat.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=70cf183b69d35265ac9dba0f9798ee278c9bc324-3560974-images-thumbs&n=13",
            text: "Яндекс Маркет",
            textEn: "market-yandex",
            phone: 88002342712,
            mail: "help@market.yandex.ru",
            address: "г. Москва, улица Тимура Фрунзе, дом 11 строение 44, этаж 5.",
            link: "https://market.yandex.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=c8553b6b27221b129730838e0e5741367b474582fa9a41d0-4935416-images-thumbs&n=13",
            text: "OZON",
            textEn: "ozon",
            phone: 84957306767,
            mail: "help@ozon.ru",
            address: "123112, г. Москва, Пресненская наб., д. 10 помещение 1, эт. 41, комн. 6.",
            link: "https://www.ozon.ru/"
        },
        // {
        //     img: "https://avatars.mds.yandex.net/i?id=019f6b120880f434b81cc9612a71360addae4657-12431474-images-thumbs&n=13",
        //     text: "МТС",
        //     textEn: "mtc",
        //     phone: 88002500505,
        //     mail: "123@mts.ru",
        //     address: "109147, г. Москва, ул. Воронцовская д.5, стр.2",
        //     link: "https://shop.mts.ru/"
        // },
        {
            img: "https://avatars.mds.yandex.net/i?id=b38dd31e868db9a548270fd08729d182e1529d31-12714516-images-thumbs&n=13",
            text: "Пятёрочка",
            textEn: "5ka",
            phone: 88005555505,
            mail: "vopros@5ka.ru",
            address: "191025, Санкт-Петербург, Невский пр-кт, 90/92",
            link: "https://5ka.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=c0caec4719e89ca80cedd51595a5479b1f8f89e9-5241810-images-thumbs&n=13",
            text: "AliExpress",
            textEn: "aliexpress",
            phone: 8657185022088,
            mail: "press@aliexpress.com",
            address: "123112, г. Москва, Пресненская набережная 10, 11 этаж, пом. III, ком. 17",
            link: "https://aliexpress.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=1b1ba707ad8fd8dc89b93b1c89c723fafd37b780-12473620-images-thumbs&n=13",
            text: "МегаФон",
            textEn: "megafon",
            phone: 88005500500,
            mail: "",
            address: "Москва, Оружейный переулок, дом 41, офис 558",
            link: "https://moscow.shop.megafon.ru/"
        },
        {
            img: "https://avatars.mds.yandex.net/i?id=01bbfd2aa34161869eebb51fefde2c5e2abb7be4-5289693-images-thumbs&n=13",
            text: "Купер",
            textEn: "sbermarket",
            phone:88002221100,
            mail: "press@kuper.ru",
            address: "115035, Москва, вн.тер.г. мун. округ Замоскворечье, ул. Садовническая, 9а, этаж 5, помещ. I, ком.1.",
            link: "https://kuper.ru/"
        }
    ]

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