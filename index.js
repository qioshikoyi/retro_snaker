function draw_game_environment() {
    let game_box = document.querySelector('#game')
    let score_box = document.querySelector('#score')
    game_box.setAttribute('style', `
    height: 500px;
    width: 500px;
    margin-top: 20px;
    margin-left: 20px;
    border: 5px solid blue;
    `)
    score_box.innerHTML = "分数:0"
    //add cell
    for (i = 0; i < 50; i++) {
        for (j = 0; j < 50; j++) {
            let cell = document.createElement('div')
            cell.setAttribute('style', `
            border: .5px solid red;
            float: left;
            height: 9px;
            width: 9px;
            border-radius: 2px;
            `)
            game_box.appendChild(cell)
        }
    }
}

function draw(snake, apple) {
    //清空所有cell颜色
    for (ce of document.querySelectorAll('#game > div')) {
        ce.style.setProperty('background-color', 'white')
    }
    for (i = 0; i < snake.length; i++) {
        //对于每一个snake cell,分别上色
        let n = (snake[i].x - 1) * 50 + snake[i].y
        let snake_cell = document.querySelector('#game>div:nth-child(' + n + ')')
        snake_cell.style.setProperty('background-color', 'red')
        if (i == 0) {
            snake_cell.style.setProperty('background-color', 'yellow')
        }
    }
    let apple_cell = document.querySelector('#game>div:nth-child(' + apple + ')')
    apple_cell.style.setProperty('background-color', 'green')
}

var game_loop
var direction = 'right'
var keydown = 'right'
var apple = -1
var socre_num = 0
//main
!(function () {
    //获取键盘输入
    document.onkeydown = function (e) {
        let keynum = window.event ? e.keyCode : e.which
        switch (keynum) {
            case 76:
                keydown = 'right'
                break;
            case 73:
                keydown = 'up'
                break;
            case 74:
                keydown = 'left'
                break;
            case 75:
                keydown = "down"
                break;
        }
    }
    //打印份数

    draw_game_environment()
    let snake = new Array()
    //起始位置
    snake.push({ x: 20, y: 5 })
    snake.push({ x: 20, y: 4 })
    snake.push({ x: 20, y: 3 })
    snake.push({ x: 20, y: 2 })
    snake.push({ x: 20, y: 1 })
    //game loop
    game_loop = setInterval(() => {
        document.querySelector('#score').innerHTML = "分数:" + socre_num
        //生成一个苹果,这个苹果必须不在蛇身上
        if (apple < 0) {
            apple = Math.ceil(Math.random() * (2500 - snake.length))
            for (let i = 1; i <= apple; i++) {
                for (let s of snake) {
                    if (((s.x - 1) * 50 + s.y) == i) {
                        apple++
                    }
                }
            }
        }
        //蛇头
        let head = snake[0]
        //蛇头的下一个cell
        let next
        //调整方向
        if (direction != keydown && direction + keydown != 'updown' && direction + keydown != 'downup'
            && direction + keydown != 'leftright' && direction + keydown != 'rightleft') {
            direction = keydown
        }
        switch (direction) {
            case 'right':
                next = { x: head.x, y: head.y + 1 }
                break;
            case 'left':
                next = { x: head.x, y: head.y - 1 }
                break;
            case 'up':
                next = { x: head.x - 1, y: head.y }
                break;
            case 'down':
                next = { x: head.x + 1, y: head.y }
                break;
        }
        //对next进行判断
        for (let cell of snake) {
            if (cell.x == next.x && cell.y == next.y) {//吃到自己了,game over
                console.log(cell)
                console.log(next)
                alert('吃到自己了,Game Over!')
                clearInterval(game_loop)
            }
        }
        if (next.x > 50 || next.x < 1 || next.y > 50 || next.y < 1) {//撞墙了,照样死
            alert('撞墙了,Game Over!')
            clearInterval(game_loop)
        }
        //把next加到头部
        snake.unshift(next)
        if ((next.x - 1) * 50 + next.y == apple) {//吃到苹果就不用清除尾巴
            console.log("eat apple")
            draw(snake, apple);
            socre_num++;
            apple = -1;
        } else {
            snake.pop()
            draw(snake, apple);
        }
    }, 120);
    //    draw_snake(snake)
}())