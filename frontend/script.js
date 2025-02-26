let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
    fetchLocations();
}

async function fetchLocations() {
    try {
        const response = await fetch("http://localhost:3000/api/locations");
        const locations = await response.json();
        const locationList = document.getElementById("locationList");
        locationList.innerHTML = "";

        locations.forEach(location => {
            const { latitude, longitude, timestamp } = location;

            // Add marker on Google Maps
            new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map
            });

            // Add to list with Google Maps link
            const listItem = document.createElement("li");
            listItem.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}, Time: ${timestamp} 
                <a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">View on Map</a>`;
            locationList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
}
