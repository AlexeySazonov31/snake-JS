function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function ClearAll(){
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 1;
    snake.dx = 0;
    snake.dy = 0;
    apple.x = getRandom(0, 24) * grid;
    apple.y = getRandom(0, 24) * grid;
}
//--------------------------------------------------------

let counter = document.getElementById('counter');
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let grid = 16;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    dx: 0,
    dy: 0,
    cells: [],
    maxCells: 3
};
let apple = {
    x: 320,
    y: 320
};

function loop(){
    requestAnimationFrame(loop);
    if(++count < 5){
        return;
    }
                
    count = 0;
    context.clearRect( 0, 0, canvas.width, canvas.height );
                
    snake.x += snake.dx;
    snake.y += snake.dy;
                
                    
    if( snake.x < 0 ){
        if( butLite.classList.contains('active') ){
            snake.x = canvas.width - grid;
        } else {
            ClearAll();
        }
    } else if ( snake.x >= canvas.width ){
        if( butLite.classList.contains('active') ){
            snake.x = 0;
        } else {
            ClearAll();
        }
    }
                    
    if ( snake.y < 0 ){
        if( butLite.classList.contains('active') ){
            snake.y = canvas.height - grid;
        } else {
            ClearAll();
        }
    } else if ( snake.y >= canvas.height ){
        if( butLite.classList.contains('active') ){
            snake.y = 0;
        } else {
            ClearAll();
        }
    }
                    
                
    snake.cells.unshift( { x: snake.x, y: snake.y } );
                
    if ( snake.cells.length > snake.maxCells ){
        snake.cells.pop();
    }
                
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
                
    context.fillStyle = 'green';
                
    snake.cells.forEach( function( cell, index ){
        context.fillRect( cell.x, cell.y, grid - 1, grid - 1 );
        if ( cell.x === apple.x && cell.y === apple.y ){
            snake.maxCells++;
            apple.x = getRandom(0,24) * grid;
            apple.y = getRandom(0,24) * grid;
            counter.innerHTML = 'Счет: ' + snake.maxCells;
        }
        for ( let i = index + 1; i < snake.cells.length; i++ ){
            if ( cell.x == snake.cells[i].x && cell.y == snake.cells[i].y ){
                ClearAll();
            }
        }
    } );
}
butEvent();
requestAnimationFrame(loop);             
  
//------------------------------------------------------------------------------
function butEvent(){
    document.addEventListener('keydown', function(event){
        if ( event.code == 'ArrowLeft' && snake.dx == 0 ){        //лево
            snake.dx = -grid;
            snake.dy = 0;
        } else if ( event.code == 'ArrowUp' && snake.dy == 0 ) {  //вверх
            snake.dx = 0;
            snake.dy = -grid;
        } else if ( event.code == 'ArrowRight' && snake.dx == 0 ) { //право
            snake.dx = grid;
            snake.dy = 0;
        } else if ( event.code == 'ArrowDown' && snake.dy == 0 ) { //вниз
            snake.dx = 0;
            snake.dy = grid;
        }
    })
    
    let buttonB = document.querySelector('button[class="but4"]');
    let buttonL = document.querySelector('button[class="but2"]');
    let buttonR = document.querySelector('button[class="but1"]');
    let buttunT = document.querySelector('button[class="but3"]');
    
    
    buttunT.addEventListener('click',function(){
        if ( snake.dy == 0 ) {  
            snake.dx = 0;
            snake.dy = -grid;
        }
    });
    
    buttonR.addEventListener('click', function(){
        if ( snake.dx == 0 ) {
            snake.dx = grid;
            snake.dy = 0;
        }
    })
    buttonL.addEventListener('click', function(){
        if ( snake.dx == 0 ){
            snake.dx = -grid;
            snake.dy = 0;
        }
    })
    buttonB.addEventListener('click', function(){
        if ( snake.dy == 0 ) {
            snake.dx = 0;
            snake.dy = grid;
        }
    })
}



let butLite = document.querySelector('#butLite');
let butMedium = document.querySelector('#butMedium');

butMedium.addEventListener('click',function(){
    if( !butMedium.classList.contains('active') ){
        butLite.classList.remove('active');
        butMedium.classList.add('active');
    }
});

butLite.addEventListener('click',function(){
    if( !butLite.classList.contains('active') ){
        butMedium.classList.remove('active');
        butLite.classList.add('active');
    }
})


