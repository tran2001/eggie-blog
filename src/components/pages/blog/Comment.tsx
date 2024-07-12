import { IComment } from "@/interfaces/common.interfaces";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import viLocale from "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale(viLocale);

type Props = {
  comment: IComment;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className="tw-flex tw-flex-col tw-p-3 tw-border tw-mb-2 tw-rounded-xl">
      <span className="title-text tw-text-[14px]">
        {comment.user.fullName}
        <span className="content-text tw-break-words tw-text-[10px] tw-ml-1">
          {dayjs(comment.time).fromNow(true)}
        </span>
      </span>
      <span className="content-text tw-break-words tw-text-[12px]">
        {comment.content}
      </span>
    </div>
  );
};

export default Comment;