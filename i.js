function checkText(){
		var id = document.todo.id1.value;
		var task = document.todo.task1.value;
		var ex = document.todo.ex1.value;
		
		var table = document.getElementById('table1');
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = id;
		cell2.innerHTML = task;
		cell3.innerHTML = ex;
}

//データベース名を指定
		var dbName = 'testDB';
		//オブジェクト・ストアの名前を指定
		var storeName = 'testStore';
		//データベース接続(非同期)
		var result = indexedDB.open(dbName);

		//データベースを新規作成する必要があるかバージョンの更新が必要な場合
		result.addEventListener("upgradeneeded", function(ev){
			//データベースのバージョン取得
			console.log("データベース" + dbName + "が新規製作されたか、データベースのバージョンが更新されました");
			//接続できたデータベース・オブジェクトの取得
			var db = ev.target.result;
			//オブジェクト・ストアの作成
			//第二引数にインデックス（見出し）となるキー名を指定する
			//{KeyPath: 'キー名'}という書式
			db.createObjectStore(storeName, {keyPath: 'id'});
			//これはidというキーを検索に使うという意味で、データの中にidというキーしか持てないという意味ではない
			//オブジェクト・ストアはこのupgradeneededイベントの中でしか作れない
		});

				//データベースが新規作成されたかバージョンが更新された場合
		//onupgradeneededのあとにここにくる
		result.addEventListener("success", function(ev){
			console.log("データベース" + dbName + "との接続に成功しました");
			//接続できたデータベース・オブジェクトの取得
			var db = ev.target.result;
			//オブジェクトの中身を覗いておく
			console.log(db);
			//データベースのバージョン取得
			console.log("データベース" + dbName + "のバージョンは" + ev.target.result.version + "です");
				
				//新規データの投入
				//形式はJavaScriptオブジェクト
				//idはupgradeneededでストア作成時にインデックス・キーに指定したので必須
				var datas = [
					{id:1, task:'田中太郎', ex:'なにする'},
					{id:2, task:'山田一郎', ex:'なにしよ'},
					{id:3, task:'高橋花子', ex:'わかんない'},
					{id:4, task:'小島よしお', ex:'rubyかな'},
					{id:5, task:'小島よし', ex:'HTMLでしょ'},
					{id:6, task:'鈴木龍', ex:'いやいや'},
					{id:7, task:'増田謙也', ex:'それはちょと'},
					{id:8, task:'岡田謙也', ex:'えっ！'},
			];
			//トランザクションの生成（読み書きモード）
			var trs = db.transaction(storeName, 'readwrite');
			//接続するオブジェクト・ストアの指定
			var targetStore = trs.objectStore(storeName);
			//データの挿入
			for(i=0;i<datas.length;i++){
				//データの挿入
				putResult = targetStore.put(datas[i]);
				//挿入結果が成功なら
				putResult.addEventListener("success", function(){
					console.log(i+"件目のデータ記録成功");
				});
			}

			//トランザクション完了
			trs.addEventListener("complete", function(){
				console.log('トランザクション処理が完了しました');
			});
			//上で取得したデータベースとの接続を一旦切断
			db.close();
		});

		//データベースとの接続に失敗した場合
		result.addEventListener("error", function(ev){
			console.log("データベース"+ dbName+ "との接続に成功しました");
			//接続できたデータベース・オブジェクトの取得
			var db = ev.target.result;
			//上で取得したデータベースとの接続を一旦切断
			db.close();
		});

				//DOM読み込み完了
		window.addEventListener("load", function(){
			var recData = document.getElementById("id1");
			var recData = document.getElementById("task1");
			var recData = document.getElementById("ex1");
			var regBtn = document.getElementById("regBtn");
			var openBtn = document.getElementById("openBtn");
			var dispData = document.getElementById("dispData");


			//データ取得ボタン
			openBtn.addEventListener("click", function(ev){
				var openReq = indexedDB.open(dbName);

				openReq.addEventListener("success", function(ev){
					var db = ev.target.result;
					//読み取り(readonly)モードでトランザクション生成
					var trs = db.transaction(storeName, 'readonly');
					var targetStore = trs.objectStore(storeName);
					//すべてのデータを取得
					var resultQuery = targetStore.getAll();

					resultQuery.addEventListener("success", function(evt){
						console.log(evt.target.result);
						arrResult = evt.target.result;

						strTable = "<table border='1'><tr><th>ID</th><th>仕事</th><th>説明</th><th>削除</th></tr>";

						for(i=0;i<arrResult.length;i++){
							strTable += "<tr>";
							strTable += "<td>" + arrResult[i]["id"] + "</td>";
							strTable += "<td>" + arrResult[i]["task"] + "</td>";
							strTable += "<td>" + arrResult[i]["ex"] + "</td>";
							strTable += "<td><input type='button' value='削除'  onclick='delbtn(this);'></td>"
							strTable += "</tr>";
						}
						strTable += "</table>";
						dispData.innerHTML = strTable;
					});

					resultQuery.addEventListener("error", function(evt){
						console.log("認証失敗");
					});
				});
			});

			//データ記録ボタン
			regBtn.addEventListener("click", function(ev){
				var addData = {id:parseInt(id1.value),task:task1.value,ex:ex1.value};
				var openReq = indexedDB.open(dbName);

				openReq.addEventListener("success",function(ev){
					var db = ev.target.result;
					//トランザクションの生成（読み書きモード）
					var trs = db.transaction(storeName, 'readwrite');
					//接続するオブジェクト・ストアの指定
					var targetStore = trs.objectStore(storeName);
					//データの挿入
					putResult = targetStore.put(addData);

						//挿入結果が成功なら
						putResult.addEventListener("success", function(){
							console.log("データ記録成功");
							//データベースのバージョン取得。データを記録してもバージョンは上がらない
							console.log("データベース"+dbName+"のバージョンは"+ev.target.result.version+"です");
						});
				});
			});
		});

		function delbtn(obj){
			console.log("hello world!"+obj.value);
			tr = obj.parentNode.parentNode;
			tr.parentNode.deleteRow(tr.sectionRowIndex);
			// deleteItem(obj);
		}

		function deleteItem(event){
			var openReq = indexedDB.open(dbName);
			let delTask = event.target.

			openReq.addEventListener("success",function(ev){
					var db = ev.target.result;
					//トランザクションの生成（読み書きモード）
					var trs = db.transaction(storeName, 'readwrite');
					//接続するオブジェクト・ストアの指定
					var targetStore = trs.objectStore(storeName);
					//データの挿入
					// putResult = targetStore.put(addData);

						//挿入結果が成功なら
						putResult.addEventListener("success", function(){
							console.log("データ削除成功");
							//データベースのバージョン取得。データを記録してもバージョンは上がらない
							console.log("データベース"+dbName+"のバージョンは"+ev.target.result.version+"です");
						});
				});
		}