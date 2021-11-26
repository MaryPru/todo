import './Descktop.css'
import React, {useState} from "react";
import ToDoItem from "../../components/toDoItem/toDoItem";
import Modal from "../Modal/Modal";
import ModalEdit from "../ModalEdit/ModalEdit";
import SubItem from "../../components/SubItem/SubItem";

export interface ItemToDo {
    id: string,
    index: number,
    name: string,
    isChecked: boolean,
    subItems: SubItemToDo[]
}

 export interface SubItemToDo {
    id: string,
    index: number,
    name: string,
    isChecked: boolean
}

const Desktop = () => {
    const [isOpenModal, setIsOpenModal]=useState(false)
    const [isOpenModalEdit, setIsOpenModalEdit]=useState(false)
    const [editToDo, setEditToDo]=useState<ItemToDo>()
    const [toDoItems, setToDoItems] = useState<ItemToDo[]>([
        {
            id: '1',
            index: 1,
            name: "Новое дело",
            isChecked: false,
            subItems: [
                {
                    id: '11',
                    index: 11,
                    name: "Новое поддело1",
                    isChecked: false
                },
                {
                    id: '12',
                    index: 12,
                    name: "Новое поддело2",
                    isChecked: false
                },
                {
                    id: '13',
                    index: 13,
                    name: "Новое поддело3",
                    isChecked: false
                },

            ]

        },
        {
            id: '2',
            index: 2,
            name: "Новое дело 2",
            isChecked: false,
            subItems: [
                {
                    id: '11',
                    index: 11,
                    name: "Новое поддело1",
                    isChecked: false
                },
                {
                    id: '12',
                    index: 12,
                    name: "Новое поддело2",
                    isChecked: false
                },
                {
                    id: '13',
                    index: 13,
                    name: "Новое поддело3",
                    isChecked: false
                },

            ]
        },
        {
        id: '3',
            index: 3,
            name: "Новое дело 3",
            isChecked: false,
            subItems: []
    }
    ])
    console.log('toDoItems',toDoItems)

    const openEditModal=(item:ItemToDo)=> {
        setIsOpenModalEdit(true)
        setEditToDo(item)
    }

    return (
        <>
            <div className="mainWrapper">
                <div className="desktop">
                    <div className="desktop_header">
                        <div className="desktop_header_title">To Do</div>
                        <div className="desktop_header_createButton" onClick={()=>setIsOpenModal(true)}>Создать дело</div>
                    </div>
                    <div className="desktop_body">
                        {
                            toDoItems.sort((a,b)=>a.index-b.index).map((item) => (
                            <ToDoItem
                            toDoData={item}
                            onChange={setToDoItems}
                            openEditModal={openEditModal}
                             />

                            ))
                        }

                    </div>
                </div>
                {
                    isOpenModal && <Modal
                        setIsOpenModal={setIsOpenModal}
                        toDoItems={toDoItems}
                        onChange={setToDoItems}
                    />
                }

                {
                    isOpenModalEdit && <ModalEdit
                        setIsOpenModalEdit={setIsOpenModalEdit}
                        editToDo={editToDo}
                        setEditToDo={setEditToDo}
                        onChange={setToDoItems}
                    />
                }

            </div>
        </>
    )
}

export default Desktop