
import { NavLink, Outlet } from 'react-router-dom';
import { LINK_MENU_ARR } from '../../helper/RouterApps';
import styles from './Menu.module.css';
import cn from 'classnames';


export default  function Menu() {

  return (
    <div className={styles.menu}>

      <div className={styles.sidebar}>
        {
          LINK_MENU_ARR.map( (el,i) => {

          return <NavLink key={i}  to={'/menu/' + el.path} className={ ({isActive}) => cn(styles.link,{
              [styles.active]: isActive,
          })}>
            
            <div className={styles.container}>
              <img className={styles.img} src={el.logo} alt="" />
            </div>

           <div className={styles.title}> {el.name}</div>

            </NavLink>
        })
        }
      </div>

       <div className={styles.content}>
        <Outlet />
       </div>

    </div>
  )
}

