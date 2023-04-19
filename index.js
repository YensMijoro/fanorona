const COLONNE = 3
const LIGNE = 3

var fanorona = []
var player =1
var pl1 = 0 //point du player 1
var pl2 =0 //point du player 2

fanorona = arrayInit(COLONNE, LIGNE, 0)
arrayPrinter(fanorona, player)

/**
 * Fonction qui permet d'afficher un tableau selon la structure du fanorona
 * @param {array<string} tab 
 * @param {Number} col
 * @param {Number} row
 */
function arrayPrinter(tab, player){

    let grid = document.querySelector('.grid')
    grid.innerHTML = ""
    let content = ""
    content += "<table class= 'centered'>"
    for(let i = 0; i < tab.length; i++){
        content += '<tr>'
        for(let j = 0; j < tab[i].length; j++){
            content += "<td class='border text-center' style= 'width : 200px; height : 200px'>"
                if( tab[i][j] == 0)
                    content += `<div class='disc'></div>`
                else if( tab[i][j] == 1){
                    if(player == 1)
                        content += `<button onClick="playGame(${[i, j]})" style = "width : 200px; height : 200px"><div class='disc disc-red'></div></button>`
                    else
                        content += `<div class='disc disc-red'></div>`
                } else {
                    if(player == 2)
                        content += `<button onClick="playGame(${[i, j]})" style = "width : 200px; height : 200px"><div class='disc disc-yellow'></div></button>`
                    else
                        content += `<div class='disc disc-yellow'></div>`
                }
            content += '</td>'
        }
        content += '</tr>'
    }
    content += '</table>'
    grid.innerHTML = content
}

/**
 * Fonction qui permet la creation d'un tableau dans un tableau
 * @param {Number} col 
 * @param {Number} lig 
 * @param {*} char 
 * @returns 
 */

function arrayInit(col, lig, char = ''){
    let tab = []
    for(let i = 0; i < lig; i++){
        let row = []
        for(let j = 0; j < col; j++)
            if(i == 0)
                row.push(1)
            else if(i == lig - 1)
                row.push(2)
            else
                row.push(char)
        tab.push(row)
    }
    return tab
}

/**
 * retourne une ligne vide ou -1 si aucun ligne présent sur la colonne n'est vide
 * @param {Object} tokenPosition 
 * @returns 
 */

function getEmptyCell(tokenPosition){
    console.log(tokenPosition);
    let possibleMoove = []

    if(tokenPosition.x - 1 >= 0 && fanorona[tokenPosition.x - 1][tokenPosition.y] == 0){
        possibleMoove.push([tokenPosition.x - 1,tokenPosition.y])
    }
    if(tokenPosition.x + 1 <= LIGNE - 1 && fanorona[tokenPosition.x + 1][tokenPosition.y] == 0)
        possibleMoove.push([tokenPosition.x + 1,tokenPosition.y])
    if(tokenPosition.y + 1 <= COLONNE -1 && fanorona[tokenPosition.x][tokenPosition.y + 1] == 0)
        possibleMoove.push([tokenPosition.x,tokenPosition.y + 1])
    if(tokenPosition.y - 1 >= 0 && fanorona[tokenPosition.x][tokenPosition.y - 1] == 0)
        possibleMoove.push([tokenPosition.x,tokenPosition.y - 1])

    if(tokenPosition.x + 1 <= LIGNE - 1 && tokenPosition.y + 1 <= COLONNE - 1 && fanorona[tokenPosition.x + 1][tokenPosition.y + 1] == 0)
        possibleMoove.push([tokenPosition.x + 1,tokenPosition.y + 1])
    if(tokenPosition.x + 1 <= LIGNE - 1 && tokenPosition.y - 1 >= 0 && fanorona[tokenPosition.x + 1][tokenPosition.y - 1] == 0)
        possibleMoove.push([tokenPosition.x + 1,tokenPosition.y - 1])
    if(tokenPosition.x - 1 >= 0 && tokenPosition.y + 1 <= COLONNE - 1 && fanorona[tokenPosition.x - 1][tokenPosition.y + 1] == 0)
        possibleMoove.push([tokenPosition.x - 1,tokenPosition.y + 1])
    if(tokenPosition.x - 1 >= 0 && tokenPosition.y - 1 >= 0 && fanorona[tokenPosition.x - 1][tokenPosition.y - 1] == 0)
        possibleMoove.push([tokenPosition.x - 1,tokenPosition.y - 1])


    if(possibleMoove.length == 0)
        return -1
    else
        return possibleMoove
}

