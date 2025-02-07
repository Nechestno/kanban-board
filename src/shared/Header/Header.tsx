import './style.scss'
import {CarryOutOutlined} from "@ant-design/icons";
import React from "react";


const HeaderComponent : React.FC = () => {
    return (
        <div className='header'>
            <h1 className='header__name'>TODO</h1>
            <CarryOutOutlined className='header__logo' />
        </div>
    )
}

export default HeaderComponent;
