import React, { useState } from 'react';
import styled from 'styled-components';
import { speak } from '../speech/speechUtils'; // TTS 기능 import

const Switch = styled.label`
  position: relative;
  width: 60px;
  height: 34px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.isOn ? 'green' : '#ccc')};
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    transform: ${props => (props.isOn ? 'translateX(26px)' : 'translateX(0)')};
  }
`;

const ToggleSwitch = ({ checked, onChange, tabIndex }) => {
    const [isOn, setIsOn] = useState(checked);

    const handleToggle = () => {
        const newIsOn = !isOn;
        setIsOn(newIsOn);
        onChange && onChange(newIsOn);
        speak(newIsOn ? '켜짐' : '꺼짐', { lang: 'ko-KR' });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleToggle();
        }
    };

    return (
        <Switch
            tabIndex={tabIndex}
            onKeyDown={handleKeyDown}
            onClick={handleToggle}
        >
            <Checkbox type="checkbox" checked={isOn} onChange={handleToggle} />
            <Slider isOn={isOn}></Slider>
        </Switch>
    );
};

export default ToggleSwitch;
