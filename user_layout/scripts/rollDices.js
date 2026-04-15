const token = localStorage.getItem('token')
const divBody = document.getElementById('div-body')


function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function showDicesResutl(dicesRolls){
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  dicesRolls.forEach((roll) => {
    const row = `
    <tr class="table-tr">
            <td>${roll.dice}</td>
            <td>${roll.number}</td>
        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row)
  });
}

async function main(token) {
  try{
    const user_rolls = await axios.get('http://localhost:5000/rolls',{headers: {
                  'Authorization': `Bearer ${token}`
              }})
  if(user_rolls !== null){
    console.log('entro aqui data')
    showDicesResutl(user_rolls.data)
  }else{
    console.log('entro aqui ')
  }
  }catch (error){
        console.log(error)
    }
  
}
main(token)

divBody.addEventListener('click', async (e)=>{
  try{
    const rollButton = e.target.closest('.button-roll');
      if(!rollButton) return;
      const fieldButton = rollButton.dataset.field;
      const change = Number(fieldButton.slice(1))
      const diceImg = document.getElementById(`img-${fieldButton}`)
      const maxNumber = randomNumber(change)
      diceImg.src = `img/dices/${fieldButton}/${fieldButton}-${maxNumber}.png`
      
      const parseData = {
        "dice":fieldButton,
        "number":maxNumber,
      }

      const insertDice = await axios.post('http://localhost:5000/dices', parseData, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
      
      showDicesResutl(insertDice.data)
  }catch (error){
        console.log(error)
    }
      

})

