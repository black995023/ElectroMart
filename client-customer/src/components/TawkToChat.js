import React, { useEffect } from 'react';

const TawkToChat = () => {
    useEffect(() => {
        // Tawk.to Script
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/65671e3f26949f791135e1f2/1i1aop0ri';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []); // Empty dependency array ensures this runs only once

    return null; // This component doesn't render anything visible
};

export default TawkToChat;
