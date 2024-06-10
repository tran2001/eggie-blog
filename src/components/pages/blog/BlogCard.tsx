import { IBlog } from "@/interfaces/common.interfaces";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../../../db.json";

type Props = {
  blogItem: IBlog;
  cardClick: (e: string) => void;
};

const BlogCard = ({ blogItem, cardClick }: Props) => {
  const navigate = useNavigate();

  const handleClickBlog = () => {
    setTimeout(() => {
      navigate(`/${blogItem.id}`);
    }, 300);
  };

  useEffect(() => {
    const card_container = document.querySelector(
      `#card-container-${blogItem.id}`
    );
    const card = document.querySelector(`#card-${blogItem.id}`);
    if (card && card_container) {
      card.addEventListener("click", () => {
        cardClick(card.id.split("-")[1]);
        handleClickBlog();
        document
          .querySelector(`#card-${card.id.split("-")[1]}`)
          ?.classList.add("tw-h-full");
        document
          .querySelector(`#card-${card.id.split("-")[1]}`)
          ?.classList.remove("tw-h-[400px]");
        document
          .querySelector(`#card-container-${card.id.split("-")[1]}`)
          ?.classList.add("tw-h-screen");
      });
    }
  });

  return (
    <div className="tw-relative tw-w-full" id={"card-container-" + blogItem.id}>
      <div
        className="tw-w-full tw-h-[400px] tw-rounded-2xl tw-absolute tw-top-0 tw-right-0 tw-cursor-pointer tw-shadow-2xl tw-duration-300 tw-z-30"
        style={{
          background: `url('${blogItem.background}')`,
          backgroundSize: "cover",
        }}
        id={"card-" + blogItem.id}
      >
        <p
          className="tw-absolute tw-top-1/2 tw-translate-x-1/2 -tw-translate-y-1/2 tw-right-1/2 tw-text-[30px]"
          style={{
            color: blogItem.theme === "dark" ? "#FFF0F5" : "#392a48",
          }}
        >
          {blogItem.title}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
