import style from './CategoryProduct.module.css'
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Modal, ConfigProvider, Button, Skeleton, Flex } from "antd";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";
import { useParams } from "react-router-dom";


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
    num: number
}

const CategoryProduct = () => {
    const [promoTable, setPromoTable] = useState<promoTableType[] | null>();
    const [loading, setLoading] = useState(false)
    const [nameStore, setNameStore] = useState(localStorage.getItem('category')!)
    const { id } = useParams()

    useEffect(() => {
        setNameStore(localStorage.getItem('category')!)
    },[id])
    

    useEffect(() => {
        getPromo();
    }, [id]);
  
    async function getPromo() {
        const { data, error } = await supabase
        .from("promo")
        .select()
        .eq('category', localStorage.getItem('category'));
        setPromoTable(data);
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    //// модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storeActive, setStoreActive] = useState<promoTableType>()

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

    const date = new Date()

    return (
        <div key={id} className={style.container}>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className={style.modalMaxText}>{storeActive?.description}</p>
                <p className={style.textStore}>{storeActive?.store}</p>
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
            <p className={style.info}>Промокоды / Все Промокоды / {nameStore}</p>
            <h2 className={style.h2}>{nameStore}</h2>
            <div className={style.fullBlog}>
                {!loading ? 
                <Flex vertical gap='middle'>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                </Flex>
                    :
                    promoTable!.length > 0 ?
                        promoTable?.sort((a, b) => b.num - a.num).map((item) => 
                            date < new Date(item.time) ? 
                            <div className={style.item} key={String(item.id)}>
                                <div className={style.imgItemBox}>
                                    <img className={style.imgItem} src={item.img} alt="" />
                                </div>
                                <div className={style.textPosition}>
                                    <div>
                                        <p className={style.textDescription}>{item.description}</p>
                                        <h4 className={style.h4}>{item.store}</h4>
                                        <p className={style.minusPrice}>- {item.promo}</p>
                                    </div>
                                    <div className={style.codPosition}>
                                        {date < new Date(item.time) ? <p>до {item.working}</p> : <p style={{color:'red'}}>Срок акции истёк</p>}
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
                            : ""
                        )
                        : <p>Промокодов нет</p>
                }
            </div>
            <div className={style.fullBlog}>
                <h3 className={style.promoH3}>Истёкшие промокоды</h3>
                {!loading ? 
                <Flex vertical gap='middle'>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px'}} />
                        </Flex>
                    </Flex>
                </Flex>
                    :
                    promoTable?.sort((a, b) => b.num - a.num).map((item) => 
                        date > new Date(item.time) ?
                        <div className={style.item} key={String(item.id)}>
                            <div className={style.imgItemBox}>
                                <img className={style.imgItem} src={item.img} alt="" />
                            </div>
                            <div className={style.textPosition}>
                                <div>
                                    <p className={style.textDescription}>{item.description}</p>
                                    <h4 className={style.h4}>{item.store}</h4>
                                    <p className={style.minusPrice}>- {item.promo}</p>
                                </div>
                                <div className={style.codPosition}>
                                    {date < new Date(item.time) ? <p>до {item.working}</p> : <p style={{color:'red'}}>Срок акции истёк</p>}
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
                        : ''
                    )

                }

            </div>
        </div>
    )
}

export default CategoryProduct