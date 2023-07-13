let mainTable = document.querySelector('.main')
let whosTurn = document.querySelector('.whosTurn')
let points = document.querySelector('.points')
let maxHtml = document.querySelector('.maxPoints')
let blackNameHtml = document.querySelector('.blackName')
let whiteNameHtml = document.querySelector('.whiteName')
let newGame = document.querySelector('.newGame')


let turn = 'white'
let pointsToWin = 2
let whitePoints = 0
let blackPoints = 0

let blackGameOver = false
let whiteGameOver = false
let blackRoundOver = false
let whiteRoundOver = false

let whiteKispadCount = 8
let whiteRemaining = 8
let blackKispadCount = 8
let blackRemaining = 8

let table = []
const blackKispadCells = []
const whiteKispadCells = []

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);

        if (this.contains(targetElement)) {
            handler.call(targetElement, event)
        }
    });
}

function setGameEnd() {
    if (whitePoints === pointsToWin || blackRemaining === 0) {
        alert('Fehér nyert!')
        whiteGameOver = true
    }
    else if (blackPoints === pointsToWin || whiteRemaining === 0) {
        alert('Fekete nyert!')
        blackGameOver = true
    }
}

//HTML tablazatot csinal
function generateTable(rowCount, columnCount) {
    let html = ''
    for (let i = 0; i < rowCount; i++) {
        html += '<tr>'
        for (let j = 0; j < columnCount; j++) {
            let cellId = `cell${i * columnCount + j + 1}`
            html += `<td id="${cellId}"></td>` //Row ${i + 1}, Column ${j + 1}
        }
        html += '</tr>'
    }
    mainTable.innerHTML = html
}



//nem csak updatel, hanem general is
function updateTable(rowCount, columnCount) {
    for (let i = 0; i < rowCount; i++) {
        table[i] = []
        for (let j = 0; j < columnCount; j++) {
            let cellId = `cell${i * columnCount + j + 1}`
            let cell = document.getElementById(cellId)
            table[i][j] = cell.classList.toString()
        }
    }
}

//KISPAD
for (let i = 1; i <= 8; i++) {
    const cell = document.getElementById('blackCell' + i);
    blackKispadCells.push(cell)
}

for (let i = 1; i <= 8; i++) {
    const cell = document.getElementById('whiteCell' + i);
    whiteKispadCells.push(cell)
}

function changeKispad(color) {
    if (color === 'black') {
        for (let i = 0; i < blackRemaining; i++) {
            AddCatWithoutRemaining(blackKispadCells[i], 'black')
            //console.log(i)
            //console.log(blackRemaining);
        }
        for (let i = 7; i >= blackRemaining; i--) {
            removeCat(blackKispadCells[i])
        }
    }
    else if (color === 'white') {
        for (let i = 0; i < whiteRemaining; i++) {
            //console.log(i)
            //console.log(whiteRemaining);
            AddCatWithoutRemaining(whiteKispadCells[i], 'white')

        }
        for (let i = 7; i >= whiteRemaining; i--) {
            removeCat(whiteKispadCells[i])
        }
    }
}

function setWhosTurn() {
    if (turn === 'white') {
        whosTurn.innerText = `⚫ Ki jön`
        turn = 'black'
    }
    else if (turn === 'black') {
        whosTurn.innerText = `Ki jön ⚪`
        turn = 'white'
    }
}

function updatePoints() {
    points.innerText = `${blackPoints} | Pontszám | ${whitePoints}`
    maxHtml.innerText = `A győzelemhez szükséges pont: ${pointsToWin}`
}

//cicak beallitasa a cellakra
function AddCat(cell, color) {
    if (color === 'black') {
        cell.style.backgroundImage = 'url(blackCat.png)'
        cell.classList.add('blackCat')
        cell.classList.add('occupied')
        blackRemaining -= 1
    }
    else if (color === 'white') {
        cell.style.backgroundImage = 'url(whiteCat.png)'
        cell.classList.add('whiteCat')
        cell.classList.add('occupied')
        whiteRemaining -= 1
    }
    cell.style.backgroundSize = 'cover'
}

function AddCatWithoutRemaining(cell, color) {
    if (color === 'black') {
        cell.style.backgroundImage = 'url(blackCat.png)'
        cell.classList.add('blackCat')
        cell.classList.add('occupied')
    }
    else if (color === 'white') {
        cell.style.backgroundImage = 'url(whiteCat.png)'
        cell.classList.add('whiteCat')
        cell.classList.add('occupied')
    }
    cell.style.backgroundSize = 'cover'
}

