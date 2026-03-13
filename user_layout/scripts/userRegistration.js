const registratioForm = document.getElementById('registration-form')

function parseData(name,lastname,email,username,password,confirmPassword,errorMessage){
    try{
        if (password === confirmPassword){
        const dataRegister = {
            "name":name,
            "lastname":lastname,
            "email":email,
            "username":username,
            'password':password
        };
        
        return dataRegister
    }else{
        errorMessage.textContent = 'Mismtach password and confirm password are not the same '
        
    }
    }catch (error){
        alert(`There was and error ${error}`);
    };
    
}

registratioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('registration-name');
    const lastnameInput = document.getElementById('registration-lastname');
    const emailInput = document.getElementById('user-email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('registration-password');
    const confirmPasswordInput = document.getElementById('registration-con-password');
    const errorMessage = document.getElementById('registration-error')
    const name = nameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();


    try{
        const userInfo = parseData(name,lastname,email,username,password,confirmPassword,errorMessage)
        const registration = await axios.post('http://localhost:5000/register', userInfo)
        errorMessage.textContent = 'All inform good!'
        window.location.href = './user-main.html';

    }catch (error){
        if (error.response?.status === 409){
            errorMessage.textContent = 'Username or Email already on use!'
        }else{
            alert(`There was and error  ${error}`);
        }
        
    };

})