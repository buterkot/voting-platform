import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
    { name: "Анна", text: "Очень удобный сервис для голосования!" },
    { name: "Иван", text: "Быстро и прозрачно, супер!" },
    { name: "Мария", text: "Легко создать и участвовать в голосованиях!" }
];

const Reviews = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="reviews-carousel">
            <Slider {...settings}>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>{review.text}</p>
                        <h4>- {review.name}</h4>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Reviews;
