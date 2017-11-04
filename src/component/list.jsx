
import React from 'react'
//import ReactDom from 'react-dom'

class Item extends  React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <li>{this.props.name}</li>
        )
    }
}

class List extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const lists= this.props.names.map(item=>{

            return <Item name={item}></Item>;
        });

        return (
            <ul>
                {lists}
            </ul>
        )
    }
}

export default List<!DOCTYPE html>
<html lang="en">
    <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">