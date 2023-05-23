import {useState, useEffect} from "react";
import axios from "axios";
import Scene from "../components/scene";

const MainView = () => {
  const [Info, setInfo] = useState([])

  useEffect(async () => {
    const response = await axios.get(process.env.PUBLIC_URL + '../../DB/data.json')
    setInfo(response.data.info)
  }, [])

  return (
      <figure id='mainView'>
        {
          Info.map((data, index) =>
              <Scene key={index}
                     data={data}/>
          )
        }
      </figure>
  );
};

export default MainView;
