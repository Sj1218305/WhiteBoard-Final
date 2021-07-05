import React, { createContext } from "react"
import './style.css'


class Board extends React.Component
{
        constructor(props){
            super(props)
        }
        componentDidMount(){
            this.drawOnCanvas();
        }

        drawOnCanvas(){
        
          const canvas = document.getElementById('board');
          const ctx = canvas.getContext('2d');
          var sketch = document.querySelector('#sketch');
          var sketch_style = getComputedStyle(sketch);
          canvas.width = parseInt(sketch_style.getPropertyValue('width'));            canvas.height=200;
          canvas.height = parseInt(sketch_style.getPropertyValue('height'));
          const undo = document.getElementById('undo');
          let pathsry = [];
          var checkboxChecked = false;
          var toggle_line = true;
          var toggle_pencil =true;
          var pen_checkbox = false;
          

          // var Text=false
    
        
       

        const pencilBtn=document.getElementById('Pencil')
         
        pencilBtn.addEventListener('click',()=>{
          pen_checkbox = pencilBtn.checked
          if(pen_checkbox){
          toggle_pencil=true;
          toggle_line = false
          }
          Draw();
        
        })

        function Draw(){
          
          ctx.lineCap = 'round';
          // ctx.strokeStyle = color;
          let drawing = false;
          
          let points = [];
          
          var mouse = {x: 0, y: 0};
          var previous = {x: 0, y: 0};
          
          canvas.addEventListener('mousedown', function(e) {
          drawing = true; 
          previous = {x:mouse.x,y:mouse.y};
          mouse = oMousePos(canvas, e);
          points = [];
          points.push({x:mouse.x,y:mouse.y})
          });
          
          canvas.addEventListener('mousemove', function main_draw(e) {

          if (pen_checkbox){
            if(drawing){
            previous = {x:mouse.x,y:mouse.y};
            mouse = oMousePos(canvas, e);
            // saving the points in the points array
            points.push({x:mouse.x,y:mouse.y})
            // drawing a line from the previous point to the current point
            ctx.beginPath();
            ctx.moveTo(previous.x,previous.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
            ctx.strokeStyle=color;
            }
          }
          else if (!pen_checkbox || !toggle_pencil){
            canvas.removeEventListener('mousemove',main_draw)

          }

          }, false);
          
          
          canvas.addEventListener('mouseup', function() {
          drawing=false;
          // Adding the path to the array or the paths
          pathsry.push(points);
          }, false);
        }
          
          undo.addEventListener("click",Undo);
          
          function drawPaths(){
            // delete everything
            ctx.clearRect(0,0,canvas.width,canvas.height);
            // draw all the paths in the paths array
            pathsry.forEach(path=>{
            ctx.beginPath();
            ctx.moveTo(path[0].x,path[0].y);  
            for(let i = 1; i < path.length; i++){
              ctx.lineTo(path[i].x,path[i].y); 
            }
              ctx.stroke();
            })
          }  
          
          function Undo(){
            // remove the last path from the paths array
            pathsry.splice(-1,1);
            // draw all the paths in the paths array
            drawPaths();
          }
          
          
          // a function to detect the mouse position
          function oMousePos(canvas, evt) {
            var ClientRect = canvas.getBoundingClientRect();
              return { //objeto
              x: Math.round(evt.clientX - ClientRect.left),
              y: Math.round(evt.clientY - ClientRect.top)
          }
          }
          
          
          
          // Color change
          var colorel = document.getElementById('setcolor')
          var color = "#000000"
          colorel.addEventListener('input',()=>{
              color = colorel.value
              
              
          })
            /* Change Pen Width */
          const buttons = document.getElementsByClassName('btn');
          for (let x = 0; x < buttons.length; x++) {
              buttons[x].addEventListener('click', () => {
              ctx.lineWidth = parseInt(buttons[x].innerText);
              });
          }
          //Clear Board
          const clearBtn= document.getElementById('clear')
          clearBtn.addEventListener('click',() => {
              ctx.clearRect(0,0,canvas.width,canvas.height);
              pathsry = []
              //for text box
              // console.log(document.getElementById('info'))
              // document.getElementById('info').remove();

          })
          /* Draw Line*/
          
          const checkbox = document.getElementById('line-tool'); 
          checkbox.addEventListener('click', (e) => {
            checkboxChecked = checkbox.checked;
            if(checkboxChecked){
              toggle_line = true
              toggle_pencil = false
              pen_checkbox = false
            }
      
              drawLine();
    
            // else{
            //   canvas.removeEventListener('click',)
            // }
          })


          function drawLine() {
            var points=[]
            var coordinates = [];
            canvas.addEventListener('click',function Clicked(e){
              coordinates.push(oMousePos(canvas, e));
              console.log(checkboxChecked)
              if (coordinates.length == 2 && checkboxChecked ) {
                // make the line
                ctx.beginPath();
                ctx.moveTo(coordinates[0].x, coordinates[0].y);
                
                ctx.lineTo(coordinates[1].x, coordinates[1].y);
                
                ctx.strokeStyle = colorel.value 
                ctx.stroke();
                //set coordinates to []
                coordinates = [];
                
              }
              else if (!checkboxChecked || !toggle_line){
                canvas.removeEventListener('click',Clicked)
              }
            })
          }


    
                     //Text
               
    //       const TextToggle=document.getElementById('Text')
         
    //       TextToggle.addEventListener('click',()=>{
    //           Text= true
    //           console.log(Text)
           
    //       if(Text){
    //       console.log('inhere')
    //       var textarea=null
    //       function mouseDownOnTextarea(e) {
    //         console.log('textarea')
    //         var x = textarea.offsetLeft - e.clientX,
    //             y = textarea.offsetTop - e.clientY;
    //         function drag(e) {
    //             textarea.style.left = e.clientX + x + 'px';
    //             textarea.style.top = e.clientY + y + 'px';
    //         }
    //         function stopDrag() {

    //             document.removeEventListener('mousemove', drag);
    //             document.removeEventListener('mouseup', stopDrag);
    //         }
    //         document.getElementById('board').addEventListener('mousedown', drag);
    //         document.getElementById('board').addEventListener('mouseup', stopDrag);
    //     }
        
    //     canvas.addEventListener('click', function(e) {
    //       console.log('canvas click')
    //         if (!textarea) {
    //             textarea = document.createElement('textarea');
    //             textarea.className = 'info';
    //             textarea.id = 'info'
    //             textarea.addEventListener('mousedown', mouseDownOnTextarea);
    //             document.getElementById("sketch").appendChild(textarea);
    //         }
    //         var x = e.clientX - canvas.offsetLeft,
    //             y = e.clientY - canvas.offsetTop;
    //         textarea.value = "x: " + x + " y: " + y;
    //         textarea.style.top = e.clientY + 'px';
    //         textarea.style.left = e.clientX + 'px';
    //     }, false);
    //     Text=false;
    //   }
    // })
         
};

            
        

        render(){
            return(
                <div className="sketch" id="sketch">
                    <canvas className="board" id='board'></canvas>
                </div>
            )
        }
}
export default Board