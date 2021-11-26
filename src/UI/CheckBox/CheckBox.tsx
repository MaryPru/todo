import React from 'react';
import './CheckBox.css'
import images from "../../assets/img/images";

interface CheckBoxProps {
    value: boolean
    onClick: () => void
}

const CheckBox = (props: CheckBoxProps) => {

    const {value,onClick} = props

    return (
        <div className={`wrapper-check-box ${value?'checked':'unchecked'}`} onClick={onClick}>
            {value && <img src={images.success} alt="success"/>}
        </div>
    );
};

export default CheckBox;