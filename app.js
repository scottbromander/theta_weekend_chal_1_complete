/*
For your weekend challenge, you will need to create an application that adds employee salaries 
so that a company knows how much they are spending each month in salary.

The application should first have an input form that collects:
The Employee's First and Last name
The Employee's ID Number
The Employee's Job Title
The Employee's Salary (Yearly)

The form should have a submit button that clears out the form and your logic should store 
that information. Then, that information should be appended to the DOM so that the user of the 
application can see the information they just entered.

Finally, your logic should calculate all of the employee salaries and report back what the 
monthly cost of salaries is.

Hard Mode
Create a delete button that removes an employee from the form. Note that in hard mode, 
it need not remove that Employee's salary from the reported total. (Note, you will need to 
look up the '.remove()' jQuery function).

Pro Mode
Once the employee is deleted, also update the total spend on salaries to discount the 
removed employee's salary. This will require that the logic knows which element was removed. 
You will need to stretch yourself for this one. I also recommend that you look into 
jQuery's .data() function to help complete this. Note, you will need to do something both when 
the employee is added and when they are deleted to make your application 'smart'.
*/

var employeeArray = [];
var employeeUniqueId = 0;

$(document).ready(function(){
	$("#employeeinfo").on('submit',function(event){
		event.preventDefault();

		var values = {};
		employeeUniqueId++;

		var serializedArray = $("#employeeinfo").serializeArray();

		$.each(serializedArray, function(i, field){
			values[field.name] = field.value;
		})
		
		$("#employeeinfo").find("input[type=text]").val("");

		values.employeeUniqueId = employeeUniqueId;

		appendDom(values);

		employeeArray.push(values);
		
		totalSalary();
	});

	enable();
});

function init(){
	
}

function enable(){
	$("#container").on('click', '.delete-btn', clickDelete);
}

function clickDelete(){
	var $el = $(this).parent();

	for(var i = 0; i < employeeArray.length; i++){
		if(employeeArray[i].employeeUniqueId == $el.data("kittyfoo")){
			employeeArray.splice(i, 1);
		}
	}

	$el.remove();
	totalSalary();
}

function appendDom(object){
	$("#container").append("<div class='employee'></div>");
	var $el = $("#container").children().last();
	$el.data("kittyfoo", employeeUniqueId);


	$el.append("<p>" + object.employeefirstname + "</p>");
	$el.append("<p>" + object.employeelastname + "</p>");
	$el.append("<p>" + object.employeenumber + "</p>");
	$el.append("<p>" + object.employeetitle + "</p>");
	$el.append("<p>" + object.employeesalary + "</p>");
	$el.append("<button class='delete-btn'>Delete</button>");
}

function totalSalary(){
	// [{}, {}, {}]

	var totalCalcSalary = 0;

	for(var i = 0; i < employeeArray.length; i++){
		var object = employeeArray[i];
		totalCalcSalary += parseInt(object.employeesalary);
	}

	totalCalcSalary /= 12;

	$("#totalContainer").text("Total Monthly Salary: " + totalCalcSalary);
}
