const userID = 1
const divBody = document.getElementById('body-info')
const logout_button = document.getElementById('logout-button')

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

divBody.addEventListener('click', async (e)=>{
    
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
    if(!editButton)return;
    const fieldButton = editButton.dataset.field;

    console.log(fieldButton)
    

    if (fieldButton === 'fullname'){
        nameVidiv.className = 'hidden'
        editButtonUsername.classList.replace('edit-button','hidden')
        editButtonEmail.classList.replace('edit-button','hidden')
        nameForm.className = ''
        
    } else if(fieldButton === 'username') {
        usernameVisiDiv.className = 'hidden';
        editButtonName.classList.replace('edit-button','hidden')
        editButtonEmail.classList.replace('edit-button','hidden')
        usernameForm.className = ''
    }else if(fieldButton === 'email'){
        emailVisiDiv.className = 'hidden';
        editButtonName.classList.replace('edit-button','hidden')
        editButtonUsername.classList.replace('edit-button','hidden')
        emailform.className = ''
    }else if(fieldButton === 'accept-fullname-button'){
        try{
            e.preventDefault()
        const updateNameInput = document.getElementById('name-of-fullname');
        const updateLastNameInput = document.getElementById('lastname-of-fullname');
        const updateName = updateNameInput.value.trim();
        const updateLastName = updateLastNameInput.value.trim();
        const nameUpdateInfo = {
        'id':userID,
        'name':updateName,
        'lastname':updateLastName
        };
        const updateProcess = await axios.post('http://localhost:5000/users/update', nameUpdateInfo)
        location.reload()
        }catch (error){
            console.log(error)
        }
        
    }else if (fieldButton === 'accept-username-button'){
        try{
            e.preventDefault()
            const updateUsernameInput = document.getElementById('username-edit');
            const updateUsername = updateUsernameInput.value.trim();
            const updateInfo = {
            'id':userID,
            'username':updateUsername
            };
            const updateProcess = await axios.post('http://localhost:5000/users/update', updateInfo)
            location.reload()
        }catch (error){
            console.log(error)
        }
    }else if (fieldButton === 'accept-email-button'){
        try{
            e.preventDefault()
            const updateEmailInput = document.getElementById('email-edit');
            const updateEmail = updateEmailInput.value.trim();
            const updateInfo = {
            'id':userID,
            'email':updateEmail
            };
            const updateProcess = await axios.post('http://localhost:5000/users/update', updateInfo)
            location.reload()
        }catch (error){
            console.log(error)
        }
    }
})

logout_button.addEventListener('click', ()=>{
    window.location.href = './user-login.html'
})