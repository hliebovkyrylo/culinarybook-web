import { NotificationCommentMessage, NotificationFollowMessage, NotificationLikeMessage, NotificationsLayout } from "@/components/notifications";
import Image from "next/image";

const Notifications = () => {
  return (
    <NotificationsLayout
      title="Notifications"
    >
      {[...Array(2)].map(() => (
        <NotificationCommentMessage 
          key={'23331'}
          username={"jhondoe"}
          userImage={<Image src={'/assets/testuserimage.jpg'} className="object-cover rounded-full w-12 h-12 mr-3" alt="User image" width={48} height={48} />}
          commentText="Very nice recipe!"
          recipeId="23tgedrr4tg232gyh3h4"
          recipeImage={<Image src={'/assets/burger.jpg'} className="object-cover rounded-md w-12 h-12" alt="Recipe image" width={48} height={48} />}
          userId="dfgsdfgr5533453t633g"
          createdAt={new Date("2024-02-18T13:21:32+00:00")}
        />
      ))}
      {[...Array(1)].map(() => (
        <NotificationFollowMessage 
          key={'sdfgs'}
          username="jhondoe"
          userImage={<Image src={'/assets/testuserimage.jpg'} className="object-cover rounded-full w-12 h-12 mr-3" alt="User image" width={48} height={48} />}
          userId="3489hg33934hujgg"
          createdAt={new Date("2024-02-18T14:21:32+00:00")}
        />
      ))}
      {[...Array(3)].map(() => (
        <NotificationLikeMessage 
          key={'sdfsf3'}
          username="jhondoe"
          userImage={<Image src={'/assets/testuserimage.jpg'} className="object-cover rounded-full w-12 h-12 mr-3" alt="User image" width={48} height={48} />}
          recipeId="23tgedrr4tg232gyh3h4"
          recipeImage={<Image src={'/assets/burger.jpg'} className="object-cover rounded-md w-12 h-12" alt="Recipe image" width={48} height={48} />}
          userId="dfgsdfgr5533453t633g"
          createdAt={new Date("2024-02-18T13:21:32+00:00")}
        />
      ))}
    </NotificationsLayout>
  )
}

export default Notifications;