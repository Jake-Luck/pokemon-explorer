import './search-bar.scss'

function SearchBar() {
    return (
        <div className='search-bar'>
            <input type='text' placeholder='Find Pokémon' className='search-input' id='search-input' data-testid='search-input'></input>
            <button type='submit' className='search-button' id='search-button' data-testid='search-button'>Search</button>
        </div>
    )
}

export default SearchBar