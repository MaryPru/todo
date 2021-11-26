import React, {Dispatch, SetStateAction} from 'react';
import './ModalEdit.css'
import ModalEditSubItem from "./ModalEditSubItem";
import {ItemToDo, SubItemToDo} from "../mainPage/Desktop";
import ClickAwayListener from "react-click-away-listener";

interface ModalEditProps {

    setIsOpenModalEdit: (value: boolean) => void
    editToDo: ItemToDo | undefined
    setEditToDo: Dispatch<SetStateAction<ItemToDo | undefined>>
    onChange: Dispatch<SetStateAction<ItemToDo[]>>
}

const ModalEdit = (props: ModalEditProps) => {
    const {setIsOpenModalEdit, editToDo, setEditToDo, onChange} = props


    if (editToDo === undefined) {
        return <></>
    }

    const saveChanges = () => {
   if((editToDo.name==='') || (editToDo.subItems.filter((item)=>item.name==='').length!==0)){
       alert('Заполните пустые поля!')
       return
   }
        onChange((value) => {
            const withoutEditItem = value.filter((item) => item.id !== editToDo.id)
            return [
                ...withoutEditItem,
                editToDo
            ]
        })
        setIsOpenModalEdit(false)
    }

    const renameToDo = (name: string) => {
        setEditToDo((item) => ({
            ...editToDo,
            name
        }))
    }

    const renameSubItem = (subItem: SubItemToDo, name: string) => {
        const withoutSubItem = editToDo.subItems.filter((item) => item.id !== subItem.id)
        const newSubItem = {
            ...subItem,
            name
        }
        setEditToDo(() => ({
            ...editToDo,
            subItems: [...withoutSubItem, newSubItem]
        }))
    }


    const deleteSubItem = (subItem: SubItemToDo) => {
        const withoutSubItem = editToDo.subItems.filter((item) => item.id !== subItem.id)
        setEditToDo(() => ({
            ...editToDo,
            subItems: [...withoutSubItem]
        }))
    }
    return (
        <ClickAwayListener onClickAway={() => setIsOpenModalEdit(false)}>
            <div className={'modalEdit'}>
                <div className="modalEdit_wrapper">
                    <div className="modalEdit_title"> Редактируем дело</div>
                    <div className="modalEdit_toDo">
                        <input type={'text'} value={editToDo.name}
                               onChange={(event) => renameToDo(event.target.value)}
                        />
                        {
                            editToDo.subItems.sort((a, b) => a.index - b.index).map((item, index) => (
                                <ModalEditSubItem
                                    key={index + item.id}
                                    editToDoSubItems={item}
                                    renameSubItem={renameSubItem}
                                    deleteSubItem={deleteSubItem}
                                />
                            ))
                        }
                    </div>

                    <button className={'editButton'} onClick={saveChanges}>Сохранить</button>
                </div>


            </div>
        </ClickAwayListener>

    );
};

export default ModalEdit;