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

        var id = 'collapse' + this.props.data.id;
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

        var id = 'collapse' + this.props.data.id;
        var href = '#collapse' + this.props.data.id;

        return (
            <div className="panel-heading">
                <h4 className="panel-title hidden-xs">
                    <a data-toggle="collapse" data-parent="#accordion" href={href} className="name">
                        <span className={accordionClassName}></span>
                        {this.props.data.name}
                    </a>
                    <span className="additional-info pull-right">| <span className="obl">{this.props.data.title}</span> | <span className="obl">{this.props.data.what_you_do}</span> | <span className="bold-obl">{this.props.data.spirtual_role}</span>
                    </span>
                </h4>

                <h4 className="panel-title visible-xs">
                    <a data-toggle="collapse" data-parent="#mobile-accordion" href={href} className="name">
                        <span className={accordionClassName}></span>
                        {this.props.data.name}
                    </a>
                </h4>

                <div className="panel-title title-info visible-xs">
                    <div className="additional-info">
                        <span className="obl">{this.props.data.title}, </span><span className="obl">{this.props.data.what_you_do}, </span><br />
                        <span className="bold-obl">{this.props.data.spirtual_role}</span>
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

export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.loadBiosFromServer();
    }

    loadBiosFromServer() {
        $.getJSON(this.props.url, function(data) {
            // Hide loading icon
            $('.loading-icon').hide();

            this.setState({data: data});
        }.bind(this))
            .fail(function(data) {
                var text = data.responseText;
                console.error(text);
            }.bind(this));
    }

    render() {
        var AccordionNodes = this.state.data.map(function(accordion) {
           return (
               <AccordionItem data={accordion} key={accordion.id}/>
           )
        });

        return (
            <div className="panel-group" id="accordion">
                {AccordionNodes}
            </div>
        );
    }
}
