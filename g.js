function checkText(){
		var task = document.todo.task.value;
		var ex = document.todo.explanation.value;
		
		var table = document.getElementById('table1');
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = task;
		cell2.innerHTML = ex;
		cell3.innerHTML = '<input type="button" value="削除" onclick="deleteRow(this)">';
}

function deleteRow(obj){
	tr = obj.parentNode.parentNode;
	tr.parentNode.deleteRow(tr.sectionRowIndex);
}