I want to create a geography quiz app using the Next.js app router.

The homepage should have a heading that says "Choose a continent" and it should have a button for each continent. When a continent button is clicked, it should go to a new route for the selected continent (i.e. /north-america, /europe, /asia, etc.). This will be referred to as the "continent page".

On the continent page, it should display a random country name, based on the continent route the user is viewing and then a simple map should be rendered of the continent that only displays borders for each country of the continent and nothing more. There should be a score that displays "0/[NUMBER_OF_COUNTRIES_IN_THE_CONTINENT]" The user will click on the country that corresponds to the random country name and a toast will be displayed letting the user know if they clicked on the correct country or not. The user will only get one guess for each random country. If the user clicks on the correct country, the numerator in the score should be incremented by 1. If the user does not click the correct country, the numerator in the score should not be incremented. After a few seconds, the toast should automatically be dismissed and a new random country should be selected and displayed to the user and the process repeats as described previously. Once all of the countries in the continent have been exhausted, the map should fill in each country as either green or red, depending if the user got that country right or not and a button should be displayed for the user to start over.

## To-Do:
- [ ] Add meta tags

## Completed:
