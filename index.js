'use strict'
let field = Array()
let info_go = Array()
let move_color = 'black'
let move_from_x
let move_from_y

function show_start_position (){
    field = [
        ['R','P',' ',' ',' ',' ','p','r',],
        ['N','P',' ',' ',' ',' ','p','n',],
        ['B','P',' ',' ',' ',' ','p','b',],
        ['Q','P',' ',' ',' ',' ','p','q',],
        ['K','P',' ',' ',' ',' ','p','k',],
        ['B','P',' ',' ',' ',' ','p','b',],
        ['N','P',' ',' ',' ',' ','p','n',],
        ['R','P',' ',' ',' ',' ','p','r',],
    ]
}

function info_go_color(){
    info_go = [
        [' ',' ',' ',' ',' ',' ',' ',' ',],  //1 - если, фигура может ходить
        [' ',' ',' ',' ',' ',' ',' ',' ',],  //2 - куда может пойти данная фигура
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
    ]
}

function setting_stroke(x, y) { // определение какого цвета фигуры
    let figure = field[x][y];

    if (figure === ' ') {
        return ' ';
    }

    return (figure.toUpperCase() === figure) ? 'black' : 'white'
}

function stroke_capability(x,y){ //сравнение цвета фигуры с очередью хождения
    if(setting_stroke(x,y) === move_color)
    {
        return true
    } else {
        return false
    }
}

function mark_walking_ability(){ // пометить возможность ходить
    info_go_color()
    for (let x = 0;x<=7;x++)
    {
        for (let y = 0;y<=7;y++)
        {
            if(stroke_capability(x,y) === true)
            {
                info_go[x][y] = '1'
            }
        }
    }
}

function mark_walking_ability_there(){ // помечаем куда может ходить данна фигура
    info_go_color()
    for (let x = 0;x<=7;x++)
    {
        for (let y = 0;y<=7;y++)
        {
            if(setting_stroke(x,y) ===' '||(stroke_capability(x,y) === false))//если клетка пустая или на ней стоит фигура противоположного цвета, то мы можем туда ходить
            {
                info_go[x][y] = '2'
            } else {

            }
        }
    }
}


function show_figure(figure){ // показ фигур
    switch (figure){
        case 'p': return '&#9817'
        case 'P': return '&#9823'

        case 'r': return '&#9814'
        case 'R': return '&#9820'

        case 'n': return '&#9816'
        case 'N': return '&#9822'

        case 'b': return '&#9815'
        case 'B': return '&#9821'

        case 'q': return '&#9813'
        case 'Q': return '&#9819'

        case 'k': return '&#9812'
        case 'K': return '&#9818'

        //'&nbsp' - знак неразрывного пробела
        default: return '&nbsp'
    }
}

function click_box(x,y){ // разделим на две функции
    if(info_go[x][y] === '1')
    {
        click_box_from(x,y) //когда выбираем фигуру
    }
    if(info_go[x][y] === '2')
    {
        click_box_to(x,y) //когда ходим фигурой
    }
    if(info_go[x][y] === ' ')
    {
        click_box_from_any(x, y)
    }
}

function click_box_from_any(x, y){
    if(stroke_capability(x,y) === true)
    {
        info_go[move_from_x][move_from_y] = ' '
        move_from_x = x
        move_from_y = y
        info_go[x][y] = '3'
        show_my_bord()
    }else{
        click_box(x,y)
    }
}

function click_box_from(x,y){ // при выборе фигуры нужно знать куда можно походить
    move_from_x = x
    move_from_y = y
    mark_walking_ability_there() // узнаем куда можно пойти
    info_go[x][y] = '3'
    show_my_bord() // показываем доску с закрашенными клетками
}

function click_box_to(x,y){
    field[x][y] = field[move_from_x][move_from_y]
    field[move_from_x][move_from_y] = ' '
    turn_move()
    mark_walking_ability()
    info_go[x][y] = '4'
    show_my_bord()
}

function turn_move(){
    if(move_color === 'black')
    {
        move_color = 'white'
    } else{
        move_color = 'black'
    }
}



function change_color(x,y){ // цвет поля
    if((x+y)%2===0)
    {
        return '#9C6C48'
    }else {
        return '#F2E0CF'
    }
}

function show_my_bord(){ // создание поля с окраской
    let color_cell
    let html = '<table>'
    // создается сначала <tr> - строка(по y) и в каждую строку вписываются <td> - обычные столбцы
    for(let y = 7; y>=0;y--)
    {
        html+='<tr>'

        html+= '<td class="cleen">'
        html+= y + 1
        html+= '</td>'
        for(let x = 0;x<=7;x++)
        {
            if(info_go[x][y] ===' ')
            {
                color_cell = change_color(x,y)
            }
            if(info_go[x][y] === '1') // если фигура может ходить
            {
                color_cell = change_color(x,y)
            }
            if (info_go[x][y] === '2') // куда может ходить
            {
                color_cell = change_color(x,y)
            }
            if(info_go[x][y] === '3')
            {
                color_cell = '#ffe6a1'
            }
            if(info_go[x][y] === '4')
            {
                color_cell = '#a1ffa2'
            }

        //передаются координаты клеток при нажатии на них в функцию click_box()
            html += '<td style=background-color:'+ color_cell +' onclick="click_box('+x+','+y+')"    >'

            html += show_figure(field[x][y])
            html +='</td>'
        }
        html += '</tr>'
    }
    html += '<tr>'
    html += '<td class="cleen"></td>'
    html += '<td class="cleen">A</td>'
    html += '<td class="cleen">B</td>'
    html += '<td class="cleen">C</td>'
    html += '<td class="cleen">D</td>'
    html += '<td class="cleen">E</td>'
    html += '<td class="cleen">F</td>'
    html += '<td class="cleen">G</td>'
    html += '<td class="cleen">H</td>'

    html += '</tr>'
    html+='</table>'

    //document.getElementById() возвращает элемент из html с соответствующим тегом id
    //.innerHTML = html позволяет изменять содержимое элемента
    document.getElementById('my_bord').innerHTML = html
}

function start()
{
    show_start_position()
    mark_walking_ability()
    show_my_bord()
}




