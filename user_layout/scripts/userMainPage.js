const userID = 1
const divBody = document.getElementById('body-info')

async function userData(userID) {
    try{
        const response = await axios.get(`http://localhost:5000/users/${userID}`)
        return response.data
    }catch(error){
        console.log(`There was an error: ${error}`)
    }
}

function welcomeUser(userData){
    const welcomeMessage = document.getElementById('welcome-user')
    welcomeMessage.textContent = (`Welcome: ${userData.username} `)
}

function userInformation(userData){
    const userFullN = document.getElementById('full-Name');
    const userUsername = document.getElementById('username');
    const userEmail = document.getElementById('email-info')
    userFullN.textContent = (`Full Name: ${userData.name} ${userData.lastname}`)
    userUsername.textContent = (`Username : ${userData.username}`)
    userEmail.textContent = (`Email: ${userData.email}`)
}

async function main() {
    try{
        const userDataR = await userData(userID)
        welcomeUser(userDataR)
        userInformation(userDataR)
    }catch (error){
        console.log(error)
    }
    
}

main()

divBody.addEventListener('click', (e)=>{
    
    const nameVidiv = document.getElementById('fullname-visible');
    const nameForm = document.getElementById('form-fullname');
    const usernameVisiDiv = document.getElementById('username-visible');
    const usernameForm = document.getElementById('form-username');
    const emailVisiDiv = document.getElementById('email-visible');
    const emailform = document.getElementById('form-email')

    const editButtonName = document.getElementById('edit-fullname')
    const editButtonUsername = document.getElementById('edit-username');
    const editButtonEmail = document.getElementById('edit-email');
    const editButton = e.target.closest('.edit-button');
    const acceptButton = e.target.closest('.accept');
    const cancelButton = e.target.closest('.cancel');
    

    
if (editButton){
    if (editButton.id === 'edit-fullname'){
        nameVidiv.className = 'hidden'
        editButtonUsername.classList.replace('edit-button','hidden')
        editButtonEmail.classList.replace('edit-button','hidden')
        nameForm.className = ''
        
    } else if(editButton.id === 'edit-username') {
        usernameVisiDiv.className = 'hidden';
        editButtonName.classList.replace('edit-button','hidden')
        editButtonEmail.classList.replace('edit-button','hidden')
        usernameForm.className = ''
    }else if(editButton.id === 'edit-email'){
        emailVisiDiv.className = 'hidden';
        editButtonName.classList.replace('edit-button','hidden')
        editButtonUsername.classList.replace('edit-button','hidden')
        emailform.className = ''
    }
}
    

    if (acceptButton){
        e.preventDefault()
        console.log(acceptButton.id)
    }
})

