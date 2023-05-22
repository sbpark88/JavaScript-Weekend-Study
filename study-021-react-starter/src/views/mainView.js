import {useState, useEffect} from "react";
import axios from "axios";

const MainView = () => {
  const [Info, setInfo] = useState([])

  useEffect(async () => {
    const response = await axios.get(process.env.PUBLIC_URL + '../../DB/data.json')
    setInfo(response.data.info)
  }, [])

  return (
      <figure>
        {
          Info.map((data, index) => <h1 key={index}>{data['tit']}</h1>)
        }
      </figure>
  );
};

export default MainView;