function removeCat(cell) {
    cell.style.backgroundImage = 'none'
    cell.classList.remove('blackCat')
    cell.classList.remove('whiteCat')
    cell.classList.remove('occupied')
}

function isOccupied(cell) {
    return cell.classList.contains('occupied');
}

//table alapjan beallitja a htmlt is 
function updateCats() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (table[i][j] === 'blackCat occupied') {
                AddCatWithoutRemaining(document.getElementById(`cell${i * 6 + j + 1}`), 'black')
            }
            else if (table[i][j] === 'whiteCat occupied') {
                AddCatWithoutRemaining(document.getElementById(`cell${i * 6 + j + 1}`), 'white')
            }
            else if (table[i][j] === '') {
                removeCat(document.getElementById(`cell${i * 6 + j + 1}`))
            }
        }
    }
}

// JÁTÉK ELEJI PROMPTOK
let num = prompt("Add meg a nyeréshez szükséges pontot:")
pointsToWin = parseInt(num)

let blackName = prompt("Add meg a fekete játékos nevét:")
let whiteName = prompt("Add meg a fehér játékos nevét:")
blackNameHtml.innerText = blackName
whiteNameHtml.innerText = whiteName

generateTable(6, 6)
//inicializalasnak meghivjuk
updateTable(6, 6)
changeKispad('black')
changeKispad('white')
setWhosTurn()
updatePoints()

const cells = document.querySelectorAll('.main td')
//visszaadja a kattintott cella [x, y] koordinatait 0-tól 
function getXYposOfCell(cell) {
    let xy = []
    let id = cell.id.slice(4) - 1
    let x = Math.floor(id / 6)
    let y = parseInt(id) % 6
    xy.push(x)
    xy.push(y)
    //console.log(xy)
    return xy
}

function getCellByXY(x, y) {
    return document.getElementById(`cell${x * 6 + y + 1}`)
}

function threeCatsInLine() {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            // Check for matches in rows
            if (j <= 3 && table[i][j] !== "" &&
                table[i][j] === table[i][j + 1] &&
                table[i][j] === table[i][j + 2]) {
                if (table[i][j] === 'whiteCat occupied') {
                    whiteRemaining += 3
                    whitePoints++
                }
                else if (table[i][j] === 'blackCat occupied') {
                    blackRemaining += 3
                    blackPoints++
                }
                table[i][j] = ''
                table[i][j + 1] = ''
                table[i][j + 2] = ''
            }

            // Check for matches in columns
            if (i <= 3 && table[i][j] !== "" &&
                table[i][j] === table[i + 1][j] &&
                table[i][j] === table[i + 2][j]) {
                if (table[i][j] === 'whiteCat occupied') {
                    whiteRemaining += 3
                    whitePoints++
                }
                else if (table[i][j] === 'blackCat occupied') {
                    blackRemaining += 3
                    blackPoints++
                }
                table[i][j] = ''
                table[i + 1][j] = ''
                table[i + 2][j] = ''
            }

            // Check for matches in diagonals (top left to bottom right)
            if (i <= 3 && j <= 3 && table[i][j] !== "" &&
                table[i][j] === table[i + 1][j + 1] &&
                table[i][j] === table[i + 2][j + 2]) {
                if (table[i][j] === 'whiteCat occupied') {
                    whiteRemaining += 3
                    whitePoints++
                }
                else if (table[i][j] === 'blackCat occupied') {
                    blackRemaining += 3
                    blackPoints++
                }
                table[i][j] = ''
                table[i + 1][j + 1] = ''
                table[i + 2][j + 2] = ''
            }

            // Check for matches in diagonals (bottom left to top right)
            if (i >= 2 && j <= 3 && table[i][j] !== "" &&
                table[i][j] === table[i - 1][j + 1] &&
                table[i][j] === table[i - 2][j + 2]) {
                if (table[i][j] === 'whiteCat occupied') {
                    whiteRemaining += 3
                    whitePoints++
                }
                else if (table[i][j] === 'blackCat occupied') {
                    blackRemaining += 3
                    blackPoints++
                }
                table[i][j] = ''
                table[i - 1][j + 1] = ''
                table[i - 2][j + 2] = ''
            }
        }
    }
    updatePoints()
}

