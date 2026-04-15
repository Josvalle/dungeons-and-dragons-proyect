const token = localStorage.getItem('token');
const logoutButton = document.getElementById('logout-button')

async function userData(token) {
    try{
        const response = await axios.get('http://localhost:5000/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(`There was an error: ${error}`)
    }
}

function welcomeUser(userData){
    const welcomeMessage = document.getElementById('welcome-user');
    welcomeMessage.textContent = (`Welcome: ${userData.username} `)
}

async function main() {
    try{
        const userDataR = await userData(token)
        welcomeUser(userDataR)
    }catch (error){
        console.log(error)
    }
}

main();


logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = './user-login.html'
})