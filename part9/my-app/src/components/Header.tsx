import React from "react";
import ReactDOM from "react-dom";


interface HeaderProps {
    name: string;
  }

const Header: React.FC<HeaderProps> = (props) =>{
    return <h1>{props.name}</h1>
}

export default Header;