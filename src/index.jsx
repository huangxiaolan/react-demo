import React from 'react'
import ReactDom from 'react-dom'

import List from "./component/list.jsx";

ReactDom.render(
   <List names={["1","2"]}> </List>,
   document.getElementById("root")
)