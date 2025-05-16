document.addEventListener('DOMContentLoaded', function() {

    const eventId = window.location.pathname.split("/").at(-1);

    const xhr = new XMLHttpRequest();
    const apiUrl = `/api/v2/events/${eventId}`;
    
    xhr.open('GET', apiUrl);
    
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                const eventData = response.event;
                
                const pElement = document.querySelector('p.text-info');
                if (pElement && eventData) {
                    let ptext = [];
                    eventData.forEach(element => {
                        ptext.push(element["event_description"]);
                    });
                    pElement.innerHTML = ptext.join("<br>");
                } else if (!pElement) {
                    console.error('Element p.text-info not found');
                }
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('Request failed');
    };
    
    xhr.send();
});