function pushNeighbouringCats(xy) {
    let x = xy[0]
    let y = xy[1]
    let neighbours = [
        [x - 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
        [x + 1, y], [x + 1, y - 1], [x, y - 1], [x - 1, y - 1]
    ]

    for (let i = 0; i < neighbours.length; i++) {
        let nX = neighbours[i][0], nY = neighbours[i][1]
        if (nX >= 0 && nX < 6 && nY >= 0 && nY < 6) {
            let nValue = table[nX][nY]
            if (nValue !== "") {
                //ahova pusholodnak
                let pushX = nX + (nX - x)
                let pushY = nY + (nY - y)
                if (pushX >= 0 && pushX < 6 && pushY >= 0 && pushY < 6 && table[pushX][pushY] === "") {
                    table[pushX][pushY] = nValue
                    table[nX][nY] = ""
                    updateCats()
                }
                //lelokodes
                else if (pushX < 0 || pushX >= 6 || pushY < 0 || pushY >= 6) {
                    //console.log('lelekodott');
                    if (table[nX][nY] === 'whiteCat occupied') {
                        whiteRemaining++
                    }
                    else if (table[nX][nY] === 'blackCat occupied') {
                        blackRemaining++
                    }
                    table[nX][nY] = ''
                    updateCats()
                }
            }
        }
        //console.log(nX, nY, x, y);
    }
}

//eventListener a main tablazatra
delegate(mainTable, 'click', 'td', function (event) {
    for (let cell of cells) {
        cell.style.outline = 'none';
    }
    //console.log(this.innerText)
    if (!blackGameOver || !whiteGameOver) {
        if (!isOccupied(this)) {
            //console.log(table)
            if (turn === 'white') {
                AddCat(this, 'white')
            }
            else if (turn === 'black') {
                AddCat(this, 'black')
            }
            updateTable(6, 6)
            let xy = getXYposOfCell(this)
            pushNeighbouringCats(xy)
            //kesleltetes?

            threeCatsInLine()
            updateCats() //a 3 egy vonalban levoket tunteti el

            changeKispad('white')
            changeKispad('black')


            setWhosTurn()
            updatePoints()
            setGameEnd()
        }
    }
})

newGame.addEventListener('click', function () {
    //console.log('new game');
    turn = 'white'
    whitePoints = 0
    blackPoints = 0
    whiteRemaining = 8
    blackRemaining = 8
    updatePoints()
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            table[i][j] = ''
        }
    }
    for (let i = 1; i <= 8; i++) {
        const cell = document.getElementById('blackCell' + i);
        blackKispadCells.push(cell)
    }

    for (let i = 1; i <= 8; i++) {
        const cell = document.getElementById('whiteCell' + i);
        whiteKispadCells.push(cell)
    }
    setWhosTurn()
    updateCats()
})

for (let cell of cells) {
    cell.addEventListener('mouseenter', () => {
        if (!isOccupied(cell)) {
            let xy = getXYposOfCell(cell)
            let x = xy[0]
            let y = xy[1]
            let neighbours = [
                [x - 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
                [x + 1, y], [x + 1, y - 1], [x, y - 1], [x - 1, y - 1]
            ]

            for (let i = 0; i < neighbours.length; i++) {
                let nX = neighbours[i][0], nY = neighbours[i][1]
                if (nX >= 0 && nX < 6 && nY >= 0 && nY < 6) {
                    let nValue = table[nX][nY]
                    if (nValue !== "") {
                        let pushX = nX + (nX - x)
                        let pushY = nY + (nY - y)
                        if (!(pushX >= 0 && pushX < 6 && pushY >= 0 && pushY < 6) || table[pushX][pushY] === "") {
                            getCellByXY(nX, nY).style.outline = '2px solid red';
                        }
                    }
                }
            }
        }
    })

    cell.addEventListener('mouseleave', () => {
        if (!isOccupied(cell)) {
            let xy = getXYposOfCell(cell)
            let x = xy[0]
            let y = xy[1]
            let neighbours = [
                [x - 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
                [x + 1, y], [x + 1, y - 1], [x, y - 1], [x - 1, y - 1]
            ]

            for (let i = 0; i < neighbours.length; i++) {
                let nX = neighbours[i][0], nY = neighbours[i][1]
                if (nX >= 0 && nX < 6 && nY >= 0 && nY < 6) {
                    let nValue = table[nX][nY]
                    if (nValue !== "") {
                        getCellByXY(nX, nY).style.outline = 'none';
                    }
                }
            }
        }
    });
}