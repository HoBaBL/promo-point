import { useEffect, useState } from 'react';
import style from './admin.module.css'
import { createClient } from "@supabase/supabase-js";
import { Modal, ConfigProvider, Button, Input, Form, Flex, Space } from "antd";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";
import type { FormProps } from 'antd';

const supabase = createClient("https://bgzzybfspduugexyavws.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnenp5YmZzcGR1dWdleHlhdndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNTEwMzMsImV4cCI6MjAzOTkyNzAzM30.nCq3Rex2zdCKgJPdVzGhzmNVOEoM-LwBF3TF_cPvUhs");
const { TextArea } = Input;

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
    date: any,
    num: number
}

const Admin = () => {
    const [promoTable, setPromoTable] = useState<promoTableType[] | null>([]);
    const [loading, setLoading] = useState(false)
    const [storeActive, setStoreActive] = useState<promoTableType>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copy, setCopy] = useState(false)

    async function getPromo() {
        const { data, error } = await supabase.from("promo").select();
        setPromoTable(data);
        console.log(data)
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPromo();
    }, []);

    const date = new Date()

    /////
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
    const copyTextToClipboard = async (text:any) => {
        setCopy(true)
        try {
          await navigator.clipboard.writeText(text);
          console.log(text);
        } catch (err) {
          console.error('Ошибка:', err);
        }
    };

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        forma(values)
    };

    async function forma(values:any) {
        const { error } = await supabase
        .from('promo')
        .insert({
            id: Math.random(), 
            promo: values.promo ,
            description: values.description ,
            code: values.code ,
            store: values.store ,
            comments: values.comments ,
            working: values.working ,
            time: values.time ,
            img: values.img ,
            category: values.category ,
            date: new Date(),
            num: promoTable!.length + 1
        })
        setLoading(true)
        if (error !== null) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>
            <h3>Админка</h3>
            <Flex vertical>
                <Form name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                    <Form.Item className={style.blockInput} name="promo" label="promo" >
                        <Input placeholder="Сколько скидка"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="description" label="description" >
                        <Input placeholder="description"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="code" label="code" >
                        <Input placeholder="code"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="store" label="store" >
                        <Input placeholder="store"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="comments" label="comments" >
                        <TextArea placeholder="comments"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="working" label="working" >
                        <Input placeholder="working"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="time" label="time" >
                        <Input placeholder="time"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="img" label="img" >
                        <Input placeholder="img"/>
                    </Form.Item>
                    <Form.Item className={style.blockInput}  name="category" label="category" >
                        <Input placeholder="category"/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                            <Button htmlType="reset">Очистить</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Flex>
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
            <div className={style.fullBlog}>
                {!loading ? 
                    "Loading"
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
                            : ''
                        )
                        : <p>Промокодов нет</p>
                }
            </div>

        </div>
    )
}

export default Admin