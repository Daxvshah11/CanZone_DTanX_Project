
var reviews = [];

var form = document.querySelector('#reviews form');
var tableBody = document.querySelector('#reviewTableBody');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.querySelector('#username').value;
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var review = document.querySelector('#review').value;

    var newReview = {
        name: name,
        rating: rating,
        review: review
    };

    reviews.push(newReview);

    // reset the form fields
    form.reset();

    // clear the existing table rows
    tableBody.innerHTML = '';

    // populate the table with the updated reviews array
    reviews.forEach(function (review) {
        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        var ratingCell = document.createElement('td');
        var reviewCell = document.createElement('td');

        nameCell.textContent = review.name;
        ratingCell.textContent = review.rating;
        reviewCell.textContent = review.review;

        row.appendChild(nameCell);
        row.appendChild(ratingCell);
        row.appendChild(reviewCell);

        tableBody.appendChild(row);
    });
});

// Set the date we're counting down to
var countDownDate = new Date("June 30, 2023 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get the current date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Calculate days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown in the element with id="countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is finished, display text instead
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);