import React from 'react';

const CropImage = ({productImg}) => {

    //when no one passes product then use default image
    // const imageURL = productImg ? `../../assets/crops/${productImg}.jpg` : `https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg`

    // const imageURL = "../../assets/crops/Rice.jpg"

    const imageURL = React.lazy(() => import('../../assets/crops/Rice.jpg'));

    // loadImage = imageName => {
    //     import(`./assets/${imageName}.jpg`).then(image => {
    //         this.setState({
    //             image
    //         });
    //         });
    //     };
    //     render() {
    //         const { image } = this.state;
    //         return (
    //             <Fragment>
    //                 {image && <img src={image} alt="" />}
    //             </Fragment>
    //     );
    // }


    console.log(imageURL);
    return (
        <div className="rounded border border-success p-2 mb-2">

          <img
          className="rounded"
          src={imageURL}
          alt="nothing"
          />
        </div>
    )
}

export default CropImage;
