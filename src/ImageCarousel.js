import React, { useState, useEffect } from "react";
import "./Style.css";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "./1.png",
        "./2.png",
        "./3.png",
    ];

    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Cambia immagine ogni 5 secondi

        return () => clearInterval(autoSlide); // Pulizia dell'intervallo quando il componente viene smontato
    }, [images.length]);

    // Funzione per cambiare immagine quando si clicca sui punti
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel-container">
            <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                <div className="carousel-slides">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Immagine ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => handleDotClick(index)} // Aggiungi il clic sui punti
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;



