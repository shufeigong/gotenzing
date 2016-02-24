import React from 'react';

export default class Branding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="branding-page" className="carousel slide subpage" data-ride="carousel">
                <ol className="carousel-indicators subpageindi branding-page">
                    <li data-target="#branding-page" data-slide-to="0" className="active"></li>
                    <li data-target="#branding-page" data-slide-to="1"></li>
                    <li data-target="#branding-page" data-slide-to="2"></li>
                    <li data-target="#branding-page" data-slide-to="3"></li>
                    <li data-target="#branding-page" data-slide-to="4"></li>
                </ol>

                <div className="carousel-inner branding-page" role="listbox">
                    <div className="item active">
                        <div data-target="#lightbox-banding-page" data-toggle="modal" data-slide-to="0"
                             className="slide-container">
                            <img src="/templates/dist/img/gallery/Libro_2012_Website_1407x875.jpg"/>
                        </div>
                    </div>
                    <div className="item">
                        <div data-target="#lightbox-banding-page" data-toggle="modal" data-slide-to="1"
                             className="slide-container">
                            <img src="/templates/dist/img/gallery/Libro_2013_BeYou_Ads_1407x875.jpg"/>
                        </div>
                    </div>
                    <div className="item">
                        <div data-target="#lightbox-banding-page" data-toggle="modal" data-slide-to="2"
                             className="slide-container">
                            <img src="/templates/dist/img/gallery/Libro_2015_TV_1407x875.jpg"/>
                        </div>
                    </div>
                    <div className="item">
                        <div data-target="#lightbox-banding-page" data-toggle="modal" data-slide-to="3"
                             className="slide-container">
                            <img src="/templates/dist/img/gallery/RCB_2010_DE_IronSpke_Cans_1407x875.jpg"/>
                        </div>
                    </div>
                    <div className="item">
                        <div data-target="#lightbox-banding-page" data-toggle="modal" data-slide-to="4"
                             className="slide-container">
                            <img src="/templates/dist/img/gallery/RCB_2010_DE_Poster_1407x875.jpg"/>
                        </div>
                    </div>
                </div>

                <a className="left carousel-control" href="#branding-page" role="button" data-slide="prev">
                    <div className="left-arrow"></div>
                </a>
                <a className="right carousel-control" href="#branding-page" role="button" data-slide="next">
                    <div className="right-arrow"></div>
                </a>
            </div>
        );
    }
}
