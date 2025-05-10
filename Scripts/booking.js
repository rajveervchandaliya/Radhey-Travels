document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const tripType = document.getElementById('tripType').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const carType = document.getElementById('carType').value;
    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropLocation = document.getElementById('dropLocation').value;

    const message = `Hello, I would like to book a trip with the following details:
    - Name: ${name}
    - Trip Type: ${tripType}
    - Contact Number: ${contactNumber}
    - Car Type: ${carType}
    - Pickup Location: ${pickupLocation}
    - Drop Location: ${dropLocation}`;

    const ownerNumber = ''; // Replace with the actual WhatsApp number of the owner

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
});

// Handle car filter buttons
const filterButtons = document.querySelectorAll('.filters button');
const carCards = document.querySelectorAll('.car-card');
const filterMessage = document.createElement('p'); // Create a message element
filterMessage.style.textAlign = 'center';
filterMessage.style.marginBottom = '1rem';
filterMessage.style.fontSize = '1.2rem';
filterMessage.style.color = '#f9b542';
document.querySelector('.car-selection').prepend(filterMessage); // Add it to the car section

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update the filter message
        filterMessage.textContent = filter === 'all' 
            ? 'Showing all cars' 
            : `Showing ${filter} cars`;

        // Filter car cards
        carCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Populate the "Car Selection" dropdown with car names
const carSelectionDropdown = document.getElementById('carSelection');
carCards.forEach(card => {
    const carName = card.querySelector('h3').textContent.split(': ')[1];
    const option = document.createElement('option');
    option.value = carName;
    option.textContent = carName;
    carSelectionDropdown.appendChild(option);
});

// Handle "Book Now" button clicks
const bookNowButtons = document.querySelectorAll('.book-now');
bookNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const carCard = event.target.closest('.car-card'); 

        // Extract car type
        const carType = Array.from(carCard.querySelectorAll('p'))
            .find(p => p.textContent.startsWith('Type:'))
            .textContent.split(': ')[1];

        // Extract car name
        const carName = carCard.querySelector('h3').textContent.split(': ')[1];

        // Pre-fill the car type in the form
        const carTypeInput = document.getElementById('carType');
        carTypeInput.value = carType; 
        carTypeInput.dispatchEvent(new Event('change')); 

        // Pre-fill the car name in the "Car Selection" dropdown
        carSelectionDropdown.value = carName;

        // Scroll to the form section
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });
});