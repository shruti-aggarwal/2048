document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let sqgrid = []
  const width = 4
  let score = 0

  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      sqgrid.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * sqgrid.length)
    if (sqgrid[randomNumber].innerHTML == 0) {
      sqgrid[randomNumber].innerHTML = 2
      checkForGameOver()
    } else generate()
  }

  function moveRight() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = sqgrid[i].innerHTML
        let totalTwo = sqgrid[i+1].innerHTML
        let totalThree = sqgrid[i+2].innerHTML
        let totalFour = sqgrid[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeroes = Array(missing).fill(0)
        let newRow = zeroes.concat(filteredRow)

        sqgrid[i].innerHTML = newRow[0]
        sqgrid[i +1].innerHTML = newRow[1]
        sqgrid[i +2].innerHTML = newRow[2]
        sqgrid[i +3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = sqgrid[i].innerHTML
        let totalTwo = sqgrid[i+1].innerHTML
        let totalThree = sqgrid[i+2].innerHTML
        let totalFour = sqgrid[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeroes = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeroes)

        sqgrid[i].innerHTML = newRow[0]
        sqgrid[i +1].innerHTML = newRow[1]
        sqgrid[i +2].innerHTML = newRow[2]
        sqgrid[i +3].innerHTML = newRow[3]
      }
    }
  }


  function moveUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = sqgrid[i].innerHTML
      let totalTwo = sqgrid[i+width].innerHTML
      let totalThree = sqgrid[i+(width*2)].innerHTML
      let totalFour = sqgrid[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeroes = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeroes)

      sqgrid[i].innerHTML = newColumn[0]
      sqgrid[i +width].innerHTML = newColumn[1]
      sqgrid[i+(width*2)].innerHTML = newColumn[2]
      sqgrid[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = sqgrid[i].innerHTML
      let totalTwo = sqgrid[i+width].innerHTML
      let totalThree = sqgrid[i+(width*2)].innerHTML
      let totalFour = sqgrid[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeroes = Array(missing).fill(0)
      let newColumn = zeroes.concat(filteredColumn)

      sqgrid[i].innerHTML = newColumn[0]
      sqgrid[i +width].innerHTML = newColumn[1]
      sqgrid[i+(width*2)].innerHTML = newColumn[2]
      sqgrid[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    for (let i =0; i < 15; i++) {
      if (sqgrid[i].innerHTML === sqgrid[i +1].innerHTML) {
        let combinedTotal = parseInt(sqgrid[i].innerHTML) + parseInt(sqgrid[i +1].innerHTML)
        sqgrid[i].innerHTML = combinedTotal
        sqgrid[i +1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (sqgrid[i].innerHTML === sqgrid[i +width].innerHTML) {
        let combinedTotal = parseInt(sqgrid[i].innerHTML) + parseInt(sqgrid[i +width].innerHTML)
        sqgrid[i].innerHTML = combinedTotal
        sqgrid[i +width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  //checking for the number 2048
  function checkForWin() {
    for (let i=0; i < sqgrid.length; i++) {
      if (sqgrid[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'YOU WIN!'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeroes = 0
    for (let i=0; i < sqgrid.length; i++) {
      if (sqgrid[i].innerHTML == 0) {
        zeroes++
      }
    }
    if (zeroes === 0) {
      resultDisplay.innerHTML = 'YOU LOSE!'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }


  //add colours
  function addColours() {
    for (let i=0; i < sqgrid.length; i++) {
      if (sqgrid[i].innerHTML == 0) sqgrid[i].style.backgroundColor = '#404040'
      else if (sqgrid[i].innerHTML == 2) sqgrid[i].style.backgroundColor = '#b3ffff'
      else if (sqgrid[i].innerHTML  == 4) sqgrid[i].style.backgroundColor = '#80d4ff' 
      else if (sqgrid[i].innerHTML  == 8) sqgrid[i].style.backgroundColor = '#3377ff' 
      else if (sqgrid[i].innerHTML  == 16) sqgrid[i].style.backgroundColor = '#33cccc' 
      else if (sqgrid[i].innerHTML  == 32) sqgrid[i].style.backgroundColor = '#00b3b3' 
      else if (sqgrid[i].innerHTML == 64) sqgrid[i].style.backgroundColor = '#00cca3' 
      else if (sqgrid[i].innerHTML == 128) sqgrid[i].style.backgroundColor = '#00cc7a' 
      else if (sqgrid[i].innerHTML == 256) sqgrid[i].style.backgroundColor = '#00b359' 
      else if (sqgrid[i].innerHTML == 512) sqgrid[i].style.backgroundColor = '#00e699' 
      else if (sqgrid[i].innerHTML == 1024) sqgrid[i].style.backgroundColor = '#00e6e6' 
      else if (sqgrid[i].innerHTML == 2048) sqgrid[i].style.backgroundColor = '#0099e6' 
    }
}
addColours()

var myTimer = setInterval(addColours, 50)

})