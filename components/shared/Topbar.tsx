import Image from "next/image";

const Topbar = () => {
  return (
    <nav className="topbar">
      <button>
        <Image 
          src={"/assets/testuserimage.jpg"} 
          alt="User photo"
          width={32}
          className="object-cover w-8 h-8 rounded-full"
          height={32}
        />
      </button>
    </nav>
  )
};

export default Topbar;