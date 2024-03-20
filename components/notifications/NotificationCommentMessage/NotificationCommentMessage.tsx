import Link from "next/link";

interface INotificationCommentMessage {
  userImage  : React.ReactNode | "";
  commentText: string;
  username   : string;
  recipeImage: React.ReactNode | "";
  recipeId   : string;
  userId     : string;
  createdAt  : Date;
}

export const NotificationCommentMessage = ({
  userImage,
  commentText,
  username,
  recipeImage,
  recipeId,
  userId,
  createdAt,
}: INotificationCommentMessage) => {
  const currentDate = new Date();

  const millisecondsInDay = 1000 * 60 * 60 * 24; 

  const differenceInMilliseconds = currentDate.getTime() - createdAt.getTime();
  const daysDifference           = Math.floor(differenceInMilliseconds / millisecondsInDay);

  function formatDaysAgo(daysDifference: number) {
    if (daysDifference < 1) {
      return "Today";
    } else if (daysDifference === 1) {
      return "1 day ago";
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else if (daysDifference <= 30) {
      const weeks = Math.floor(daysDifference / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return "more than a year ago";
    }
  }

  return (
    <article className="w-full min-h-[64px] second-background flex items-center py-2 px-3 rounded-lg mb-2">
      <div className="flex justify-between w-full">
        <div className="flex justify-between">
          <Link href={`/profile/${userId}`}>{userImage}</Link>
          <div>
            <div>
              <Link href={`/profile/${userId}`}><b>{username}</b></Link>
              <span className="text-[#959595]"> comment your recipe:</span>
            </div>
            <p className="max-w-xs break-words overflow-hidden max-h-48 line-clamp-6">
              {commentText}
            </p>
            <div className="flex items-center">
              <span className="block w-1 h-1 bg-[#959595] rounded-full mr-1" />
              <p className="text-[#959595] text-sm">{formatDaysAgo(daysDifference)}</p>
            </div>
          </div>
        </div>
        <Link href={`/recipe/${recipeId}`}>{recipeImage}</Link>
      </div>
    </article>
  )
}