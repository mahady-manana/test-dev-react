const signin = async (user) => {
    try {
      let response = await fetch('/user/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(error) {
      console.log(error);
    }
}
const signout = async () => {

    try {
      let response = await fetch('/user/signout')
        return await response.json()
    } catch(err) {
      console.log(err)
    }
  } 
export {
  signin,
  signout,
}