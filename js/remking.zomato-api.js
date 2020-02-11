function onload(param) {
    console.log("iniciando zomato")
    Zomato.init({
        key: "81d104908506622bb429b283a91877fe"
    });
    Zomato.geocode({
        latitude: 32.715736,
        longitude: -117.161087
    }, function(s) {
        //console.log(s.popularity.nearby_res)
        //console.log("---GeocitiesSanDiego---")
        ListRestaurant = s.popularity.nearby_res;
        $("#restaurante_data").append("<h1 class='text-center'>Select your favorite San Diego restaurant</h1>")

        $.each(ListRestaurant, function(index, val) {
            /* iterate through array or object */
            //console.log(val)
            getRestaurantById(val);
        });
    });
}

function getRestaurantById(idRestaurant) {
    console.log("iniciando zomato / finding restaurantes - loading...")
    Zomato.init({
        key: "81d104908506622bb429b283a91877fe"
    });
    Zomato.restaurant(idRestaurant, function(restaurant) {
        let pictureThumbRest = restaurant.thumb;
        let nameRest = restaurant.name;
        let localityRest = restaurant.location.locality;
        let addressRest = restaurant.location.address;
        let cuisine = restaurant.cuisines;
        let averageCostForTwo = restaurant.average_cost_for_two + restaurant.currency;
        let textAverageCostForTwo = `costs ${averageCostForTwo} for two`;
        let ratingRest = restaurant.user_rating.aggregate_rating;
        let totalVoteRest = restaurant.user_rating.votes;
        let establishmentRest = restaurant.establishment[0];
        let executeScriptTemplate = TemplateCardInfoRestaurants(pictureThumbRest, nameRest, localityRest, establishmentRest, totalVoteRest, ratingRest);
        $("#restaurante_data").append(executeScriptTemplate);

        //do your logic for restaurant's data.
        console.log(restaurant)
    }, function(error) {
        //on error here is the logic for on error 
        console.log(error)
    })
}

function TemplateCardInfoRestaurants(pictureThumbRest, nameRest, localityRest, establishmentRest, totalVoteRest, ratingRest) {
    return `
    <div class="well restaurant">
        <div class="box-image-restaurante">
            <img class="img-responsive" src="${pictureThumbRest}" alt="${nameRest}" />
        </div>
        <div class="box-info-restaurant">
            <div>${nameRest}</div>
            <div>${localityRest} - ${establishmentRest}</div>
        </div>
        <div class="box-score-point-restaurante">
            <div class="pull-right badge">${ratingRest} /5</div>
            <div class="pull-right">${totalVoteRest} votes</div>
        </div>
    </div>

    `;

}