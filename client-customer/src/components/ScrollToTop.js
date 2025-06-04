import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle the scroll event
    const handleScroll = () => {
        if (window.scrollY > 300) { // Show the button after scrolling 300px
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Attach the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <button 
                className={`scroll-up ${isVisible ? 'visible' : 'hidden'}`} 
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    );
};

export default ScrollToTop;
