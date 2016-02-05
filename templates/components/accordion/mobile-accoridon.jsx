import React from 'react';

class AccordionBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var accordionClassName = '';
        if(this.props.data.id == 1) {
            accordionClassName = 'panel-collapse collapse in';
        } else {
            accordionClassName = 'panel-collapse collapse';
        }

        var id = 'mobile-collapse' + this.props.data.id;
        return (
            <div id={id} className={accordionClassName}>
                <div className="panel-body">
                    <p>
                        <span className="bold">Best Day Imaginable:</span> {this.props.data.best_day_imaginable}
                    </p>
                    <p>
                        <span className="bold">Best Work Day:</span> {this.props.data.best_work_day}

                    </p>
                    <p>
                        <span className="bold">Best Work:</span> {this.props.data.best_work}
                    </p>
                </div>
            </div>
        );
    }
}

class AccordionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var accordionClassName = '';
        if(this.props.data.id == 1) {
            accordionClassName = 'accordion-sign accordion-open';
        } else {
            accordionClassName = 'accordion-sign accordion-close';
        }

        var id = 'mobile-collapse' + this.props.data.id;
        var href = '#mobile-collapse' + this.props.data.id;

        return (
            <div className="panel-heading">
                <h4 className="panel-title">
                    <span className={accordionClassName}></span>
                    <a data-toggle="collapse" data-parent="#mobile-accordion" href={href} className="name">
                        {this.props.data.name}
                    </a>
                </h4>
                
              <div className="panel-title title-info"> 
                <div className="additional-info"> <span className="obl">{this.props.data.title}</span>  <span className="obl">{this.props.data.what_you_do}</span>  <span className="bold-obl">{this.props.data.spirtual_role}</span>
                </div>
               </div>
            </div>
        );
    }
}

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <AccordionHeader data={this.props.data}/>
                <AccordionBody data={this.props.data}/>
            </div>
        );
    }
}

export default class Accordion_mobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var AccordionNodes = this.props.data.map(function(accordion) {
           return (
               <AccordionItem data={accordion} key={accordion.id}/>
           )
        });

        return (
            <div className="panel-group" id="mobile-accordion">
                {AccordionNodes}
            </div>
        );
    }
}