import style from '../storeLink/storeLink.module.css'
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Modal, ConfigProvider, Button, Skeleton, Flex } from "antd";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";
import { useParams } from "react-router-dom";


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

const CategoryProduct = () => {
    const [comers, setComers] = useState<ComersType[] | null>([])
    const [loading, setLoading] = useState(false)
    // const [nameStore, setNameStore] = useState(localStorage.getItem('categoryEn')!)
    const [name, setName] = useState(localStorage.getItem('category')!)
    const { id } = useParams()

    useEffect(() => {
        // setNameStore(localStorage.getItem('categoryEn')!)
        setName(localStorage.getItem('category')!)
    },[id])
    

    useEffect(() => {
        getComers();
    }, [id]);
  
    async function getComers() {
        setLoading(false)
        const { data, error } = await supabase.from("PromoComers").select()
        .eq('categories', localStorage.getItem('categoryEn'));
        setComers(data);
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    //// модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storeActive, setStoreActive] = useState<ComersType>()

    const showModal = (item:ComersType) => {
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

    //// скролл в начало страницы
    useEffect(() => {
        window.scrollTo(0, 0)
    },[id])

    return (
        <div key={id} className={style.container}>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className={style.modalMaxText}>{storeActive?.name}</p>
                <p className={style.textStore}>{storeActive?.description}</p>
                <p className={style.textStore}>{storeActive?.advcampaign_name}</p>
                <p style={{fontSize:"16px"}}>Ваша скидка <span className={style.minusPrice}>- {storeActive?.discount}</span></p>
                <div className={style.modalFlex}>
                    <p className={style.modalCode}>{storeActive?.promocode}</p>
                    <Button onClick={() => copyTextToClipboard(storeActive?.promocode)} className={style.modalCodeBtn}>
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
                    <Button target="_blank" href={storeActive?.gotolink} className={style.btnCodCod} color="default">
                        Перейти в магазин
                    </Button>
                </ConfigProvider>
            </Modal>
            <p className={style.info}>Промокоды / Все Промокоды / {name}</p>
            <h2 className={style.h2}>Промокоды {name}</h2>
            <div className={style.fullBlog}>
                {!loading ? 
                <Flex vertical gap='middle'>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                    <Flex gap='middle'>
                        <Skeleton.Image active={true} style={{width:'200px'}}/>
                        <Flex style={{width:'100%'}} gap='small' vertical>
                            <Skeleton.Input active={true} style={{width:'100%', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                            <Skeleton.Input active={true} style={{width:'100px', height:'24px', minWidth:"0px"}} />
                        </Flex>
                    </Flex>
                </Flex>
                    :
                    comers?.map((item) => 
                        date > new Date(item.date_start) ?
                        <div key={String(item.id)}>
                            <div className={style.itemMin} >
                                <div className={style.flexMin}>
                                    <div className={style.imgItemBox}>
                                        <img className={style.imgItem} src={item.logo} alt={item.advcampaign_name} />
                                    </div>
                                    <div className={style.positionMinMin}>
                                        <p className={style.textDescription}>{item.name}</p>
                                        <h4 className={style.h4}>{item.advcampaign_name}</h4>
                                        
                                    </div>
                                </div>
                                <div className={style.flexFlexMin}>
                                    <p className={style.minusPrice}>- {item.discount !== undefined ? item.discount : ''}</p>
                                    {date > new Date(item.date_start) ? <p className={style.Pdate}>до {item.date_end !==undefined ? `0${new Date(item.date_end).getDate()}`.slice(-2)  + '.' + (`0${Number(new Date(item.date_end).getMonth() + 1)}`).slice(-2) + '.' + new Date(item.date_end).getFullYear() : ''}</p> : <p className={style.Pdate} style={{color:'red'}}>Срок акции истёк</p>}
                                </div>
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
                                <Button target="_blank" href={item.gotolink}  disabled={date < new Date(item.date_start)} className={style.btnCodCodMin} color="default" onClick={() => showModal(item)}>
                                    Показать код
                                </Button>
                                    </ConfigProvider>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.imgItemBox}>
                                    <img className={style.imgItem} src={item.logo} alt={item.advcampaign_name}/>
                                </div>
                                <div className={style.textPosition}>
                                    <div>
                                        <p className={style.textDescription}>{item.name}</p>
                                        <h4 className={style.h4}>{item.advcampaign_name}</h4>
                                        <p className={style.minusPrice}>- {item.discount !== undefined ? item.discount : ''}</p>
                                    </div>
                                    <div className={style.codPosition}>
                                    {date > new Date(item.date_start) ? <p className={style.Pdate}>{item.date_end !== 'None' ? 'до ' + `0${new Date(item.date_end).getDate()}`.slice(-2)  + '.' + (`0${Number(new Date(item.date_end).getMonth() + 1)}`).slice(-2) + '.' + new Date(item.date_end).getFullYear() : ''}</p> : <p className={style.Pdate} style={{color:'red'}}>Срок акции истёк</p>}
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
                                                <Button target="_blank" href={item.gotolink} disabled={date < new Date(item.date_start)} className={style.btnCodCod} color="default" onClick={() => showModal(item)}>
                                                    Показать код
                                                </Button>
                                            </ConfigProvider>
                                    </div>
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