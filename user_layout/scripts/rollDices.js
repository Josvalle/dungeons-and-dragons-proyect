user_id = 1
const divBody = document.getElementById('div-body')


function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}



divBody.addEventListener('click', (e)=>{
    const rollButton = e.target.closest('.button-roll');
    if(!rollButton) return;
    const fieldButton = rollButton.dataset.field;
    const change = Number(fieldButton.slice(1))
    const diceImg = document.getElementById(`img-${fieldButton}`)
    maxNumber = randomNumber(change)
    diceImg.src = `img/dices/${fieldButton}/${fieldButton}-${maxNumber}.png`
    
    const parseData = {
      "dice":fieldButton,
      "number":maxNumber,
      "user_id":user_id
    }

    
})