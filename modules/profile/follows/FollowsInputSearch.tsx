import { Input }               from "@/components/ui"
import { useTranslation }      from "next-i18next";
import { useRouter }           from "next/router";
import { useEffect, useState } from "react";

interface IFollowsInputSearch {
  userId  : string;
  pageType: 'followers' | 'followings',
}

export const FollowsInputSearch = ({
  userId,
  pageType
}: IFollowsInputSearch) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search) {
      router.push(`/profile/${userId}/${pageType}?username=${search}`);
    } else {
      router.push(`/profile/${userId}/${pageType}`)
    }
  }, [search])
  return (
    <Input color="default" onChange={e => setSearch(e.target.value)} placeholder={t('input-username-placeholder')} className="border-[1px] border-[#383838]" />
  )
}