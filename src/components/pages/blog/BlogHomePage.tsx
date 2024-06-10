import { useRef, useState } from "react";
import data from "../../../../db.json";
import BlogCard from "./BlogCard";

const BlogHomePage = () => {
  const cardsContainer = useRef<HTMLDivElement>(null);
  const [cardList, setCardList] = useState<Array<any>>(data["blogs"]);
  const cardClick = (e: string) => {
    if (cardsContainer.current) {
      cardsContainer.current.classList.remove("tw-pt-[100px]");
      cardsContainer.current.classList.add("!tw-px-0");
    }
    data["blogs"].filter((item) => {
      if (item.id === e) {
        setCardList([item]);
      }
    });
  };
  return (
    <div
      className="tw-pt-[100px] tw-px-10 tw-duration-300 tw-flex tw-flex-col tw-gap-y-10 tw-pb-10"
      ref={cardsContainer}
    >
      {cardList.map((item) => {
        return (
          <div className="tw-h-[400px]" key={item.id}>
            <BlogCard blogItem={item} cardClick={cardClick} />
          </div>
        );
      })}
    </div>
  );
};

export default BlogHomePage;
