import data from "../../../../db.json";

const BlogHomePage = () => {
  return (
    <div className="tw-mt-[50px]">
      <div>
        {data["blogs"].map(() => {
          return <div></div>;
        })}
      </div>
    </div>
  );
};

export default BlogHomePage;
