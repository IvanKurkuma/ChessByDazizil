'use strict'
let field = Array()
let info_go = Array()
let info_write_go_back = Array()
let move_color = 'black'
let move_from_x
let move_from_y
info_write_go_back = []

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
            if(info_go[x][y] ===' ')//info_go[7][0](1 элемент) - H1
            {
                color_cell = change_color(x,y)
            }
            if(info_go[x][y] === '1') // если фигура может ходить
            {
                color_cell = change_color(x,y)
            }
            if (info_go[x][y] === '2') // куда может ходить
            {
                color_cell = '#a1ffa2'
            }
            if(info_go[x][y] === '3')
            {
                color_cell = '#ffe6a1'
            }
            if(info_go[x][y] === '4')
            {
                color_cell = '#a1ffa2'
            }
            //задается цвет клетке с помощью color_cell
            //передаются координаты клеток при нажатии на них в функцию click_box()
            html += '<td style=background-color:'+ color_cell +' onclick="click_box('+x+','+y+')">'
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

function change_color(x,y){ // цвет поля
    if((x+y)%2===0)
    {
        return '#c89c7b'
    }else {
        return '#F2E0CF'
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

function can_move(sx,sy,dx,dy) { // если
    // а) очередь выбранной фигуры
    // б) это фигура
    // в) это правильный(доступный) ход
    // то true иначе false
    if(!stroke_capability(sx,sy)){
        return false
    }else if(!setting_stroke(dx,dy)) {
        return false
    }else if(!is_correct_move(sx,sy,dx,dy)){
        return false
    } else{
        return true
    }
}

function is_correct_move(sx,sy,dx,dy) { // проверять корректность хода для каждой фигуры в отдельности
    let figure = field[sx][sy]
    if(is_knight(figure))
    {
        return is_correct_knight_move(sx,sy,dx,dy)
    }
    if(is_rook(figure))
    {
        return is_correct_rook_move(sx,sy,dx,dy)
    }
    if(is_pawn(figure))
    {
        return is_correct_pawn_move(sx,sy,dx,dy)
    }
    if(is_king(figure))
    {
        if(is_rochade_valid(sx,sy,dx,dy))
        {
            return rochade(sx,sy,dx,dy)
        } 
        return is_correct_king_move(sx,sy,dx,dy)
    }
    if(is_queen(figure))
    {
        return is_correct_queen_move(sx,sy,dx,dy)
    }
    if(is_bishop(figure))
    {
        return is_correct_bishop_move(sx,sy,dx,dy)
    }
}

function rochade(sx,sy,dx,dy){

}


function is_rochade_valid(sx,sy,dx,dy){
    let figure = field[sx][sy]
    let second_figure = field[dx][dy+1]
    if(is_king(figure) && field[dx][dy] === ' ' && is_rook(second_figure))
    {
        return true
    }
}

function is_rook(figure) {
    return figure.toUpperCase() === 'R';
}

function is_correct_rook_move(sx, sy, dx, dy) {
    if (sx === dx || sy === dy) {
        return is_path_clear(sx, sy, dx, dy);
    }
    return false;
}

function is_bishop(figure) {
    return figure.toUpperCase() === 'B';
}

function is_correct_bishop_move(sx, sy, dx, dy) {
    if (Math.abs(dx - sx) === Math.abs(dy - sy)) {
        return is_path_clear(sx, sy, dx, dy);
    } else {
        return false
    }
}

function is_queen(figure) {
    return figure.toUpperCase() === 'Q';
}

function is_correct_queen_move(sx, sy, dx, dy) {
    return is_correct_rook_move(sx, sy, dx, dy) || is_correct_bishop_move(sx, sy, dx, dy);
}

function is_path_clear(sx, sy, dx, dy) {
    let stepX = dx > sx ? 1 : dx < sx ? -1 : 0;
    let stepY = dy > sy ? 1 : dy < sy ? -1 : 0;
    let x = sx + stepX;
    let y = sy + stepY;

    while (x !== dx || y !== dy) {
        if (field[x][y] !== ' ') {
            return false;
        }
        x += stepX;
        y += stepY;
    }
    return true;
}


//////////////////////////////////////////////////pawn
function is_pawn(figure){
    return figure.toUpperCase() === 'P'
}

function is_correct_pawn_move(sx, sy, dx, dy) {
    let figure = field[sx][sy];
    let direction = (figure === 'P') ? 1 : -1; // Белые идут вверх, черные вниз

    // Обычный ход пешки на одну клетку вперед
    if (sx === dx && dy - sy === direction && field[dx][dy] === ' ') {
        return true;
    }

    // Первый ход пешки (две клетки вперед)
    if (sx === dx && dy - sy === 2 * direction && field[dx][dy] === ' ' && field[sx][sy + direction] === ' ') {
        if ((figure === 'P' && sy === 1) || (figure === 'p' && sy === 6)) {
            return true;
        }
    }

    // Пешка бьет фигуры по диагонали
    if (Math.abs(dx - sx) === 1 && dy - sy === direction && field[dx][dy] !== ' ' && setting_stroke(dx, dy) !== move_color) {
        return true;
    }

    return false;
}

function is_knight(figure){
    return figure.toUpperCase() === 'N'
}

function is_correct_knight_move(sx,sy,dx,dy){
    if(Math.abs(dx-sx) === 1 && Math.abs(dy-sy) === 2)
    {
        return true
    }
    if(Math.abs(dx-sx) === 2 && Math.abs(dy-sy) === 1){
        return true
    }else{
        return false
    }
}

function is_king(figure){
    return figure.toUpperCase(figure) === 'K'
}

function is_correct_king_move(sx,sy,dx,dy){
    if(Math.abs(dx-sx) <= 1 && Math.abs(dy-sy) <= 1)
    {
        return true
    } else {
        return false
    }
}

//вызываем массив, потом проходимся по начальным координатам и конечным и если все условия can_move() выполняются, то помечаем цветом фигуру
function mark_walking_ability(){
    info_go_color()
    for (let sx = 0;sx<=7;sx++)
        for (let sy = 0; sy <= 7; sy++)
            for (let dx = 0; dx <= 7; dx++)
                for (let dy = 0; dy <= 7; dy++)
                    if(can_move(sx,sy,dx,dy))
                        info_go[sx][sy] = '1'
}
// помечаем места, куда мы можем походить помеченной фигурой. Если пустая клетка или фигура другого цвета, то мы можем туда ходить
function mark_walking_ability_there(){ //помечаем куда может ходить данная фигура
    info_go_color()
    for (let x = 0;x<=7;x++)
        for (let y = 0;y<=7;y++)
            if(can_move(move_from_x,move_from_y,x,y))
                if(setting_stroke(x,y) ===' '||(stroke_capability(x,y) === false))//если клетка пустая или на ней стоит фигура противоположного цвета, то мы можем туда ходить
                    info_go[x][y] = '2'
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
    if(info_go[x][y] === ' ' && move_color === 'black' && setting_stroke(x,y) === 'black')
    {
        click_box_from_any(x, y)
    }
    if(info_go[x][y] === ' ' && move_color === 'white' && setting_stroke(x,y) === 'white')
    {
        click_box_from_any(x, y)
    }
}

function click_box_from_any(x, y){
    info_go[move_from_x][move_from_y] = ' '
    move_from_x = x
    move_from_y = y
    info_go[x][y] = '3'
    mark_walking_ability()
    show_my_bord()
    click_box(x,y)
}

function click_box_from(x,y){ // при выборе фигуры нужно знать куда можно походить
    move_from_x = x
    move_from_y = y
    mark_walking_ability_there() // узнаем куда можно пойти
    info_go[x][y] = '3'
    show_my_bord() // показываем доску с закрашенными клетками
}

function click_box_to(x,y){ // отвечает за ход фигуры
    field[x][y] = field[move_from_x][move_from_y]
    field[move_from_x][move_from_y] = ' '
    let deleted_figure = field[x][y]
    let text_go_back = field[x][y]
    text_go_back += move_from_x
    text_go_back += move_from_y
    text_go_back += x
    text_go_back += y
    text_go_back += deleted_figure
    info_write_go_back.push(text_go_back)
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

// скрипт для кнопки хода назад
function bring_it_back(){
    if(info_write_go_back.length>=1) {
        let xm
        //извлекает из массива последнее значение и сохраняет в переменную xm измененный массив
        xm = info_write_go_back.pop()
        xm.split('')
        let figure = xm[0]
        let sx = xm[1]
        let sy = xm[2]
        let dx = xm[3]
        let dy = xm[4]
        let deleted_figure = xm[5]
        field [sx][sy] = figure
        field [dx][dy] = deleted_figure
        turn_move()
        mark_walking_ability()
        field [dx][dy] = '3'
        show_my_bord()
    }
}

function start()
{
    show_start_position()
    mark_walking_ability()
    show_my_bord()
}

