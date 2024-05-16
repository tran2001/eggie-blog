import { useEffect, useState } from "react";
import data from "../../../db.json";
import { useParams } from "react-router-dom";

type Props = {};

const HomePageContent = (props: Props) => {
  const { id } = useParams();
  const [postId, setPostId] = useState<string | undefined>("");
  useEffect(() => {
    setPostId(id);
  }, [id]);
  return (
    <div>
      <div className="tw-w-full tw-flex tw-flex-col tw-mt-[50px]">
        <div className="tw-flex tw-flex-col tw-w-full">
          <div className="tw-flex tw-flex-col tw-items-center">
            <span className="tw-text-[30px]">
              {data.map((item) => {
                if (item.id === postId) {
                  return item.title;
                }
              })}
            </span>
            <span className="tw-text-[12px] content-text">
              {data.map((item) => {
                if (item.id === postId) {
                  return item.content;
                }
              })}
            </span>
          </div>
          <img
            className="tw-object-cover tw-rounded-[16px] tw-mt-5"
            src="https://c4.wallpaperflare.com/wallpaper/223/269/99/harley-davidson-bikes-hd-4k-wallpaper-preview.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContent;
