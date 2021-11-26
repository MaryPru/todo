import React from 'react';
import CheckBox from "../../UI/CheckBox/CheckBox";
import './SubItem.css'
import {SubItemToDo} from "../../pages/mainPage/Desktop";

interface SubItemProps {
    subItemData:SubItemToDo
    checkedSubList:(item:SubItemToDo)=>void
}

const SubItem = (props:SubItemProps) => {
    const {subItemData, checkedSubList }=props
    const {id, index, name, isChecked}=props.subItemData
    return (
        <div className={'subItem'}>
               <div className="subItem-wrapper">
                   <div className="subItem_wrapper_title">{name}</div>
                   <CheckBox value={isChecked} onClick={()=>checkedSubList(subItemData)}/>
               </div>



        </div>
    );
};

export default SubItem;