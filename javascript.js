
var game_timer_val = 60
var question_number = 1
var answer_points = 0
var total_points = 0
var time_points = 0
var quiz_over = false



$("#start_button").on("click", function() {

    // Hide score area
    $("#score_area").hide()
    $("#intro_box").hide()
    $("#multiple_choice").show()
    $("#timer_value").text("Time Left: " + game_timer_val)


    // Variable to track time
    var game_time = setInterval(function() {

        game_timer_val--
        $("#timer_value").text("Time Left: " + game_timer_val)

        if (game_timer_val <= 0 || quiz_over) {
            clearInterval(game_time)
        }
        
    
        
    },1000)

    // Initiate quiz
    question_1()    
    
})

// Fill in fist question
var question_1 = function() {

    // Fill in values
    $("#question_area").text("What does CDN stand for?")
    $("#answer_1").text("Canadian Drive Noodles")
    $("#answer_2").text("Content Delivery Network")
    $("#answer_3").text("Cool Dudes Nowhere")
    $("#answer_4").text("Cold Driveway Neighbor")
}

// Second Question
var question_2 = function() {

    // Fill in values
    $("#question_area").text("Where should you import javascript?")
    $("#answer_1").text("In my CSS file")
    $("#answer_2").text("In the Body")
    $("#answer_3").text("It doesn't need to be imported")
    $("#answer_4").text("In the Head")
}

// Third Question
var question_3 = function() {

    // Fill in values
    $("#question_area").text("Where should you import a custom JavaScript script?")
    $("#answer_1").text("After !DOCTYPE")
    $("#answer_2").text("It doesn't need to be imported")
    $("#answer_3").text("In the end of the Body")
    $("#answer_4").text("In my CSS file")
}

// Fourth Question
var question_4 = function() {

    // Fill in values
    $("#question_area").text("What do you name your top level HTML file?")
    $("#answer_1").text("Base.js")
    $("#answer_2").text("TopLevel.css")
    $("#answer_3").text("DOCTYPE.cjss")
    $("#answer_4").text("index.html")
}

var get_name = function() {
    $("#multiple_choice").hide()
}

$(".answer_button").on("click", function() {
    
    
    // Check answer of button compared to real answers
    check_answer($(this).data("value"))

    question_number++

    if (question_number == 1) {
        question_1()
    }
    else if (question_number == 2) {
        question_2()
    }
    else if (question_number == 3) {
        question_3()
    }
    else if (question_number == 4) {
        question_4()
    }
    else if (question_number == 5) {
        get_name()
        total_points = answer_points + (game_timer_val/10.0)
        $("#get_user_name").show()
        quiz_over = true
    }
    

})

// Function to check answer of question
var check_answer = function(choice) {

    // Check question number, then check for corrent 
    if (question_number == 1) {
        if (choice == 2){
            answer_points++
            return
        }
        else {
            return
        }
    }
    else if (question_number == 2) {
        if (choice == 4){
            answer_points++
            return
        }
        else {
            return
        }
    }
    else if (question_number == 3) {
        if (choice == 3){
            answer_points++
            return
        }
        else {
            return
        }
    }
    else if (question_number == 4) {
        if (choice == 4){
            answer_points++
            return
        }
        else {
            return
        }
    }
}

// Submit name
$("#name_submit").on("click", function() {
    
    // Check if score file exists
    if ("stored_scores" in localStorage) {

        // Load file and get number of keys
        var all_scores = JSON.parse(localStorage.getItem("stored_scores"))
        new_input = [$("#user_name_input").val(), total_points]

        // Create new object and save
        all_scores.push(new_input)
        localStorage.setItem("stored_scores", JSON.stringify(all_scores))


    }
    else if (!("stored_scores" in localStorage)) {
    
        // Create new input and save
        new_input = [[$("#user_name_input").val(), total_points]]
        localStorage.setItem("stored_scores", JSON.stringify(new_input))
    }

    total_points = 0
    time_points = 0
    answer_points = 0
    question_number = 1
    $("#get_user_name").hide()
    $("#intro_box").show()
    $("#score_area").show()
    $("#score_table tr").remove()
    fill_scores()
    $("#user_name_input").val("")

})

// Populate Score table
var fill_scores = function(){

    if ("stored_scores" in localStorage) {

        // Load file
        var all_scores = JSON.parse(localStorage.getItem("stored_scores"))

        // Initial max score
        var max_score = 0

        // Get max score
        all_scores.forEach(function(item, index) {
            if (item[1] > max_score) max_score = item[1]
        })

        // Loop through each saved score and add table row
        all_scores.forEach(function(item, index) {

            if (item[1] == max_score) {
                var new_line = $("<tr class='table-primary'>")
            }
            else {
                var new_line = $("<tr>")
            }
            
            new_line.append($("<th>" + item[0] + "</th>"))
            new_line.append($("<th>" + item[1] + "</th>"))
            $("#score_table").append(new_line)
            console.log(new_line);
        })
    }

}

fill_scores()
console.log("test");