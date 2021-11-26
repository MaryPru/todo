import React, {Dispatch, SetStateAction, useState} from 'react';
import './toDoItem.css'
import CheckBox from "../../UI/CheckBox/CheckBox";
import SubItem from "../SubItem/SubItem";
import images from "../../assets/img/images";
import {ItemToDo, SubItemToDo} from "../../pages/mainPage/Desktop";
import ClickAwayListener from "react-click-away-listener";

interface ItemToDoProps {
    toDoData: ItemToDo
    onChange: Dispatch<SetStateAction<ItemToDo[]>>
    openEditModal:(item:ItemToDo)=>void
}

const ToDoItem = (props: ItemToDoProps) => {
    const {toDoData, onChange, openEditModal} = props
    const {id, index, name, isChecked, subItems} = props.toDoData
    const [isOpen, setIsOpen] = useState(false)

    const checkedList = () => {
        onChange((value) => {
            const withoutItem = value.filter((item) => item.id !== id)
            const allChecked = toDoData.subItems.filter((item) => item.isChecked === true).length
            const allSubItems = toDoData.subItems.length

            if (allChecked === allSubItems) {

                const newItem = {
                    ...toDoData,
                    isChecked: true
                }

                if (isChecked) {
                    const falseItem = {
                        ...toDoData,
                        isChecked: false,
                        subItems: [
                            ...toDoData.subItems.map((item) => ({
                                    ...item,
                                    isChecked: false
                                }
                            )),
                        ]
                    }

                    return [...withoutItem, falseItem]
                }
                return [...withoutItem, newItem]

            }
            if(allSubItems===0){
                const newItem = {
                    ...toDoData,
                    isChecked:!isChecked
                }
                return [...withoutItem, newItem]
            }


            return value
        })
    }

    const checkedSubList = (item: SubItemToDo) => {
        onChange((value) => {
            const withoutItem = value.filter((item) => item.id !== id)
            const withoutSubItem = toDoData.subItems.filter((el) => el.id !== item.id)

            const newSubItem = {
                ...item,
                isChecked: !item.isChecked
            }

            const newItem = {
                ...toDoData,
                subItems: [...withoutSubItem, newSubItem]
            }
            return [...withoutItem, newItem]
        })
    }
   console.log('toDoData', toDoData)

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className={'toDo'} style={{zIndex: isOpen ? 55 : 1}}>
                <div className="toDo_wrapper">
                    <div className="toDo_title">{name}</div>
                    <div className="toDo_actions">
                        <img src={images.pencil} alt="pencil" onClick={()=>openEditModal(toDoData)}/>
                        <CheckBox value={isChecked} onClick={checkedList}/>
                    </div>
                </div>
                <div className={'subItems'}>
                    <div className={`subItems_wrapper ${isOpen ? 'open' : 'close'} `}
                    > {isOpen && <img className={'subItems_triangle'} src={images.triangle}
                                      alt="triangle"
                                      onClick={() => setIsOpen((current) => !current)}
                                      style={{zIndex: 1}}
                    />
                    }{
                        toDoData.subItems.sort((a, b) => a.index - b.index).map((item) => (
                            <SubItem
                                checkedSubList={checkedSubList}
                                subItemData={item}
                            />
                        ))
                    }
                    </div>
                </div>


                {!isOpen &&( toDoData.subItems.length!==0) && <img className={'subItems_triangle'} src={images.triangle}
                                 alt="triangle"
                                 onClick={() => setIsOpen((current) => !current)}
                                 style={{zIndex: 25}}

                />}

            </div>
        </ClickAwayListener>

    );
}

export default ToDoItem;