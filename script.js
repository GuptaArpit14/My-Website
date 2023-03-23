const form = document.querySelector('form');
const recommendationsDiv = document.querySelector('#recommendations');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const age = parseInt(form.age.value);
  const gender = form.gender.value;
  const interests = form.interests.value;
  const hobbies = form.hobbies.value;
  const budget = parseInt(form.budget.value);

  // Send form data to backend API
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    body: JSON.stringify({
      age,
      gender,
      interests,
      hobbies,
      budget
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    recommendationsDiv.innerHTML = '<p>Sorry, an error occurred while fetching the recommendations.</p>';
    return;
  }

  const recommendations = await response.json();

  if (recommendations.length === 0) {
    recommendationsDiv.innerHTML = '<p>No recommendations found. Please adjust your criteria and try again.</p>';
    return;
  }

  const recommendationList = document.createElement('ul');

  for (const recommendation of recommendations) {
    const recommendationItem = document.createElement('li');
    const recommendationLink = document.createElement('a');
    recommendationLink.href = recommendation.link;
    recommendationLink.textContent = recommendation.name;
    recommendationLink.target = '_blank';
    recommendationItem.appendChild(recommendationLink);
    recommendationList.appendChild(recommendationItem);
  }

  recommendationsDiv.innerHTML = '';
  recommendationsDiv.appendChild(recommendationList);
});