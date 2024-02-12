import randomImgJoke from "../contentAPI.js";
import React, {useState,useEffect} from "react";

function App() {
  const [imgJoke, setImgJoke] = useState({ image: null, joke: null });
  const [isClicked, setClicked] = useState(false);


  useEffect(() => {
    const fetcher = async() => {
      try {
        const {newImg, newJoke} = await randomImgJoke();
        setImgJoke({image: `url(${newImg}`, joke: newJoke});
        if(newImg === undefined || newJoke === undefined){
          setImgJoke({image: "url(/oth.jpg)", joke: "No joke for today, server is down."});
        }
      }catch (error) {
        console.log("error fetching: ", error);
        setImgJoke({image: "url(/oth.jpg)", joke: "No joke for today, server is down."});
      }
    }
    fetcher();
  }, [isClicked]);

  console.log("app:", imgJoke);
  return (
    <div>
      <button id="main-button" onClick={()=>{ setClicked(!isClicked)}}>Show random joke</button>
      <div id="bg-image" style={{backgroundImage:imgJoke.image}}>
        <div id="joke">
              <p>{imgJoke.joke}</p>
          </div>
      </div>
    </div>
  );
}
export default App;
