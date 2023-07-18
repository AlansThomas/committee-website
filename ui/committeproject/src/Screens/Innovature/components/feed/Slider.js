import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./dd.css";

function Slider(prop) {
  return <ImageGallery items={prop.images} autoPlay  showThumbnails={true}/>;
}

export default Slider;
