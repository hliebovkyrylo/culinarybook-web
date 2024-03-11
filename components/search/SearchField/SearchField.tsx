interface ISearchField {
  placeholder: string;
  leftIcon   : React.ReactNode;
}

export const SearchField = ({
  placeholder,
  leftIcon,
}: ISearchField) => {
  return (
    <div className="relative">
      {leftIcon}
      <input type="text" className="search-field" placeholder={placeholder} />
    </div>
  )
}