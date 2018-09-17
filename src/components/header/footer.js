import React from 'react';
import ReactDOM from 'react-dom';
import homeic from '../../view/images/home-page.png';
import searchic from '../../view/images/search.png';
import addic from '../../view/images/add.png';
import bellic from '../../view/images/bell.png';
import profileic from '../../view/images/user-.png';

export default class Footer extends React.Component{
render(){
return(
<div className={this.props.toggleArrow ? "footer" : "footer arrowOpacity"}>
<div className="footer__icon__homeic">
<img src={homeic}/>
</div>
<div className="footer__icon__searchic">
<img src={searchic}/>
</div>
<div className="footer__icon__addic">
<img src={addic}/>
</div>
<div className="footer__icon__bellic">
<img src={bellic}/>
</div>
<div className="footer__icon__profileic">
<img src={profileic}/>
</div>

</div>
);
}
}