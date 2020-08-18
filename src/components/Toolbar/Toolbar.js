import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Tool from './Tool';
import ColorPalette from '../ColorPalette/ColorPalette';
import TranshCanIcon from '../../icons/trash-can.svg'
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';
import CheckboxIcon from '../../icons/checkbox.svg'; 
import { updateEditableNote } from '../../store/actions/notes'; 

const ToolbarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-top: 20px;
    line-height: 0;
    opacity: ${props => props.hovered ? 1 : 0};
    transition: opacity .3s ease-out;
`;

const CloseBtn = styled.button`
    background: white;
    color: rgba(0,0,0,0.87);
    font-weight: 500;
    font-size: 1.5rem;
    padding: 8px 24px;
    border-radius: 4px;
    letter-spacing: .4px;

    &:hover {
        opacity: .87;
        background: rgba(95,99,104,0.157);
    }
`;


const Toolbar = ({ onHover, isInputField, clicked, id, onRemove }) => {  
    const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
    const editedNote = useSelector(state => state.editableNote);
    const icons = [
        {icon: PaintIcon, ariaLabel: 'Change Color'},
        {icon: PictureIcon, ariaLabel: 'Add Picture'},
        {icon: CheckboxIcon, ariaLabel: 'Show Checkbox'}
    ];

    const dispatch = useDispatch();
    const handleShowColorPalette = () => setIsHoverColorPalette(true);
    const handleHideColorPalette = () => setIsHoverColorPalette(false);
    const handleUpdateEditableNote = () => {
        if (editedNote !== null) dispatch(updateEditableNote());
    }; 

    return(
            <ToolbarContainer hovered={onHover}>
                <div>
                    { icons.map((icon, i) => <Tool 
                    key={i} 
                    title={icon.ariaLabel} 
                    ariaLabel={icon.ariaLabel} 
                    bgImage={icon.icon}
                    showPalette={icon.ariaLabel === 'Change Color' ? handleShowColorPalette : null}
                    hidePalette={icon.ariaLabel === 'Change Color' ? handleHideColorPalette : null}
                    />
                    )}
                    { !isInputField &&
                        <Tool 
                        title="Delete" 
                        bgImage={TranshCanIcon} 
                        clicked={onRemove}/>
                    }
                </div>
                { isInputField && 
                    <CloseBtn onClick={clicked}>Close</CloseBtn> 
                }
                { editedNote &&  
                    <CloseBtn onClick={handleUpdateEditableNote}>Close</CloseBtn> 
                }
                { isHoverColorPalette && <ColorPalette  
                    id={id}
                    isInputField={isInputField}
                    onUnHover={handleHideColorPalette} 
                    onHover={handleShowColorPalette}
                    /> 
                }
        </ToolbarContainer>
    );
};

export default Toolbar;
