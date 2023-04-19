var IA = {

    positionChoice(){
        let possibleTab = this.getTabPossibility()
        let max = 0
        let tabMax = [0]
        
        // for(let i = 1; i<columnTab.length; i++){
        //     if(columnTab[max]<columnTab[i]){
        //         max = i
        //         tabMax = new Array()
        //         tabMax.push(i)
        //     } else if(columnTab[max] === columnTab[i]){
        //         tabMax.push(i)
        //     }
        // }
        // console.log(position);
        // return tabMax[Math.floor(Math.random() * tabMax.length)]
    },

    getTabPossibility: function(){
        let possibleTab = []
        for(let i = 0; i <= LIGNE - 1; i++){
            for(let j = 0; j <= COLONNE - 1; j++){
                if(fanorona[i][j] == player)
                    possibleTab.push(getEmptyCell(
                        tokenPosition = {
                            x : i, //Ligne
                            y : j //colonne
                        }
                    ))
            }
        }
        return possibleTab
    },

    getPoidsCell: function(row, column){
        let poids = 0

        if(row == -1) return 0 //La colonne est pleine => 0
        if(this.winCheck(row, column, 2)) return 100 //il y a une possibilité de gagner (IA) => 100
        if(this.winCheck(row, column, 1)) return 99 //il y a une possibilité de perdre (IA) => 99
        if(this.coupPerdant(row, column)) return -1 //eviter de faire un coup perdant
        poids += this.getPoidsBase(row, column)
        return poids
        //addition des poids
    },

}