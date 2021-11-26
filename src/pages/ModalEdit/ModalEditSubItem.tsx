import React from 'react';
import images from "../../assets/img/images";
import './ModalEdit.css'
import {SubItemToDo} from "../mainPage/Desktop";

interface ModalEditSubItemProps {
    editToDoSubItems:SubItemToDo
    renameSubItem:(item:SubItemToDo, name:string)=>void
    deleteSubItem:(item:SubItemToDo)=>void
}

const ModalEditSubItem = (props:ModalEditSubItemProps) => {
    const {editToDoSubItems, renameSubItem,deleteSubItem}=props
    return (
        <div className={'modalEdit_subItem'}>
            <input type={'text'} value={editToDoSubItems.name}
            onChange={(event)=>renameSubItem(editToDoSubItems, event.target.value)}
            />
            <img className={'modalEdit_deleteSubItem'} src={images.minus} alt="minus"
            onClick={()=>deleteSubItem(editToDoSubItems)}
            />
        </div>
    );
};

export default ModalEditSubItem;

