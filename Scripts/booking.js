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




const filterButtons = document.querySelectorAll('.filters button');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        carCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});