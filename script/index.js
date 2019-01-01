
$(function () {
    function ClearFields() {

        document.getElementById("cuisine-input").value = "";
    }  
    var i = 0; //used for index of each textque.
    var inputs = [] //used to stores user inputs.
    var count = 0  //used to determine when the textque is completed
    var url = 'https://api.edamam.com/search?q=';
    var apiId = 'be5d1e96';
    var apiKey = '0c29a5e9ce187319b53367b2cc67256f';
    var k = $('.card').length; //helps loop determine length of our accordion list
    var j = Math.floor(Math.random() * 100000)// used to provide unique id's to each of the cards of the accordion

    // var cal_min = '0'; // Fixed value for minimum calories
    // var cal_max = '500'; // Needs to be changed based on user input

    $('#enter-button').on("click", function () {
        $('#enter-button').prop("disabled", true);
        inputs.push($('#cuisine-input').val())
        ClearFields()
        count++;
        var recipeque = ["Great, Where are you currently?", "What are you in the mood for?", "These are your choices!",'Welcome to the Sea! What can I assist you with?']
        var restaurantque = ["Great, Where are you currently?", 'Welcome to the Sea! What can I assist you with?']
        var invalidque = ["Please input a valid response.", 'Welcome to the Sea! What can I assist you with?']
        if(inputs[0] == "recipes"){
            var srcText = recipeque[i];
        }else if (inputs[0] == "restaurants"){
            var srcText = restaurantque[i]
        }else{
            var srcText = invalidque[i]
        }
        var l = 0;//used to iterate through each letter of a string
        var result = srcText[l];
        setInterval(function () {
            if (l== srcText.length - 1) {
                clearInterval(this);
                return;
            };
            l++;
            result += srcText[l]
            $("#target").html(result);
            if (srcText.length == result.length) {
                $('#enter-button').prop("disabled", false);
            }
            
        },
            100); // the period between every character and next one, in milliseonds.
        i++
        
        //resets user inputs
        if (i > recipeque.length - 1 && inputs[0] == "recipes") {
            console.log(inputs)
            i = 0
            inputs = []
            console.log(inputs)
            count = 0
        } else if (i > restaurantque.length - 1 && inputs[0] == "restaurants"){
            console.log(inputs)
            i = 0
            inputs = []
            console.log(inputs)
            count = 0
        } else if (i > invalidque.length - 1 && (inputs[0] != "restaurants" && inputs[0] != "recipes" )){
            console.log(inputs)
            i = 0
            inputs = []
            console.log(inputs)
            count = 0
        } 
        if (count == 3 && inputs[0] == "recipes"){
            var $recipeInputContainer = $('<div>',{
                'id': 'recipeInputContainer'
            })
            var $recipeInput = $('<input>',{
                'type': "text",
                'style': 'border: brown 1px solid; border-radius:3px',
                'id': 'moreRecipeInput'
            })
            var $recipeinputButton = $('<button>',{
                'id':'recipe-button',
                'style':'border: black 1px solid',
                'text': 'More'
            })
            var $randomButton = $('<button>',{
                'id':'random-button',
                'style':'border: black 1px solid',
                'text': `I Can't decide!`
            })
            $('#accordion').append($recipeInputContainer)
            $('#recipeInputContainer').append($recipeInput)
            $('#recipeInputContainer').append($recipeinputButton)
            $('#recipe-button').on("click", function () {
                k = $('.card').length
                var type = $('#moreRecipeInput').val()
                $.get(url + type + '&app_id=' + apiId + '&app_key=' + apiKey + '&from=1&to=100') //'&calories=' + cal_min + '-' + cal_max + '&health=alcohol-free')
                .done((result) => {
                    console.log(result);
                    while (k < 10) {
                        k++
                        j++
                        let ran = Math.floor(Math.random() * 99) // randomly take one recipe
                        let $card = $('<div>', {
                            'class': "card",
                            'style': "width:100%",
                            'id': 'card' + j.toString()
                        })
                        let $cardHeader = $('<div>', {
                            'class': 'card-header',
                            'style': 'width:100%; padding: 0px; display: inline',
                            'id': 'heading' + j.toString()
                        })
                        let $heading = $('<h5>', {
                            'class': 'mb-0',
                            'id': 'h' + j.toString()
                        })
                        let $collapse = $('<div>', {
                            // 'class': 'btn btn-link',
                            'style': 'width: 80%; text-align: center; display: inline-block',
                            'data-toggle': 'collapse',
                            'data-target': '#collapse' + j.toString(),
                            'aria-expanded': 'true',
                            'aria-controls': 'collapse' + j.toString(),
                            'text': result.hits[ran].recipe.label
                        })
                        let $buttonx = $('<button>', {
                            'class': 'x',
                            'text': 'x'
                        })
                        let $box2 = $('<div>', {
                            'id': 'collapse' + j.toString(),
                            'class': 'collapse', // show
                            'aria-labelledby': 'heading' + j.toString(),
                            'data-parent': '#accordion'
                        })
                        let $cardbody = $('<div>', {
                            'class': 'card-body',
                            'text': 'hello world'
                        })
                        recipeList.push('card' + j.toString())
                        $('#accordion').append($card)
                        $(`#card${j}`).append($cardHeader)
                        $(`#heading${j}`).append($heading)
                        $(`#h${j}`).append($collapse)
                        $(`#h${j}`).append($buttonx)
                        $(`#card${j}`).append($box2)
                        $(`#collapse${j}`).append($cardbody)
                        $(".x").on('click', function () {
                            $(this).parents('.card').get(0).remove()
                        });
                    }
                })
            })
            var type = inputs[2] 
            $.get(url + type + '&app_id=' + apiId + '&app_key=' + apiKey + '&from=1&to=100') //'&calories=' + cal_min + '-' + cal_max + '&health=alcohol-free')
            .done((result) => {
                console.log(result);
                while (k < 10) {
                    k++
                    j++
                    let ran = Math.floor(Math.random() * 99) // randomly take one recipe
                    // let $recipe = $('<div>', {
                    //   'text': result.hits[ran].recipe.label
                    // })
                    // let $recipeimg = $('<img>', {
                    //   'src': result.hits[ran].recipe.image
                    // })
                    // $('#information-box').append($recipe)
                    // $('#information-box').append($recipeimg)
                    let $card = $('<div>', {
                        'class': "card",
                        'style': "width:100%",
                        'id': 'card' + j.toString()
                    })
                    let $cardHeader = $('<div>', {
                        'class': 'card-header',
                        'style': 'width:100%; padding: 0px; display: inline',
                        'id': 'heading' + j.toString()
                    })
                    let $heading = $('<h5>', {
                        'class': 'mb-0',
                        'id': 'h' + j.toString()
                    })
                    let $collapse = $('<div>', {
                        // 'class': 'btn btn-link',
                        'style': 'width: 80%; text-align: center; display: inline-block',
                        'data-toggle': 'collapse',
                        'data-target': '#collapse' + j.toString(),
                        'aria-expanded': 'true',
                        'aria-controls': 'collapse' + j.toString(),
                        'text': result.hits[ran].recipe.label
                    })
                    let $buttonx = $('<button>', {
                        'class': 'x',
                        'text': 'x'
                    })
                    let $box2 = $('<div>', {
                        'id': 'collapse' + j.toString(),
                        'class': 'collapse', // show
                        'aria-labelledby': 'heading' + j.toString(),
                        'data-parent': '#accordion'
                    })
                    let $cardbody = $('<div>', {
                        'class': 'card-body',
                        'text': 'hello world'
                    })
                    recipeList.push(result.hits[ran].recipe.label)
                    $('#accordion').append($card)
                    $(`#card${j}`).append($cardHeader)
                    $(`#heading${j}`).append($heading)
                    $(`#h${j}`).append($collapse)
                    $(`#h${j}`).append($buttonx)
                    $(`#card${j}`).append($box2)
                    $(`#collapse${j}`).append($cardbody)
                    $(".x").on('click', function () {
                        $(this).parents('.card').get(0).remove()
                    });
                }
                window.location = '#accordion'
                $('#enter-button').prop("disabled", false);
            })
            $('#accordion').append($randomButton)
            $('#random-button').on("click", function () {
                let x = Math.floor(Math.random() * 10)
                let $cards = $('.card')
                let id = $cards[x-1].id
                let nums = id.replace(/[a-z]/gi, '') 
                $(`#collapse${nums}`).removeClass('collapse')
            })
        }
    })
});



/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openNav2() {
    document.getElementById("mySidenav2").style.width = "50%";
}

/* Set the width of the side navigation to 0 */
function closeNav2() {
    document.getElementById("mySidenav2").style.width = "0";
}
