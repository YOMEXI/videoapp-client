import { useEffect, useState } from "react";
import Card from "../Card";
import style from "./Home.module.css";
import { IVideo } from "../../models/video";
import axios from "axios";

interface HomePage {
  type: string;
}

const Home = ({ type }: HomePage) => {
  const [videos, setVideos] = useState<IVideo[] | []>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`/video/${type}`);
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <div className={style.mainbox}>
        <div className={style.mainImg}></div>
        <div className={style.maintext}>Lets Know you</div>
      </div>
      <div className={style.homeCards}>
        {videos.map((video: IVideo, i) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
