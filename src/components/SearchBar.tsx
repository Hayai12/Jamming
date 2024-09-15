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
                className="bg-gray-800 text-white px-4 py-2 w-full max-w-md rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchquery}
                onChange={(e)=> setSearchquery(e.target.value)}
            />
            <button 
             className=" text-white text-stroke px-6 py-2 rounded-r-full transition-all"
            onClick={handleSearch}>
                Buscar
            </button>
        </div>
    )
}

export default SearchBar