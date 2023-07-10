import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks";
import { algoliaStyles } from "../../../constants/styles";

export function SearchBox({
	onQueryChange,
	...props
}: UseSearchBoxProps & { onQueryChange: (query: string) => void }) {
	const { query, refine } = useSearchBox(props);
	const [inputValue, setInputValue] = useState(query);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputRef = useRef(null);

  useEffect(() => {
    onQueryChange(inputValue)
  }, [inputValue])

	function setQuery(newQuery: string) {
		setInputValue(newQuery);
		refine(newQuery);
	}

	// Track when the InstantSearch query changes to synchronize it with
	// the React state.
	// We bypass the state update if the input is focused to avoid concurrent
	// updates when typing.
	useEffect(() => {
		if (query !== inputValue && !isInputFocused) {
			setInputValue(query);
		}
	}, [query]);

	return (
		<View style={algoliaStyles.container}>
			<TextInput
				ref={inputRef}
				style={algoliaStyles.input}
				value={inputValue}
				onChangeText={setQuery}
				clearButtonMode="while-editing"
				autoCapitalize="none"
				autoCorrect={false}
				spellCheck={false}
			/>
		</View>
	);
}
