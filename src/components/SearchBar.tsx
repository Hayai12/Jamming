import React, {useState} from "react"

interface SearchBarProps{
    onSearch: (query:string) => void
}

const SearchBar:React.FC<SearchBarProps> = ({onSearch}) => {
    const [searchquery, setSearchquery] = useState('')

    const handleSearch = () => {
        onSearch(searchquery)
    }
    return(
        <div>
            <input
                value={searchquery}
                onChange={(e)=> setSearchquery(e.target.value)}
            />
            <button onClick={handleSearch}>
                Buscar
            </button>
        </div>
    )
}

export default SearchBar