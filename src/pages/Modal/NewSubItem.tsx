import React from 'react';
import images from "../../assets/img/images";
import './Modal.css'
import {SubItemToDo} from "../mainPage/Desktop";


interface  NewSubItemProps {
    newSubItemData:SubItemToDo
    changeSubItemName:(item:SubItemToDo,name:string)=>void
    deleteSubItem:(item:SubItemToDo)=>void
}
const NewSubItem = (props:NewSubItemProps) => {

    const {changeSubItemName, newSubItemData, deleteSubItem}=props
    return (
        <div className={'NewSubItem'}>
            <input type={'text'} placeholder={'Название поддела'}
                   value={props.newSubItemData.name}
                   onChange={(event)=>changeSubItemName(newSubItemData,event.target.value)}/>
            <img className={'deleteSubItem'} src={images.minus} alt="minus"
            onClick={()=>deleteSubItem(newSubItemData)}/>
        </div>
    );
};

export default NewSubItem;