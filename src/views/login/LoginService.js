

export default{
    login(user,history){
        localStorage.setItem("currentuser", JSON.stringify(user));
        history.push('/home')
        window.location.reload()
    },

    logout(){
        localStorage.removeItem("currentuser")
    },

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("currentuser"))
    },

    generateUserSessionID(){
        let date = new Date().toISOString().substr(0,10)
        return window.btoa('jedzenie/'+date+'/'+Math.floor((Math.random() * 100) + 1))
    },

    decrypteUserSessionID(usersession){
        return window.atob(usersession)
    }

}