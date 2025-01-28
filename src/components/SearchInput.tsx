import '../styles/SearchInput.css'
import { useState } from 'react';

interface SearchInputProps {
	setUserText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({ setUserText }: SearchInputProps) {
	const [currentUserText, setCurrentUserText] = useState<string>('');

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			setUserText(currentUserText)
		}
	}

	return (
		<input
			className='search-input'
			type="text"
			placeholder='username'
			onChange={(e) => setCurrentUserText(e.target.value)}
			onKeyDown={handleKeyDown}
		/>
	)
}