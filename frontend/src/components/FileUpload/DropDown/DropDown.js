import React from "react";
import {
    DropdownWrapper,
    StyledSelect,
    StyledOption,
    StyledLabel,
    StyledButton,
} from "./DropDownStyles.js";

export function Dropdown(props) {
    return (
        <DropdownWrapper action={props.action}>
            <StyledLabel >
                {props.formLabel}
            </StyledLabel>
            <StyledSelect>
                {props.children}
            </StyledSelect>
        </DropdownWrapper>
    );
}

export function Option(props) {
    return (
        <StyledOption selected={props.selected}>
            {props.value}
        </StyledOption>
    );
}