import Link from "next/link";

interface IContentHeader {
  title     : string;
  linkText ?: string;
  linkHref ?: string;
  className?: string;
};

export const ContentHeader = ({
  title,
  linkText,
  linkHref,
  className,
}: IContentHeader) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className='second-head-text'>{title}</h2>
      <Link className="link-text" href={linkHref || ""}>{linkText}</Link>
    </div>
  )
};