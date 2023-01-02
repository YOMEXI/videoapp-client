import { useEffect, useState } from "react";

import style from "./search.module.css";

import axios from "axios";
import { IVideo } from "../../../models/video";
import Card from "../../../components/Card";
import { useRouter } from "next/router";

interface HomePage {
  type: string;
}

const Search = ({ type }: HomePage) => {
  const [videos, setVideos] = useState<IVideo[] | []>([]);
  const router = useRouter();

  const query = router.query.search;

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`/api/video/search?q=${query}`);
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <div className={style.homeCards}>
        {videos.map((video: IVideo, i) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Search;