/**
 * Changer l'emplacement d'un token selon les possibilité de mouvement
 * @param {Object} token 
 * @param {Array} possibleMoove
 * @param {Number} player
 * @returns 
 */

function changePosition(token, possibleMoove, player){
    
    possibleMoove.forEach((el, i) => {
        if(JSON.stringify(el) == JSON.stringify([token.moveTo.x, token.moveTo.y])){
            fanorona[token.moveTo.x][token.moveTo.y] = player
            fanorona[token.initial.x][token.initial.y] = 0
        }
    });
}

/**
 * verifie si un jouer à remplie les conditions pour gagner
 * @param {Number} player 
 * @returns
 */

function gameFinish(player){
    if(colWinner(player) || rowWinner(player) || diagWinner(player))
        return player
    else
        return false
}

/**
 *  Verifie si un joueur à gagner par une horizontale
 * @param {Number} player 
 * @returns 
 */

function rowWinner(player){
   
        for (let j = 0; j <= COLONNE - 1 ; j++) {
            if(fanorona[1][j] == player && fanorona[1][j + 1] == player && fanorona[1][j + 2] == player)
                return true
    }
    return false
}

/**
 *  Verifie si un joueur à gagner par une alignement verticale
 * @param {Number} player 
 * @returns 
 */

function colWinner(player){
    for (let i = 0; i < COLONNE; i++) {
        
        if(fanorona[0][i] == player && fanorona[1][i] == player && fanorona[2][i] == player)
            return true
        }
    
    return false
}

/**
 *  Verifie si un joueur à gagner par une alignement diagonale
 * @param {Number} player 
 * @returns 
 */

function diagWinner(player){
        for (let j = 0; j <= COLONNE - 1; j++) {
            //Diagonale gauche
            if(fanorona[0][j] == player && fanorona[0+1][j+1] == player && fanorona[0+2][j+2] == player)
                return true
            //Diagonale droite
            if(fanorona[0][j] == player && fanorona[1][j-1] == player && fanorona[2][j-2] == player)
                return true
        }
    return false
}

/**
 * Fonction qui permet d'afficher un tableau mettant en evidence les mouvement possible
 * @param {Array} possibleMoove
 * @param {Array} tab
 */

function moveToNewLocation(possibleMoove, tab,  player, xPosition, yPosition){

    let grid = document.querySelector('.grid')
    grid.innerHTML = ""
    let content = ""
    content += "<table class= 'centered'>"
    for(let i = 0; i < tab.length; i++){
        content += '<tr>'
        for(let j = 0; j < tab[i].length; j++){
            content += "<td class='border text-center' style= 'width : 200px; height : 200px'>"
                if( tab[i][j] == 0){
                    possibleMoove.forEach(el => {
                        if(JSON.stringify([i,j]) === JSON.stringify(el))
                            content += `<button onClick="setChangePosition(${[i, j,  player, xPosition, yPosition]})" style = "width : 200px; height : 200px"><div class='disc'></div></button>`
                    })
                }
                else if( tab[i][j] == 1)
                    content += `<div class='disc disc-red'></div>`
                else
                    content += `<div class='disc disc-yellow'></div>`
            content += '</td>'
        }
        content += '</tr>'
    }
    content += '</table>'
    grid.innerHTML = content

}

function setChangePosition(xPos, yPos,  player, xPosition, yPosition){

    let emptyCell = getEmptyCell(
        tokenPosition = {
            x : xPosition, //Ligne
            y : yPosition //colonne
        }
    )

    changePosition(
        token = {
            initial : {
                x : xPosition,
                y : yPosition
            },
            moveTo : {
                x : xPos,
                y : yPos
            }
        },
        emptyCell,
        player
    )

    if(gameFinish(player)){
        let alert = document.querySelector('#alert')
        alert.innerHTML = 'player ' + player + ' win'
    }

    if(player == 1)
        player = 2
    else
        player = 1

    arrayPrinter(fanorona, player)
}

/**
 * une fonction qui permet a un joueur de jouer tant que la partie n'est pas encore terminé
 * @param {Array} token
 * @returns 
 */

function playGame(xPosition, yPosition){ 

    let emptyCell = getEmptyCell(
        tokenPosition = {
            x : xPosition, //Ligne
            y : yPosition //colonne
        }
    )
    
    if(emptyCell !== -1){
        moveToNewLocation(emptyCell, fanorona, player, xPosition, yPosition)
    }

    if(player == 1)
        player = 2
    else
        player = 1

}
