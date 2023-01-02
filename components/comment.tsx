import { useEffect, useState } from "react";
import { IComment } from "../models/comments";
import style from "./comment.module.css";
import axios from "axios";

interface CommentType {
  comment: IComment;
}

const Comment = ({ comment }: CommentType) => {
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const channelRes: any = await axios.get(
          `/users/find/${comment.userId}`
        );

        setChannel(channelRes.data);
      } catch (error) {}
    };

    fetchComment();
  }, [comment.userId]);

  return (
    <div>
      <div className={style.container}>
        <img src={channel?.img} className={style.avatar} />
        <div className={style.details}>
          <div className={style.name}>
            {channel?.name} <span className={style.date}></span>
          </div>
          <div className={style.text}>{comment.desc} </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
