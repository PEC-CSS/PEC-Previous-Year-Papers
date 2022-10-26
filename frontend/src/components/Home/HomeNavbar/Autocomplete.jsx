
import React, { useState, useEffect } from "react";
import classes from './HomeNavbar.module.css';

const Autocomplete = ({ suggestions, onSelect, placeholder }) => {

    // The active selection's index
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    // The suggestions that match the user's input
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // Whether or not the suggestion list is shown
    const [showSuggestions, setShowSuggestions] = useState(false);
    // What the user has entered
    const [userInput, setUserInput] = useState("");
    const [matched, setMatched] = useState();
    const [callCallback, setCallCallback] = useState(false);

    useEffect(() => {
        if (callCallback) {
            onSelect && onSelect(activeSuggestion);
        }
        // eslint-disable-next-line
    }, [callCallback]);


    useEffect(() => {
        if (userInput === "") {

            setShowSuggestions(false);
            setMatched(undefined);
        }

    }, [userInput]);

    const onChangeFunctions = (e) => {

        // Filter our suggestions that don't contain the user's input
        setFilteredSuggestions(suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1
        ));

        setActiveSuggestion(0);
        setShowSuggestions(true)
        setUserInput(e.currentTarget.value);
    }


    const onKeyDownFunctions = e => {

        // User pressed the enter key
        if (e.keyCode === 13) {
            if (!matched) {
                setActiveSuggestion(0);
                setShowSuggestions(false);
                setUserInput(filteredSuggestions[activeSuggestion]);
                setMatched(filteredSuggestions[activeSuggestion]);
                setCallCallback(true);
            }

        } else if (e.keyCode === 38) {
            // User pressed the up arrow
            if (activeSuggestion === 0) {
                return;
            }

            setActiveSuggestion(activeSuggestion - 1);
        } else if (e.keyCode === 40) {
            // User pressed the down arrow
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestion(activeSuggestion + 1);
        } else if (e.keyCode === 27) {
            // Esc
            setShowSuggestions(false);
            setActiveSuggestion(0);
            setUserInput('');
            setMatched(undefined);
        }
    };


    const suggestionsListComponent = () => {

        if (filteredSuggestions.length && showSuggestions) {

            return <ul className={classes['suggestions']}>
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) {
                        className = "suggestion-active";
                    }

                    return (
                        <li className={classes[className]}
                            key={suggestion}
                            onClick={(e) => {
                                setActiveSuggestion(0);
                                setFilteredSuggestions([]);
                                setShowSuggestions(false);
                                setUserInput(e.currentTarget.innerText);
                            }}>
                            {suggestion}
                        </li>
                    );
                })}

            </ul >
        } else {
            if (userInput !== "" && userInput !== matched) {
                return <div className={classes['no-suggestions']}>
                    <em>No suggestions</em>
                </div>
            }
        }
    };


    return (
        <>
            <input
                autoFocus="on"
                type="text"
                onChange={e => onChangeFunctions(e)}
                onKeyUp={onKeyDownFunctions}
                value={userInput}
                placeholder={placeholder}
            />
            {suggestionsListComponent()}
        </>
    );

}

export default Autocomplete;
