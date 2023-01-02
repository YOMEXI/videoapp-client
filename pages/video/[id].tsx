import { useRouter } from "next/router";
import Comments from "../../components/Comments";
import Comment from "../../components/comment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import style from "./video.module.css";
import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsShareFill,
  BsFillSaveFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { IVideo } from "../../models/video";
import { IUser } from "../../models/user";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../../redux/video/videoSlice";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { subscription } from "../../redux/user/userSlice";

const SingleVideo = () => {
  const { currentVideo } = useAppSelector((state) => state.video);

  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [channel, setChannel] = useState<any>(null);

  const vidId = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes: any = await axios.get(
          `/api/video/find/${router.query.id}`
        );
        const channelRes: any = await axios.get(
          `/api/users/find/${videoRes.data.userId}`
        );

        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes);
      } catch (error) {}
    };

    fetchData();
  }, [router.query.id, dispatch]);

  const handleLike = async () => {
    if (!currentUser) return toast.error("Unauthorized ,Please login");
    await axios.put(`users/like/${currentVideo?._id}`);
    dispatch(like(currentUser?._id));
  };
  const handleDisLike = async () => {
    if (!currentUser) return toast.error("Unauthorized ,Please login");
    await axios.put(`users/dislike/${currentVideo?._id}`);

    dispatch(dislike(currentUser?._id));
  };

  const handleSub = async () => {
    if (!currentUser) return toast.error("Unauthorized ,Please login");
    currentUser?.subscribedUsers.includes(channel?.data._id)
      ? await axios.put(`users/unsub/${channel?.data._id}`)
      : await axios.put(`users/sub/${channel?.data._id}`);
    dispatch(subscription(channel?.data._id));
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.videobox}>
          <video className={style.iframe} controls width={"100%"}>
            <source src={currentVideo?.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className={style.title}>{currentVideo?.title}</div>

        <div className={style.details}>
          <div className={style.info}>
            {currentVideo?.views} views. {format(currentVideo?.createdAt)}
          </div>
          <div className={style.buttons}>
            <div className={style.button} onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <BsHandThumbsUpFill style={{ color: "red" }} />
              ) : (
                <BsHandThumbsUpFill />
              )}
              {currentVideo?.likes.length}
            </div>
            <div className={style.button} onClick={handleDisLike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <BsHandThumbsDownFill style={{ color: "red" }} />
              ) : (
                <BsHandThumbsDownFill />
              )}
              {currentVideo?.dislikes.length}
            </div>
            <div className={style.button}>
              {/* <BsShareFill />
              777 */}
            </div>
            <div className={style.button}>
              {/* <BsFillSaveFill />
              777 */}
            </div>
          </div>
        </div>
        <div className={style.channel}>
          <div className={style.channelInfo}>
            <img src={channel?.img} className={style.channelImg} />

            <div className={style.channeldetail}>
              <div className={style.channelname}>{channel?.name}</div>
              <div className={style.channelcounter}>
                {channel?.subscribers ? channel?.subscribers : 0} subscribers{" "}
              </div>
              <div className={style.description}>{currentVideo?.desc}</div>
            </div>
          </div>
          <div className={style.subscribe} onClick={handleSub}>
            {currentUser?.subscribedUsers.includes(channel?.data?._id)
              ? "subscribed"
              : "subscribe"}
          </div>
        </div>
        <hr />
        <Comments videoId={currentVideo?._id} />
      </div>
      <div className={style.recommendation}>rrr</div>
    </div>
  );
};

export default SingleVideo;
