//document.addEventListener("DOMContentLoaded", () => {
    // Google Maps API Integration
  //  function initMap() {
    //    const nairobi = { lat: -1.286389, lng: 36.817223 };
      //  const map = new google.maps.Map(document.getElementById("map-container"), {
        //    zoom: 12,
          //  center: nairobi,
       // });
    //}
    
    // Fetch Recycling Centers Data from db.json
    //fetch("http://localhost:3000/recyclingCenters")
      //  .then(response => response.json())
        //.then(data => displayRecyclingCenters(data))
        //.catch(error => console.error("Error fetching data:", error));

//    function displayRecyclingCenters(centers) {
  //      const list = document.getElementById("centers-list");
   //     list.innerHTML = "";
   //     centers.forEach(center => {
  //          const li = document.createElement("li");
    //        li.textContent = `${center.name} - ${center.location}`;
   //         list.appendChild(li);
   //     });
  //  }

    // Search Functionality
  //  document.getElementById("search").addEventListener("input", (event) => {
    //    const query = event.target.value.toLowerCase();
      //  fetch("http://localhost:3000/recyclingCenters")
        //    .then(response => response.json())
          //  .then(data => {
          //      const filtered = data.filter(center => center.name.toLowerCase().includes(query));
          //      displayRecyclingCenters(filtered);
          //  });
   // });

    // Waste Pickup Request Event
   // document.getElementById("schedule-btn").addEventListener("click", () => {
   //     alert("Your waste pickup request has been scheduled!");
   // });

    // OpenWeather API Integration
   // fetch("https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=YOUR_API_KEY&units=metric")
     //   .then(response => response.json())
       // .then(data => {
       //     document.getElementById("weather-info").textContent = `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
       // })
       // .catch(error => console.error("Error fetching weather data:", error));

    // Initialize Map after loading script
  //  window.initMap = initMap;
//});
 // SmartWaste - Nairobi

// Fetch and display recycling centers
function fetchCenters() {
    fetch('http://localhost:3000/recyclingCenters')
      .then(response => response.json())
      .then(data => {
        const centerList = document.getElementById('center-list');
        centerList.innerHTML = '';
        data.forEach(center => {
          const centerItem = document.createElement('li');
          centerItem.innerHTML = `${center.name} - ${center.location} <button onclick="deleteCenter(${center.id})">Delete</button>`;
          centerList.appendChild(centerItem);
        });
      })
      .catch(error => console.error('Error fetching centers:', error));
  }
  
  // Add a new recycling center
  function addCenter() {
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    
    fetch('http://localhost:3000/recyclingCenters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, location })
    })
      .then(response => response.json())
      .then(() => {
        fetchCenters();
      })
      .catch(error => console.error('Error adding center:', error));
  }
  
  // Update a recycling center
  function updateCenter(id, newContact) {
    fetch(`http://localhost:3000/recyclingCenters/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contact: newContact })
    })
      .then(response => response.json())
      .then(() => fetchCenters())
      .catch(error => console.error('Error updating center:', error));
  }
  
  // Delete a recycling center
  function deleteCenter(id) {
    fetch(`http://localhost:3000/recyclingCenters/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchCenters())
      .catch(error => console.error('Error deleting center:', error));
  }
  
  // Initial fetch when page loads
  document.addEventListener('DOMContentLoaded', fetchCenters);
  
