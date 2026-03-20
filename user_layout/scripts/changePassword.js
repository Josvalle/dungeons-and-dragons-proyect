const userID = 1
const changeButton = document.getElementById('accept-change')
const changeCancel = document.getElementById('cancel-change')

changeButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    const oldPasswordInput = document.getElementById('old-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPInput = document.getElementById('new-password-confirm');
    const errorMessage = document.getElementById('error-message');
    const oldPassword = oldPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmNewP = confirmNewPInput.value.trim();

    if(newPassword === confirmNewP){
        const jsonData ={
            'old':oldPassword,
            'new':newPassword,
        }
        try{
            const changePassword = await axios.post(`http://localhost:5000/user/password/change/${userID}`, jsonData)
            alert('Password change Succesfully')
            window.location.href = './user-main.html'
        }catch(error){
            if(error.response?.status === 403){
                oldPasswordInput.value = '';
                newPasswordInput.value = '';
                confirmNewPInput.value = ''
                errorMessage.textContent = 'Old Password do not match'
        }else{
            alert(`There was and error  ${error}`)
        }
        }
    }else{
        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmNewPInput.value = ''
        errorMessage.textContent = 'New Password and confirm password do not match, please try again!!!'
        
    }
})

changeCancel.addEventListener('click', ()=>{
    window.location.href = './user-main.html'
})