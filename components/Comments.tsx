import { FormEvent, useEffect, useState } from "react";
import Comment from "./comment";
import style from "./comments.module.css";
import axios from "axios";
import { IComment } from "../models/comments";
import { useAppSelector } from "../redux/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Comment {
  videoId: string | undefined;
}

const Comments = ({ videoId }: Comment) => {
  const { currentVideo } = useAppSelector((state) => state.video);

  const { currentUser } = useAppSelector((state) => state.user);

  const [comments, setComments] = useState<IComment[] | null>(null);

  const [desc, setDesc] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/${videoId}`);
        setComments(res.data);
      } catch (error) {}
    };

    fetchComments();
  }, [videoId]);

  const AddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return toast.error("Unauthorized ,Please login");

    try {
      const { data } = await axios.post(`/comment`, {
        desc,
        videoId,
      });

      if (data) {
        toast.success("comment added");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <>
      <form className={style.container} onSubmit={AddComment}>
        <div className={style.newcomment}>
          <img className={style.img} src={currentUser?.img} />
          <div className={style.textarea}>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              className={style.input}
            ></textarea>
            <button type="submit" className={style.button}>
              Add comment
            </button>
          </div>
        </div>
      </form>
      <div className={style.comment}>
        {comments?.map((comment: any) => {
          return <Comment key={comment._id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default Comments;
