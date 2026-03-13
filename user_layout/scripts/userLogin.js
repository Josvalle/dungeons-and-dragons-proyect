const loginForm = document.getElementById('login-form')


loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('login-error')
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(username, password)
    const jsonData = {
        "username":username,
        "password":password
    };
    try{
        console.log(jsonData)
        const loginUser = await axios.post('http://localhost:5000/login', jsonData);
        window.location.href = './user-main.html';
        
    }catch(error){
        if(error.response?.status === 403){
            errorMessage.textContent = 'Username or password incorrect'
        }else{
            alert(`There was and error  ${error}`)
        }
        usernameInput.value = ''
        passwordInput.value = ''
        
        
        
    }

})