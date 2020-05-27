// window.onload = function(){
// 	document.getElementById('btn').addEventListener('click', function(){
// 		var task = document.todo.task.value;
// 		var ex = document.todo.explanation.value;
// 		window.alert(task + "が入力しました");
// 		// document.getElementById("data").innerHTML = "<td>"+ task + "</td><td>"+ex+"</td>";
// 		document.getElementById("data").innerText = "仕事"+ task + "説明"+ex+"以上";
// 		// document.write(task);
// 	}, false);
// };

function checkText(){
		var task = document.todo.task.value;
		var ex = document.todo.explanation.value;
		// window.alert(task + "が入力しました");
		document.getElementById("data").innerHTML = "<table border='1'><tr><th>仕事名</th><th>説明</th><th>優先度</th></tr><td>"+ task + "</td> <td>" + ex + "</td></tr></table>";
		// document.getElementById("data").innerHTML = "<td>"+ task + "</td><td>"+ex+"</td>";
		// target = document.getElementById("data");
		// target.innerText = task;

}