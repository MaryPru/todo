import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import images from "../../assets/img/images";
import './Modal.css'
import NewSubItem from "./NewSubItem";
import ClickAwayListener from "react-click-away-listener";
import {ItemToDo, SubItemToDo} from "../mainPage/Desktop";
import {v4} from "uuid";

interface ModalProps {
    setIsOpenModal: (value: boolean) => void
    toDoItems: ItemToDo[]
    onChange: Dispatch<SetStateAction<ItemToDo[]>>

}

const getIndexToSort = (arr: ItemToDo[]) => {
    if (arr.length !== 0) {
        return arr[arr.length - 1].index + 1
    }
    return 1
}


const Modal = (props: ModalProps) => {
    const {setIsOpenModal, toDoItems, onChange} = props
    useEffect(() => {
        setNewToDo({
            id: v4(),
            index: getIndexToSort(toDoItems),
            name: '',
            isChecked: false,
            subItems: []
        })
    }, [toDoItems])

    const [newToDo, setNewToDo] = useState<ItemToDo>({
        id: v4(),
        index: getIndexToSort(toDoItems),
        name: '',
        isChecked: false,
        subItems: []

    })

    const addNewToDo = () => {
        if((newToDo.name==='') || (newToDo.subItems.filter((item)=>item.name==='').length!==0)){
            alert("Заполните пустые поля!")
            return
        }
        onChange((value) => ([
            ...value,
            newToDo
        ]))
    }

    const addNewSubItem = () => {

        const subItemTemplate = {
            id: v4(),
            index: getIndexToSort(toDoItems),
            name: '',
            isChecked: false
        }
        setNewToDo((item) => ({
            ...newToDo,
            subItems: [...newToDo.subItems, subItemTemplate]
        }))
        console.log('newToDo', newToDo)

    }

    const changeNameToDo = (name: string) => {
        setNewToDo({
            ...newToDo,
            name
        })
    }

    const changeSubItemName = (item: SubItemToDo, name: string) => {
        const withoutSubItem = newToDo.subItems.filter((el) => el.id !== item.id)
        const newNameSubItem = {
            ...item,
             name
        }
        setNewToDo((value) => ({
            ...newToDo,
            subItems: [...withoutSubItem, newNameSubItem]

        }))
    }

    const deleteSubItem=(item:SubItemToDo)=> {
        const withoutSubItem = newToDo.subItems.filter((el) => el.id !== item.id)
        setNewToDo(()=>({
            ...newToDo,
            subItems:[...withoutSubItem]
        }))
    }


    return (

            <div className="modal_wrapper">
                <ClickAwayListener onClickAway={() => setIsOpenModal(false)}>
                <div className={'modal'}>
                    <div className="modal_wrapperContent">
                        <div className="modal_title"> Создаем дело</div>
                        <div className="modal_toDo">
                            <input type={'text'}
                                   className="modal_toDo_name"
                                   placeholder={'Название дела'}
                                   value={newToDo.name}
                                   onChange={(event) => changeNameToDo(event.target.value)}/>
                            <img className={'modal_toDo_AddNewSubItem'} src={images.plus} alt="plus"
                                 onClick={addNewSubItem}/>
                        </div>
                        <div className="modal_subItems">
                            {
                                newToDo.subItems.map((item) => (
                                    <NewSubItem
                                        newSubItemData={item}
                                        changeSubItemName={changeSubItemName}
                                        deleteSubItem={deleteSubItem}
                                    />
                                ))
                            }
                        </div>
                    </div>


                    <button className={'addToDoButton'} onClick={addNewToDo}>Создать дело</button>
                </div>
                </ClickAwayListener>

            </div>


    );
};

export default Modal;