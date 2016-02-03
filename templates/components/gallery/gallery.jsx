import React from 'react';

class GalleryItem extends React.Component {
    render() {
        return (
            <a href="#lightbox" className="gallery-item" data-toggle="modal" data-slide-to={this.props.index}>
                <img src={this.props.url} />
            </a>
        )
    }
}

class CarouselIndicator extends React.Component {
    render() {
        return (
            <li data-target="#lightbox" data-slide-to={this.props.index}></li>
        )
    }
}

class CarouselInner extends React.Component {
    render() {
        var index = this.props.index;
        var className = (index == 0) ? 'item active' : 'item';

        return (
            <div className={className}>
                <img src={this.props.url} />
                <div className="carousel-caption">CAPTION</div>
            </div>
        )
    }
}

class GalleryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null,
            arrayTest: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29
            ]
        }
    }


    render() {
        return (
            <div>
                {this.state.test}
            </div>
        )
    }
}

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.loadImagesFromServer();
    }

    loadImagesFromServer() {
        $.ajax({
            url: this.props.url,
            data: {
                format: 'json'
            }
        })
            .done(function(data) {
                this.setState({data: data});
                // Hide loading icon
                $('.loading-icon').hide();
            }.bind(this))
            .fail(function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this));
    }

    render() {
        var testValue = this.state.data.map(image => {
            $('.carousel-indicators')
                .append(<CarouselIndicator index={image.id} />);

            $('.carousel-inner')
                .append(<CarouselInner url={"http://placehold.it/938x538"} index={image.id} />);

            return (
                <GalleryItem url={"http://placehold.it/119x119"} index={image.id} />
            )
        });

        return (
            <GalleryItemList url={'gallery.json'} key={1} />
        );
    }
}
