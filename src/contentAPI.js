import axios from "axios";

const apiJoke = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?type=single";
const apiImage = "https://api.unsplash.com/search/photos";

const client_id = process.env.REACT_APP_CLIENT_ID;

async function randomImgJoke(){
    try {
        const jokeResponse = await axios.get(apiJoke);
        var jokeCategory = jokeResponse.data.category; //Read joke category (Miscellaneous,Dark,Pun,Spooky) and used to specify the searched image.
        if(jokeCategory === "Misc"){ jokeCategory = "Miscellaneous"};
    
        const response = await axios.get(apiImage,{    //return an array of about 10000 image object
            params:{
                query: jokeCategory,
                orientation: "landscape",
                client_id: client_id
            }
        })
        console.log('Rate Limit Remaining:', response.headers.get('x-ratelimit-remaining'));
        const images = response.data.results;
        const ImgURL = images[Math.floor(Math.random()*images.length)].urls.small;
        const imgJoke = {
            newImg: ImgURL,
            newJoke: jokeResponse.data.joke
        }
        return imgJoke;
    } catch (error) {
       console.log("error:", error);
       return {
        img: null,
        joke: null
    };
    }
}
export default randomImgJoke;