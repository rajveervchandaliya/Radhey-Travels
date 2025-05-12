document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const carType = document.getElementById('carType').value;
    const carSelection = document.getElementById('carSelection').value;
    const pickupLocation = document.getElementById('pickupLocation').value;

    const message = `Hello, I would like to book a trip with the following details:
- Name: ${name}
- Contact Number: ${contactNumber}
- Car Type: ${carType}
- Car Selected: ${carSelection}
- Destination: ${pickupLocation}`;

    const ownerNumber = ''; // Replace with actual WhatsApp number

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
});

// Handle car filter buttons
const filterButtons = document.querySelectorAll('.filters button');
const carCards = document.querySelectorAll('.car-card');
const filterMessage = document.createElement('p');
filterMessage.style.textAlign = 'center';
filterMessage.style.marginBottom = '1rem';
filterMessage.style.fontSize = '1.2rem';
filterMessage.style.color = '#f9b542';
document.querySelector('.car-selection').prepend(filterMessage);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        filterMessage.textContent = filter === 'all' 
            ? 'Showing all cars' 
            : `Showing ${filter} cars`;

        carCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Get dropdown references
const carSelectionDropdown = document.getElementById('carSelection');
const carTypeDropdown = document.getElementById('carType');

// Initially hide the car selection dropdown
carSelectionDropdown.hidden = true;
carSelectionDropdown.removeAttribute('required');

// Function to update car selection dropdown
function updateCarSelectionDropdown(selectedType) {
    carSelectionDropdown.innerHTML = '<option value="" selected disabled>Select Car</option>';
    let hasMatchingCars = false;

    carCards.forEach(card => {
        const carType = card.getAttribute('data-type');
        const carName = card.querySelector('h3').textContent.split(': ')[1];

        if (selectedType.toLowerCase() === carType.toLowerCase()) {
            const option = document.createElement('option');
            option.value = carName;
            option.textContent = carName;
            carSelectionDropdown.appendChild(option);
            hasMatchingCars = true;
        }
    });

    if (hasMatchingCars) {
        carSelectionDropdown.hidden = false;
        carSelectionDropdown.setAttribute('required', 'true');
    } else {
        carSelectionDropdown.hidden = true;
        carSelectionDropdown.removeAttribute('required');
    }
}

// Listener for car type selection
carTypeDropdown.addEventListener('change', (event) => {
    const selectedType = event.target.value;
    updateCarSelectionDropdown(selectedType);
});

// Handle "Book Now" button clicks
const bookNowButtons = document.querySelectorAll('.book-now');
bookNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const carCard = event.target.closest('.car-card'); 
        const carType = Array.from(carCard.querySelectorAll('p'))
            .find(p => p.textContent.startsWith('Type:'))
            .textContent.split(': ')[1];
        const carName = carCard.querySelector('h3').textContent.split(': ')[1];

        const carTypeInput = document.getElementById('carType');
        carTypeInput.value = carType; 
        carTypeInput.dispatchEvent(new Event('change')); 

        setTimeout(() => {
            carSelectionDropdown.value = carName;
        }, 50); // slight delay to ensure options are rendered

        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });
});
