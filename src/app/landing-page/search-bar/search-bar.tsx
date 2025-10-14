import './search-bar.css'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

function SearchBar() {
    return (
        <div className='search-bar'>
            <Input type='text' placeholder='Find Pokémon' className='search-input' id='search-input' data-testid='search-input'></Input>
            <Button className='search-button' id='search-button' data-testid='search-button'>Search</Button>
        </div>
    )
}

export default SearchBar