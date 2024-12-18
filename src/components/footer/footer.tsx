import { Link } from 'react-router-dom'
import style from './footer.module.css'
import { Button } from 'antd'

const Footer = () => {

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.menuPosition}>
                    <Link to={'/home'}>
                        <h2 className={style.h2}>PROMO</h2>
                    </Link>
                    <div>
                        <Link to={'/category'}>
                            <Button className={style.link} color="default" variant="link">
                                Категории
                            </Button>
                        </Link>
                        <Link to={'/info'}>
                            <Button className={style.link} color="default" variant="link">
                                Информация
                            </Button>
                        </Link>
                        <Link to={'/category'}>
                            <Button className={style.link} color="default" variant="link">
                                Контакты
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer