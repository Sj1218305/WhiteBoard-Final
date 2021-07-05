import React from 'react';
import Board from '../board/Board'
import './style.css'
import SetColor from './SetColor';
import Undo from './Undo';
import SetLineWidth from './SetLineWidth'
import LineTool from './LineTool';
import Clear from './Clear';
import Pencil from './Pencil';


class Container extends React.Component
{
    constructor(props){
    super(props)
    }

    render(){
        return(
            <div className="container">
                <div className="bottom-bar">
                <div className="color-picker-container resize">
                    <SetColor/>
                    
                </div>

                <div className="Undo-btn resize">
                    <Undo/>
                </div>
                <div className="Redo-btn resize">
                    <Pencil/>
                </div>
                <div className="setlinewidth resize">
                    <SetLineWidth/>
                </div>
                <div className="Clear-btn resize">
                    <Clear/>
                </div>
                <div className="Line-btn resize">
                    <LineTool/>
                </div>
                </div>
                <div className="board-container resize">
                    <Board></Board>
                </div>


            </div>
        )
    }
}

export default Container