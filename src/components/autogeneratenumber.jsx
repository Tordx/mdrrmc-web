const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-%$!";
    let randomString = "";
  
    for (let i = 0; i < 250; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  
    return randomString;
  };
  
  export default generateRandomString;