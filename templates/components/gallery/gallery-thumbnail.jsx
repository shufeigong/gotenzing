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

class GalleryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        var galleryNodes = this.state.data.map(image => {

            return (
                <GalleryItem url={'/templates/dist/img/gallery/thumbnails/' + image.thumbnail_image} key={image.id} index={image.id} href='#lightbox' />
            )
        });

        return (
            <div>
                {galleryNodes}
            </div>
        );
    }
}
