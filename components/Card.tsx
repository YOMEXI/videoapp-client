import Link from "next/link";
import { format } from "timeago.js";
import style from "./Card.module.css";
import { IVideo } from "../models/video";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../models/user";

interface Card {
  video: IVideo;
}

const Card = ({ video }: Card) => {
  const [channel, setChannel] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const { data } = await axios.get(`/users/find/${video?.userId}`);
      setChannel(data);
    };

    fetchChannel();
  }, [video?.userId]);

  return (
    <Link href={`/video/${video?._id}`}>
      <div className={style.container}>
        <img src={video?.imgUrl} alt="" className={style.cardImg} />
        <div className={style.details}>
          <img src={channel?.img} alt="" className={style.channelImg} />

          <div className={style.texts}>
            <div className={style.title}>{video?.title}</div>
            <div className={style.channelname}>{channel?.name}</div>
            <div className={style.info}>
              {video?.views} views. {format(video?.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
