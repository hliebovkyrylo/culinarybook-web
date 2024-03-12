"use client"

import CreatorCard   from "@/components/cards/CreatorCard";
import { 
  SearchButtons, 
  SearchField, 
  SearchLayout 
}                    from "@/components/search";
import { GlassIcon } from "@/icons";

const Search = () => {
  return (
    <SearchLayout title="Search">
      <div className="my-6">
        <SearchField
          placeholder="Enter username..."
          leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />}
        />
        <SearchButtons className="mt-3" />
      </div>
      <div className="grid grid-cols-5 max-lg:grid-cols-3 max-[746px]:grid-cols-1 max-[746px]:justify-items-center">
        {[...Array(20)].map(() => (
          <CreatorCard
            key={'ssgs' + 1}
            id="fgsdfgheth53"
            userImage="/assets/testuserimage.jpg"
            name="Jhon Doe"
            followers={100}
            recipes={17}
            className="mb-2 !w-[186px] max-lg:!w-[98%]"
          />
        ))}
      </div>
    </SearchLayout>
  )
}

export default Search;