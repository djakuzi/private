import styles from './TopHeader.module.css';
import backIMG from '../../../public/menu/profile/back.svg'
import { useNavigate } from 'react-router-dom';
import { TopHeadeerProps } from './TopHeader.props';


export default function TopHeader(props: TopHeadeerProps){

    const navigate = useNavigate()

    return (
            <div className={styles.header}>

                <div onClick={ () => navigate(-1)} className={styles.back}>
                    <img src={backIMG} alt="иконка назад" />
                    <div>назад</div>
                </div>

                <div className={styles.title}>{props.title}</div>

               {props.func && <div onClick={props.func} className={styles.save}>Готово</div>}

            </div>
    )
}