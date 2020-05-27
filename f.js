function onButtonClick() {
	target = document.getElementById("output");
	target.innerText = document.forms.id_form1.id_textBox1.value;
	//target.innerText = document.id_form1.id_textBox1.value;//これでもOK
}

function checkText(){
		// var task = document.todo.task.value;
		// var ex = document.todo.explanation.value;
		// window.alert(task + "が入力しました");
		// document.getElementById("data").innerHTML = "仕事"+ task + "説明"+ex+"以上";
	target = document.getElementById("data");
	target.innerText = document.forms.id_todo.id_task.value;

}