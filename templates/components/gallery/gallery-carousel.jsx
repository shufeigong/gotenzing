import React from 'react';

class CarouselIndicator extends React.Component {
    render() {
        var index = this.props.index;
        var className = (index == 0) ? 'active' : '';

        return (
            <li className={className} data-target={this.props.dataTarget} data-slide-to={index}></li>
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
                <div className="carousel-caption">{this.props.caption}</div>
            </div>
        )
    }
}

export default class Carousel extends React.Component {
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
                    var carouselNodes = this.state.data.map(image => {
                        $('.carousel-indicators.gallerypage')
                            .append(<CarouselIndicator dataTarget='#lightbox' index={image.id} />);

                        $('.carousel-indicators.gallerypage-mobile')
                            .append(<CarouselIndicator dataTarget='#lightbox-mobile-pop-gallery-page' index={image.id} />);


                        $('.carousel-inner.gallerypage, .carousel-inner.gallerypage-mobile')
                            .append(<CarouselInner url={'/templates/dist/img/gallery/thumbnails/' + image.original_image} index={image.id} caption={image.caption}/>);


                        return (
                            <GalleryItem url={'/templates/dist/img/gallery/thumbnails/' + image.thumbnail_image} key={image.id} index={image.id} href='#lightbox' />
                        )
                    });

                    return (
                        <div>
                            {carouselNodes}
                        </div>
                    );
                }
            }

            return (
                <GalleryItem url={'/templates/dist/img/gallery/thumbnails/' + image.thumbnail_image} key={image.id} index={image.id} href='#lightbox' />
            )
        });

        //return (
        //    <div class="modal fade and carousel slide" id="lightbox" tabindex="-1" role="dialog" aria-hidden="true">
        //        <a class="left carousel-control" href="#lightbox" role="button" data-slide="prev">
        //            <div class="left-arrow"></div>
        //        </a>
        //        <a class="right carousel-control" href="#lightbox" role="button" data-slide="next">
        //            <div class="right-arrow"></div>
        //        </a>
        //        <!-- Close -->
        //        <a class="close pop-close-icon" data-dismiss="modal" aria-label="Close"></a>
        //
        //        <div class="modal-dialog">
        //            <div class="modal-content">
        //                <div class="modal-body">
        //                    <ol id="carousel-indicators" class="carousel-indicators gallerypage"></ol>
        //
        //                    <div id="carousel-inner" class="carousel-inner gallerypage"></div>
        //                    <!-- /.carousel-inner -->
        //                </div>
        //                <!-- /.modal-body -->
        //            </div>
        //            <!-- /.modal-content -->
        //        </div>
        //        <!-- /.modal-dialog -->
        //    </div>
        //    <!-- /.modal -->
        //);
    }
}
