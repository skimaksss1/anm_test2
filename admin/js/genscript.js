
$('body').on('keydown', function () {
	//console.log("Ok");
	editorText = $('#geneditorru').html();
	$('#editorTextru').text(editorText);
	editorText2 = $('#geneditoropsinieru').html();
	$('#editorTextOpisanieru').text(editorText2);
});

$('#savegenru').click(function () {
	if (confirm('Вы уверены?')) {
		// если пользователь нажал "да"
		alert('Вы выбрали "да".');
	} else {
		// если пользователь нажал "нет" или закрыл диалоговое окно
		alert('Вы выбрали "нет".');
	}
});



const database = firebase.database();
const storage = firebase.storage();

function saveGenText(lng, dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genpage').set({
		zagolovok: textToSave
	});

	console.log(textToSave2);
	database.ref(lng + '/page/genpage/opisanie').set(textToSave2);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}


//   Загрузка с базы
function loadAdminGen(lng, dv, dv2) {
	database.ref(lng + '/page/genpage/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).val(value);
	});

	database.ref(lng + '/page/genpage/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	if (lng == 'ru') {
		readico('br', lng, '#genIcoTextRu', '#capIcoTextRu')
	}
}

// Сохранения описание с икноками

function saveico(block, lng, dv, dv2, dv3) {
	const title = $(dv).val().replace(/\n/g, "<br>");
	const description = $(dv2).val().replace(/\n/g, "<br>");
	const imageInput = document.getElementById(dv3);
	const reader = new FileReader();

	// Сохранение данных в Firebase Realtime Database и Storage при изменении

	database.ref(lng + '/page/genpageico/' + block + '/title').set(title);
	database.ref(lng + '/page/genpageico/' + block + '/description').set(description);


	if (imageInput.files.length > 0) {
		const file = imageInput.files[0];
		reader.onload = function (event) {
			const fileData = event.target.result;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child(lng + '/page/genpageico/' + block + '/imageUrl/' + block);
			fileRef.put(fileData).then(function (snapshot) {
				console.log("Загрузка файла успешно завершена");
				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child(lng + '/page/genpageico/' + block + '/imageUrl/' + block);
				fileRef.getDownloadURL().then(function (url) {
					console.log("URL-адрес загруженного файла: " + url);
					database.ref(lng + '/page/genpageico/' + block + '/ico').set(url);
				});
			});
		}

		reader.readAsArrayBuffer(file);

	} else {
		// Файл не был выбран
	}


}
// Загрузка с базы описание с иконками
function readico(block, lng, dv, dv2) {
	for (let i = 1; i <= 4; i++) {
		// Считывание данных из Firebase Realtime Database и отображение на странице
		database.ref(lng + '/page/genpageico/' + block + i + '/title').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});

		database.ref(lng + '/page/genpageico/' + block + i + '/description').on('value', (snapshot) => {
			const value2 = snapshot.val().replace(/<br>/g, "\n");
			// console.log(snapshot.val());
			$(dv2 + i).val(value2);
		});

	}
}

function saveGenProductText(lng, dv) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genproduct/zagolovok').set(textToSave);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function saveGenProductName(lng, dv, pr) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genproduct/' + pr + '/nazvanie/').set(textToSave);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
//   Загрузка с базы
function loadAdminGenProduct(lng, dv) {
	database.ref(lng + '/page/genproduct/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
}
function loadAdminGenProductName(lng, dv, pr) {
	database.ref(lng + '/page/genproduct/' + pr + '/nazvanie/').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
}
function loadAdminGenProductName(lng, dv, pr, ful) {
	for (let i = 1; i <= 8; i++) {
		database.ref(lng + '/page/genproduct/' + i + '/nazvanie/').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});
	}

}
function saveGenAboutText(lng, dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/genabout/').set({
		zagolovokabout: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function loadAdminGenAbout(lng, dv, dv2) {
	database.ref(lng + '/page/genabout/zagolovokabout').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref(lng + '/page/genabout/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
}

function saveGenPlusText(lng, dv, dv2, pos) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/genplus/' + pos + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function loadAdminGenPlus(lng, dv, dv2, pos) {
	database.ref(lng + '/page/genplus/' + pos + '/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref(lng + '/page/genplus/' + pos + '/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
}

function loadAdminGenPlus(lng, dv, dv2, pos, pls) {
	for (let i = 1; i <= 3; i++) {
		database.ref(lng + '/page/genplus/' + i + '/zagolovok').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});
		database.ref(lng + '/page/genplus/' + i + '/opisanie').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv2 + i).html(value);
		});
	}

}

function scrit(idcard) {
	console.log(document.getElementById(idcard).style.display);
	stat = document.getElementById(idcard).style.display;
	disp = 'none';
	if (stat == 'block' || stat == '') disp = 'none';
	else {
		disp = 'block';
	}
	document.getElementById(idcard).style.display = disp;
}

function saveImgAbout(dv3) {

	const imageInput = document.getElementById(dv3);
	const reader = new FileReader();

	if (imageInput.files.length > 0) {
		const file = imageInput.files[0];
		reader.onload = function (event) {
			const fileData = event.target.result;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child('aboutImg/');
			fileRef.put(fileData).then(function (snapshot) {

				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child('aboutImg/');
				fileRef.getDownloadURL().then(function (url) {
					console.log("URL-адрес загруженного файла: " + url);
					database.ref('aboutImg/').set(url);
					alert("Загрузка файла успешно завершена");
				});
			});
		}

		reader.readAsArrayBuffer(file);

	} else {
		// Файл не был выбран
	}


}

function saveHistory(lng, dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/history/' + textToSave + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные сохранены"); break;
		case 'en': alert("Data save"); break;
		case 'kz': alert("Мәліметтер сақталды"); break;
	}
	clearHistory(dv, dv2);
	loadHistoryAdmin(lng, dv3);
}

function clearHistory(dv, dv2) {
	$(dv).val("");
	$(dv2).html("");
}

function updateHistory(lng, year, dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/history/' + textToSave + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные сохранены"); break;
		case 'en': alert("Data save"); break;
		case 'kz': alert("Мәліметтер сақталды"); break;
	}
	loadHistoryAdmin(lng, dv3);
}
function delHistory(lng, year, dv) {
	firebase.database().ref(lng + '/page/history/' + year).remove();
	switch (lng) {
		case 'ru': alert("Данные удалены"); break;
		case 'en': alert("Data delete"); break;
		case 'kz': alert("Мәліметтер жойылды"); break;
	}
	loadHistoryAdmin(lng, dv);
}
function loadHistoryAdmin(lng, dv) {
	$(dv).html('');
	ln = 'Ru';
	yr = 'год';
	switch (lng) {
		case 'ru':
			ln = 'Ru';
			yr = 'год';
			break;
		case 'en':
			ln = 'En';
			yr = 'year';
			break;
		case 'kz':
			ln = 'Kz';
			yr = 'жыл';
			break;

		default:
			break;
	}
	database.ref(lng + '/page/history/').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			console.log(item.zagolovok, item.opisanie);
			$(dv).append('<div class="card"> <div class="card-header"> <strong>' + item.zagolovok + '</strong> ' + yr + ' </div>' +
				'<div class="card-body card-block"> <form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2" class="pr-1  form-control-label">' + yr + '</label>' +
				' <input id="genHistoryTitle' + ln + item.zagolovok + '" type="number" class="form-control w100" value = "' + item.zagolovok + '">' +
				'</div> </form> <br> <div class="toolbar"> <a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				' <a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a> <a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый">' +
				'</a> <a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				' <a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				' <a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				' <a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				' <a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				' <a href="#" class="toolbar-p" title="Параграф">p</a> <a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				' <a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				' <a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				' <a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				' <a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				' <a href="#" class="toolbar-html" title="Вставить html">HTML</a> <a href="#" class="toolbar-text" title="Вставить текст">Text</a> <br> <a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a> <a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a> <a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a> <a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a> <select class="toolbar-font"> <option selected="selected" disabled="disabled">Шрифт</option> <option value="arial">Arial</option> <option value="Courier New">Courier New</option> <option value="georgia">Georgia</option> <option value="impact">Impact</option> <option value="roboto">Tahoma</option> <option value="Times New Roman">Times New Roman</option> <option value="verdana">Verdana</option> </select> <select class="toolbar-size"> <option selected="selected" disabled="disabled">Размер</option> <option value="1">10px</option> <option value="2">12px</option> <option value="3">14px</option> <option value="4">16px</option> <option value="5">18px</option> <option value="6">21px</option> <option value="7">26px</option> </select> <span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000"> <span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00"> <br> <a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a> <a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a> <a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a> <a href="#" class="toolbar-selectAll">Выделить всё</a> <a href="#" class="toolbar-removeFormat">Очистить стили</a> <a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a> <a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a> </div>' +
				' <div class="editor" contenteditable="true" id="genHistoryText' + ln + item.zagolovok + '">' + item.opisanie + '</div> </div> <div class="card-footer">' +
				' <button type="submit" class="btn btn-primary btn-sm" onclick="updateHistory(\'' + lng + '\',\'' + item.zagolovok + '\',\'#genHistoryTitle' + ln + item.zagolovok + '\',\'#genHistoryText' + ln + item.zagolovok + '\',\'' + dv + '\')"> <i class="fa fa-dot-circle-o"></i> Сохранить </button>' +
				' <button type="reset" class="btn btn-danger btn-sm" onclick="delHistory(\'' + lng + '\',\'' + item.zagolovok + '\',\'' + dv + '\')"> <i class="fa fa-ban"></i> Удалить </button> </div> </div>');
		}
	});
}

function addPartners() {
	var databaseRef = firebase.database().ref("partners");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("partners/" + randomKey + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(randomKey).set({
					imageUrl: url
				}).then(function () {
					loadPartners('#custom-nav-home2');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}

function loadPartners(dv) {
	$(dv).html('');
	database.ref('partners').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			// console.log(key);
			// console.log(item.imageUrl);
			$(dv).append('<div class="card">' +
				'<div class="card-header">' +
				'<strong>Фотография</strong> партнера' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 20%;"><label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Фотография</label> <img src="' + item.imageUrl + '" alt="">' +
				'</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm" onclick="delPartners(\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> удалить' +
				'</button>' +
				'</div>' +
				'</div>');
		}
	});
}

function delPartners(id) {
	firebase.database().ref('partners/' + id).remove();
	loadPartners('#custom-nav-home2');
	alert("Данные удалены");

}

function saveContact(lng, dv, dv2, pos) {
	var databaseRef = firebase.database().ref(lng + '/page/contact/' + pos);
	var randomKey = databaseRef.push().key;
	console.log(randomKey);
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	// console.log(textToSave);
	// console.log(textToSave2);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey + '/zagolovok').set(textToSave);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey + '/opisanie').set(textToSave2);
	switch (lng) {
		case 'ru': alert("Данные добавлены"); break;
		case 'en': alert("Add date"); break;
		case 'kz': alert("Мәліметтер қосылды"); break;
	}
	if (pos == 'number') {
		loadContact('ru', '#cardPhoneRu', 'number');
	}
	else if (pos == 'other') {
		loadContact('ru', '#cardOtherRu', 'other');
	}

}
function saveContact2(lng, dv, dv2, pos, randomKey) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	// console.log(textToSave);
	// console.log(textToSave2);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey + '/zagolovok').set(textToSave);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey + '/opisanie').set(textToSave2);

	switch (lng) {
		case 'ru': alert("Данные добавлены"); break;
		case 'en': alert("Add date"); break;
		case 'kz': alert("Мәліметтер қосылды"); break;
	}
	if (pos == 'number') {
		loadContact('ru', '#cardPhoneRu', 'number');
	}
	else if (pos == 'other') {
		loadContact('ru', '#cardOtherRu', 'other');
	}

}
function clearContact(dv, dv2) {
	$(dv).val("");
	$(dv2).html("");
}
function loadContact(lng, dv, block) {
	$(dv).html('');
	ln = 'Ru';
	switch (lng) {
		case 'ru':
			ln = 'Ru';
			break;
		case 'en':
			ln = 'En';
			break;
		case 'kz':
			ln = 'Kz';
			break;

		default:
			break;
	}
	database.ref(lng + '/page/contact/' + block + '/').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			// console.log(item.zagolovok, item.opisanie);
			if (block == 'number') {
				$(dv).append('<div class="card">' +
					'<div class="card-header">' +
					'<strong>' + item.zagolovok + '</strong>' +
					'</div>' +
					'<div class="card-body card-block">' +
					'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Заголовок</label><textarea ' +
					'id="' + key + 'Title' + ln + '1" class="form-control w100">' + item.zagolovok.replace(/<br>/g, "\n") + ' </textarea></div>' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Номер телефона</label><textarea ' +
					'id="' + key + 'Description' + ln + '1" class="form-control w100">' + item.opisanie.replace(/<br>/g, "\n") + ' </textarea>' +
					'</div>' +
					'</form>' +
					'</div>' +
					'<div class="card-footer">' +
					'<button type="submit" class="btn btn-primary btn-sm"' +
					'onclick="saveContact2(\'' + lng + '\',\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\',\'number\',\'' + key + '\')">' +
					'<i class="fa fa-dot-circle-o"></i> Сохранить' +
					'</button>' +
					'<button type="reset" class="btn btn-danger btn-sm"' +
					'onclick="clearContact(\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\')">' +
					'<i class="fa fa-ban"></i> Отменить' +
					'</button>' +
					'</div>' +
					'</div>');
			}
			else if (block == 'other') {
				$(dv).append('<div class="card">' +
					'<div class="card-header">' +
					'<strong>' + item.zagolovok + '</strong>' +
					'</div>' +
					'<div class="card-body card-block">' +
					'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Заголовок</label><textarea ' +
					'id="' + key + 'Title' + ln + '1" class="form-control w100">' + item.zagolovok.replace(/<br>/g, "\n") + ' </textarea></div>' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Номер телефона</label><textarea ' +
					'id="' + key + 'Description' + ln + '1" class="form-control w100">' + item.opisanie.replace(/<br>/g, "\n") + ' </textarea>' +
					'</div>' +
					'</form>' +
					'</div>' +
					'<div class="card-footer">' +
					'<button type="submit" class="btn btn-primary btn-sm"' +
					'onclick="saveContact2(\'' + lng + '\',\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\',\'other\',\'' + key + '\')">' +
					'<i class="fa fa-dot-circle-o"></i> Сохранить' +
					'</button>' +
					'<button type="reset" class="btn btn-danger btn-sm"' +
					'onclick="clearContact(\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\')">' +
					'<i class="fa fa-ban"></i> Отменить' +
					'</button>' +
					'</div>' +
					'</div>');
			}

		}
	});
}
function addImgContact() {
	var databaseRef = firebase.database().ref("contact/imageUrl");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var imageRef = storageRef.child("contact/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.set(url).then(function () {
					// loadPartners('#custom-nav-home2');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}

function saveCardTitle(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/contact/zagolovok').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/contact/zagolovok').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/contact/zagolovok').set(textToSave3);
	alert("Данные изменен");

}
function loadCardTitle(dv, dv2, dv3) {
	database.ref('ru/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv).val(value);
	});
	database.ref('en/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv2).html(value);
	});
	database.ref('kz/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv3).html(value);
	});
}
function saveCardAdres(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/contact/adres').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/contact/adres').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/contact/adres').set(textToSave3);
	alert("Данные изменен");

}
function loadCardAdres(dv, dv2, dv3) {
	database.ref('ru/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref('en/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
	database.ref('kz/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv3).html(value);
	});
}

function saveCardSsil(dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('contact/insta').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('contact/web').set(textToSave2);
	alert("Данные изменен");

}
function loadCardSsil(dv, dv2) {
	database.ref('contact/insta').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref('contact/web').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});

}
function saveRekvizidCardAdres(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/rekvizit').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/rekvizit').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/rekvizit').set(textToSave3);
	alert("Данные изменен");

}
function loadRekvizidCardTitle(dv, dv2, dv3) {
	database.ref('ru/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv).val(value);
	});
	database.ref('en/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv2).html(value);
	});
	database.ref('kz/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv3).html(value);
	});
}

function addCertifacate(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	var databaseRef = firebase.database().ref("certifacate");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("certifacate/" + randomKey + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(randomKey).set({
					imageUrl: url,
					ru: textToSave,
					en: textToSave2,
					kz: textToSave3
				}).then(function () {
					// loadPartners('#custom-nav-home2');
					loadCert('#certCard');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}
function loadCert(dv) {
	$(dv).html('');
	database.ref('certifacate').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			// console.log(key);
			// console.log(item.imageUrl);
			$(dv).append('<div class="card">' +
				'<div class="card-header">' +
				'<strong>Cертификат</strong> ' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Фотография</label><img src="' + item.imageUrl + '" alt="">' +
				'</div>' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Русский</label><textarea id="Title' + key + 'Ru"' +
				'class="form-control w100">' + item.ru + ' </textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">English</label><textarea id="Title' + key + 'En"' +
				'class="form-control w100">' + item.en + ' </textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Қазақша</label><textarea id="Title' + key + 'Kz"' +
				'class="form-control w100">' + item.kz + ' </textarea>' +
				'</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateCert(\'' + key + '\',\'#Title' + key + 'Ru\',\'#Title' + key + 'En\',\'#Title' + key + 'Kz\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="delCert(\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Удалить' +
				'</button>' +
				'</div>' +
				'</div>');
		}
	});
}
function updateCert(kk, dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	// console.log(textToSave);
	// console.log(textToSave2);
	database.ref('certifacate/' + kk + '/ru').set(textToSave);
	database.ref('certifacate/' + kk + '/en').set(textToSave2);
	database.ref('certifacate/' + kk + '/kz').set(textToSave3);
	alert("Данные обновлены");
	loadCert('#certCard');

}
function delCert(id) {
	firebase.database().ref('certifacate/' + id).remove();
	loadCert('#certCard');
	alert("Данные удалены");

}

function addNews(dv, dv2, dv3, dv4, dv5, dv6, dt) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	var dateValue = $(dt).val();
	console.log(dt);
	var dateObject = new Date(dateValue);
	// Получаем день, месяц и год из объекта Date
	var day = dateObject.getDate();
	var month = dateObject.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
	var year = dateObject.getFullYear();
	// Форматируем день и месяц для вывода с ведущими нулями (если необходимо)
	var formattedDay = day < 10 ? "0" + day : day;
	var formattedMonth = month < 10 ? "0" + month : month;

	// Формируем отформатированную строку даты в формате "dd.mm.yyyy"
	const formattedDate = formattedDay + "." + formattedMonth + "." + year;
	const opisanieRu = $(dv4).html();
	console.log(opisanieRu);
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();
	var databaseRef = firebase.database().ref("news");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("news/" + randomKey + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(randomKey).set({
					imageUrl: url,
					Titleru: titleRu,
					Titleen: titleEn,
					Titlekz: titlekz,
					Opisanieru: opisanieRu,
					Opisanieen: opisanieEn,
					Opisaniekz: opisanieKz,
					dateNews: formattedDate,

				}).then(function () {
					loadNews('#fullNews');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}
function loadNews(dv) {
	$(dv).html('');
	database.ref('news').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			date_string = item.dateNews;
date_parts = date_string.split(".");
year = date_parts[2];
month = date_parts[1];
day = date_parts[0];
			// console.log(key);
			// console.log(item.imageUrl);
			$(dv).append('<div class="card">' +
				'<div class="card-header">' +
				'<strong>Редактировать новость: ' + item.Titleru + '</strong>' + '<button type="button" class="btn btn-primary" onclick="scrit(\'' + key + 'crd\')"><i class="fa fa-bars"></i>Скрыть</button>' +
				' </div>' +
				'<div id="' + key + 'crd" style="display:none">' +
				'<div class="card-body card-block">' +
				'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Дата</label>' +
				'<input type="date" name="" id="' + key + 'NewsDate">' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на русском</label>' +
				'<textarea id="' + key + 'NewsTitleRu" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleru + ' </textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на англиском</label>' +
				'<textarea id="' + key + 'NewsTitleEn" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleen + ' </textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на казахском</label>' +
				'<textarea id="' + key + 'NewsTitleKz" class="form-control w100"' +
				'style="width: 90%;">' + item.Titlekz + ' </textarea>' +
				'</div>' +
				
				'<div class="form-group" style="width: 50%;">' +
				'<div class="form-group" style="width: 50%;">' +
				'<label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Обложка</label>' +
				'<input type="file" id="' + key + 'imageAbout" accept="image/*">' +
				'</div>' +
				'</div>' +
				'' +
				'</form>' +
				'<br>' +
				'<div class="toolbar">' +
				'<a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				'<a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a>' +
				'<a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый"></a>' +
				'<a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				'<a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				'<a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				'<a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				'<a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				'<a href="#" class="toolbar-p" title="Параграф">p</a>' +
				'<a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				'<a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				'<a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				'<a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				'<a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				'<a href="#" class="toolbar-html" title="Вставить html">HTML</a>' +
				'<a href="#" class="toolbar-text" title="Вставить текст">Text</a>' +
				'<br>' +
				'<a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a>' +
				'<a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a>' +
				'<a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a>' +
				'<a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a>' +
				'<select class="toolbar-font">' +
				'<option selected="selected" disabled="disabled">Шрифт</option>' +
				'<option value="arial">Arial</option>' +
				'<option value="Courier New">Courier New</option>' +
				'<option value="georgia">Georgia</option>' +
				'<option value="impact">Impact</option>' +
				' <option value="roboto">Tahoma</option>' +
				' <option value="Times New Roman">Times New Roman</option>' +
				' <option value="verdana">Verdana</option>' +
				' </select>' +
				' <select class="toolbar-size">' +
				' <option selected="selected" disabled="disabled">Размер</option>' +
				' <option value="1">10px</option>' +
				' <option value="2">12px</option>' +
				' <option value="3">14px</option>' +
				' <option value="4">16px</option>' +
				' <option value="5">18px</option>' +
				' <option value="6">21px</option>' +
				' <option value="7">26px</option>' +
				' </select>' +
				' <span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000">' +
				' <span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00">' +
				' <br>' +
				' <a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a>' +
				' <a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a>' +
				' <a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a>' +
				' <a href="#" class="toolbar-selectAll">Выделить всё</a>' +
				' <a href="#" class="toolbar-removeFormat">Очистить стили</a>' +
				' <a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a>' +
				' <a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a>' +
				' </div>' +
				'' +
				'<p>Описание на русском</p>'+
				' <div class="editor" contenteditable="true" id="' + key + 'newsTextRu">' + item.Opisanieru + '</div>' +
				'<br><br><p>Описание на английском</p>'+
				' <div class="editor2" contenteditable="true" id="' + key + 'newsTextEn">' + item.Opisanieen + '</div>' +
				'<br><br><p>Описание на казахском</p>'+
				' <div class="editor3" contenteditable="true" id="' + key + 'newsTextKz">' + item.Opisaniekz + '</div>' +
				' </div>' +
				' <div class="card-footer">' +
				' <button type="submit" class="btn btn-primary btn-sm"' +
				' onclick="updateNews(\'' + key + '\',\'#' + key + 'NewsTitleRu\',\'#' + key + 'NewsTitleEn\',\'#' + key + 'NewsTitleKz\',\'#' + key + 'newsTextRu\',\'#' + key + 'newsTextEn\',\'#' + key + 'newsTextKz\',\'#' + key + 'NewsDate\')">' +
				' <i class="fa fa-dot-circle-o"></i> Сохранить' +
				' </button>' +
				' <button type="reset" class="btn btn-danger btn-sm"' +
				' onclick="loadAdminGenAbout(\'ru\',\'#genAboutTitleRu\',\'#genAboutTextRu\')">' +
				' <i class="fa fa-ban"></i> Отменить' +
				' </button>' +
				' <button type="reset" class="btn btn-danger btn-sm"' +
				' onclick="delNews(\'' + key + '\')">' +
				' <i class="fa fa-ban"></i> Удалить' +
				' </button>' +
				' </div>' +
				' </div>' +
				' </div>'
			);
			$('#'+key+'NewsDate').val(year+'-'+month+'-'+day);
		}
	});
}
function updateNews(kk, dv, dv2, dv3, dv4, dv5, dv6, img,dt) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");

	const opisanieRu = $(dv4).html();
	// console.log(opisanieRu);
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();

	var dateValue = $('#'+kk+'NewsDate').val();
	console.log('#'+kk+'NewsDate');
	console.log(dateValue);
	var dateObject = new Date(dateValue);
	// Получаем день, месяц и год из объекта Date
	var day = dateObject.getDate();
	var month = dateObject.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
	var year = dateObject.getFullYear();
	// Форматируем день и месяц для вывода с ведущими нулями (если необходимо)
	var formattedDay = day < 10 ? "0" + day : day;
	var formattedMonth = month < 10 ? "0" + month : month;

	// Формируем отформатированную строку даты в формате "dd.mm.yyyy"
	const formattedDate = formattedDay + "." + formattedMonth + "." + year;
	console.log(formattedDate);
	var databaseRef = firebase.database().ref("news");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById(kk + "imageAbout");
	var file = fileInput.files[0];

	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("news/" + kk + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(kk).set({
					imageUrl: url,
					Titleru: titleRu,
					Titleen: titleEn,
					Titlekz: titlekz,
					Opisanieru: opisanieRu,
					Opisanieen: opisanieEn,
					Opisaniekz: opisanieKz,
					dateNews: formattedDate,

				}).then(function () {
					loadNews('#fullNews');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}
	else {
		database.ref('news/' + kk + '/Titleru').set(titleRu);
		database.ref('news/' + kk + '/Titleen').set(titleEn);
		database.ref('news/' + kk + '/Titlekz').set(titlekz);
		database.ref('news/' + kk + '/Opisanieru').set(opisanieRu);
		database.ref('news/' + kk + '/Opisanieen').set(opisanieEn);
		database.ref('news/' + kk + '/Opisaniekz').set(opisanieKz);
		database.ref('news/' + kk + '/dateNews').set(formattedDate);
		alert('Данные обновлены');
	}

}

function addVacan(dv, dv2, dv3, dv4, dv5, dv6) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();
	var databaseRef = firebase.database().ref("vacans");
	var randomKey = databaseRef.push().key;
	databaseRef.child(randomKey).set({
		Titleru: titleRu,
		Titleen: titleEn,
		Titlekz: titlekz,
		Opisanieru: opisanieRu,
		Opisanieen: opisanieEn,
		Opisaniekz: opisanieKz,

	}).then(function () {
		// loadCert('#certCard');
		var inf = confirm("File uploaded and saved to database!");
		if(inf){loadVacans('#fullVacan');succesAddVacans();} else {loadVacans('#fullVacan');succesAddVacans();}
	}).catch(function (error) {
		alert("Error saving to database: " + error.message);
	});
}

function loadVacanPage() {

}
function saveImgVacan() {

	const imageInput = document.getElementById('imageVacan');
	const reader = new FileReader();

	if (imageInput.files.length > 0) {
		const file = imageInput.files[0];
		reader.onload = function (event) {
			const fileData = event.target.result;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child('Imgvacan/');
			fileRef.put(fileData).then(function (snapshot) {

				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child('Imgvacan/');
				fileRef.getDownloadURL().then(function (url) {
					console.log("URL-адрес загруженного файла: " + url);
					database.ref('Imgvacan/').set(url);
					alert("Загрузка файла успешно завершена");
				});
			});
		}

		reader.readAsArrayBuffer(file);

	} else {
		// Файл не был выбран
	}


}

function addTypeProduct(dv, dv2, dv3, dv4, dv5, dv6) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();
	var databaseRef = firebase.database().ref("typeproduct");
	var randomKey = databaseRef.push().key;
	databaseRef.child(randomKey).set({
		Titleru: titleRu,
		Titleen: titleEn,
		Titlekz: titlekz,
		Opisanieru: opisanieRu,
		Opisanieen: opisanieEn,
		Opisaniekz: opisanieKz,

	}).then(function () {
		// loadCert('#certCard');
		alert("File uploaded and saved to database!");
	}).catch(function (error) {
		alert("Error saving to database: " + error.message);
	});
}
function updateTypeProduct(dv, dv2, dv3, dv4, dv5, dv6, kk) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();
	var databaseRef = firebase.database().ref("typeproduct");
	var randomKey = databaseRef.push().key;
	databaseRef.child(kk).set({
		Titleru: titleRu,
		Titleen: titleEn,
		Titlekz: titlekz,
		Opisanieru: opisanieRu,
		Opisanieen: opisanieEn,
		Opisaniekz: opisanieKz,

	}).then(function () {
		// loadCert('#certCard');
		alert("File uploaded and saved to database!");
		loadTypeProduct('#fullTypeProduct');
	}).catch(function (error) {
		alert("Error saving to database: " + error.message);
	});
}
function loadTypeProduct(dv) {
	$(dv).html('');
	database.ref('typeproduct').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			// console.log(key);
			// console.log(item.imageUrl);
			$(dv).append('<div class="tab-content pl-3 pt-2" id="nav-tabContent">' +
				'<!-- Русский -->' +
				'<div class="tab-pane fade active show" id="custom-nav-home" role="tabpanel"' +
				'aria-labelledby="custom-nav-home-tab">' +
				'<div class="card">' +
				'<div class="card-header">' +
				'<strong>Типы продукта</strong> компании' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на русском</label>' +
				' <textarea id="' + key + 'TypeProductTitleRu" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на англиском</label>' +
				'<textarea id="' + key + 'TypeProductTitleEn" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleen + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на казахском</label>' +
				'<textarea id="' + key + 'TypeProductTitleKz" class="form-control w100"' +
				'style="width: 90%;">' + item.Titlekz + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;">' +
				'<div class="form-group" style="width: 50%;">' +
				'<label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Обложка</label>' +
				'<input type="file" id="imageAbout" accept="image/*">' +
				'</div>' +
				'</div>' +
				'' +
				'</form>' +
				'<br>' +
				'<div class="toolbar">' +
				'<a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				'<a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a>' +
				'<a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый"></a>' +
				'<a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				'<a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				'<a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				'<a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				'<a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				'<a href="#" class="toolbar-p" title="Параграф">p</a>' +
				'<a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				'<a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				'<a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				'<a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				'<a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				'<a href="#" class="toolbar-html" title="Вставить html">HTML</a>' +
				'<a href="#" class="toolbar-text" title="Вставить текст">Text</a>' +
				'<br>' +
				'<a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a>' +
				'<a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a>' +
				'<a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a>' +
				'<a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a>' +
				'<select class="toolbar-font">' +
				'<option selected="selected" disabled="disabled">Шрифт</option>' +
				'<option value="arial">Arial</option>' +
				'<option value="Courier New">Courier New</option>' +
				'<option value="georgia">Georgia</option>' +
				'<option value="impact">Impact</option>' +
				'<option value="roboto">Tahoma</option>' +
				'<option value="Times New Roman">Times New Roman</option>' +
				'<option value="verdana">Verdana</option>' +
				'</select>' +
				'<select class="toolbar-size">' +
				'<option selected="selected" disabled="disabled">Размер</option>' +
				'<option value="1">10px</option>' +
				'<option value="2">12px</option>' +
				'<option value="3">14px</option>' +
				'<option value="4">16px</option>' +
				'<option value="5">18px</option>' +
				'<option value="6">21px</option>' +
				'<option value="7">26px</option>' +
				'</select>' +
				'<span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000">' +
				'<span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00">' +
				'<br>' +
				'<a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a>' +
				'<a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a>' +
				'<a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a>' +
				'<a href="#" class="toolbar-selectAll">Выделить всё</a>' +
				'<a href="#" class="toolbar-removeFormat">Очистить стили</a>' +
				'<a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a>' +
				'<a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a>' +
				'</div>' +
				'' +
				'<div class="editor" contenteditable="true" id="' + key + 'TypeProductTextRu">' + item.Opisanieru + '</div>' +
				'<div class="editor2" contenteditable="true" id="' + key + 'TypeProductTextEn">' + item.Opisanieen + '</div>' +
				'<div class="editor3" contenteditable="true" id="' + key + 'TypeProductTextKz">' + item.Opisaniekz + '</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateTypeProduct(\'#' + key + 'TypeProductTitleRu\',\'#' + key + 'TypeProductTitleEn\',\'#' + key + 'TypeProductTitleKz\',\'#' + key + 'TypeProductTextRu\',\'#' + key + 'TypeProductTextEn\',\'#' + key + 'TypeProductTextKz\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'</div>' +
				'</div>' +
				'' +
				'</div>' +
				'' +
				'</div>'

			);
		}

	});


}

function loadTypeProductSelect(dv, dv2) {
	$(dv).html('');
	nameType = [];
	nameType2 = [];
	database.ref('typeproduct').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			nameType[key] = item.Titleru;
			var hasPotType = 'podtype' in item;
			if (hasPotType) {
				nameType2.push(key);
				$(dv).append('<li onclick="loadTypeProductSelect2(\'#select2\',\'' + key + '\',\'' + item.Titleru + '\', ")">' + item.Titleru + '</li>');
			}
			else { $(dv).append('<li onclick="selectItem(\'' + item.Titleru + '\',\'.dropdown-toggle2\',\'.dropdown-menu2\',0,\'' + key + '\' ")">' + item.Titleru + '</li>'); }
		}
		console.log(nameType);
		localStorage.setItem('nameType', nameType);
		localStorage.setItem('nameType2', nameType2);
	});

}
// select2
function loadTypeProductSelect2(dv, kk, tt) {
	// Сохранение данных в localStorage
	localStorage.setItem('typeProductCash', kk);
	localStorage.removeItem('type2ProductCash');
	var dropdownToggle = document.querySelector('.dropdown-toggle2');
	dropdownToggle.textContent = tt;
	toggleDropdown('.dropdown-menu2');
	database.ref("typeproduct/" + kk + "/podtype/").once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			$(dv).append('<li onclick="selectItem(\'' + item.Titleru + '\',\'.dropdown-toggle3\',\'.dropdown-menu3\',3,\'' + key + '\')">' + item.Titleru + '</li>');
		}

	});
	if (localStorage.getItem('typeProductCash') !== null) { kl = localStorage.getItem('typeProductCash'); console.log(kl); }
	if (localStorage.getItem('type2ProductCash') !== null) { kl2 = localStorage.getItem('type2ProductCash'); console.log(kl + ' | ' + kl2); }

}
function addProduct(dv, dv2, dv3, dv4, dv5, dv6, kk, ig) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");

	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();

	let pottypee =
	{
		pottyperu: $('#ProductType2eRu').html(),
		pottypeen: $('#ProductType2eEn').html(),
		pottypekz: $('#ProductType2eKz').html(),
	};

	var databaseRef = firebase.database().ref("product");
	var storageRef = firebase.storage().ref();
	var fileInput2 = document.getElementById(ig);
	var file2 = fileInput2.files[0];
	kl = null, kl2 = null;
	if (localStorage.getItem('typeProductCash') !== null) { kl = localStorage.getItem('typeProductCash'); }
	if (localStorage.getItem('type2ProductCash') !== null) { kl2 = localStorage.getItem('type2ProductCash'); }
	console.log(kl + ' | ' + kl2);
	if (file2) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("product/" + randomKey + "/" + file2.name);
		// загружаем файл в Storage
		imageRef.put(file2).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// alert(url);
				// сохраняем путь в базе данных
				if (kl2 !== null) {
					databaseRef.child(randomKey).set({
						imageUrl: url,
						Titleru: titleRu,
						Titleen: titleEn,
						Titlekz: titlekz,
						Opisanieru: opisanieRu,
						Opisanieen: opisanieEn,
						Opisaniekz: opisanieKz,
						typeProduct: kl,
						type2Product: kl2,

					}).then(function () {
						// loadCert('#certCard');
						alert("File uploaded and saved to database!");
					}).catch(function (error) {
						alert("Error saving to database: " + error.message);
					});
				}
				else {
					databaseRef.child(randomKey).set({
						imageUrl: url,
						Titleru: titleRu,
						Titleen: titleEn,
						Titlekz: titlekz,
						Opisanieru: opisanieRu,
						Opisanieen: opisanieEn,
						Opisaniekz: opisanieKz,
						typeProduct: kl,

					}).then(function () {
						// loadCert('#certCard');
						alert("File uploaded and saved to database!");
					}).catch(function (error) {
						alert("Error saving to database: " + error.message);
					});
				}

			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}
}
function addType2Product(dv, dv2, dv3, kk) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const typeProduct = $(kk).val();
	kl = null, kl2 = null;
	if (localStorage.getItem('typeProductCash') !== null) { kl = localStorage.getItem('typeProductCash'); }
	var databaseRef = firebase.database().ref("typeproduct/" + kl + "/podtype/");
	var randomKey = databaseRef.push().key;
	databaseRef.child(randomKey).set({
		Titleru: titleRu,
		Titleen: titleEn,
		Titlekz: titlekz,

	}).then(function () {
		// loadCert('#certCard');
		alert("File uploaded and saved to database!");
	}).catch(function (error) {
		alert("Error saving to database: " + error.message);
	});
}
function toggleDropdown(dd) {
	var dropdownMenu = document.querySelector(dd);
	dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
}

function selectItem(item, dd, dd2, sel, chk) {
	var dropdownToggle = document.querySelector(dd);
	dropdownToggle.textContent = item;
	toggleDropdown(dd2);
	switch (sel) {
		case 0:
			localStorage.setItem('typeProductCash', chk);
			localStorage.removeItem('type2ProductCash');
			break;
		case 3:
			localStorage.setItem('type2ProductCash', chk);
			break;
		default:
			break;
	}
	kl = '', kl2 = '';
	if (localStorage.getItem('typeProductCash') !== null) { kl = localStorage.getItem('typeProductCash'); }
	if (localStorage.getItem('type2ProductCash') !== null) { kl2 = localStorage.getItem('type2ProductCash'); }
	console.log(kl + ' | ' + kl2);

}

function addDirector(fio1, fio2, fio3, post1, post2, post3, email, num, img) {
	const fioRu = $(fio1).val().replace(/\n/g, "<br>");
	const fioEn = $(fio2).val().replace(/\n/g, "<br>");
	const fioKz = $(fio3).val().replace(/\n/g, "<br>");

	const postRu = $(post1).val().replace(/\n/g, "<br>");
	const postEn = $(post2).val().replace(/\n/g, "<br>");
	const postKz = $(post3).val().replace(/\n/g, "<br>");

	const emailTxt = $(email).val().replace(/\n/g, "<br>");
	const number = $(num).val().replace(/\n/g, "<br>");
	var databaseRef = firebase.database().ref("worker");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById(img);
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("worker/" + randomKey + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(randomKey).set({
					imageUrl: url,
					fioru: fioRu,
					fioen: fioEn,
					fiokz: fioKz,
					postru: postRu,
					posten: postEn,
					postkz: postKz,
					email: emailTxt,
					numberPhone: number,
				}).then(function () {
					// loadPartners('#custom-nav-home2');
					// loadCert('#certCard');
					alert("File uploaded and saved to database!");
					succesAddDirector();
					loadDirector('#certCard');
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}
}
function updateDirector(fio1, fio2, fio3, post1, post2, post3, email, num, img, key) {
	const fioRu = $(fio1).val().replace(/\n/g, "<br>");
	const fioEn = $(fio2).val().replace(/\n/g, "<br>");
	const fioKz = $(fio3).val().replace(/\n/g, "<br>");

	const postRu = $(post1).val().replace(/\n/g, "<br>");
	const postEn = $(post2).val().replace(/\n/g, "<br>");
	const postKz = $(post3).val().replace(/\n/g, "<br>");

	const emailTxt = $(email).val().replace(/\n/g, "<br>");
	const number = $(num).val().replace(/\n/g, "<br>");
	var databaseRef = firebase.database().ref("worker");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById(img);
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("worker/" + key + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(key).set({
					imageUrl: url,
					fioru: fioRu,
					fioen: fioEn,
					fiokz: fioKz,
					postru: postRu,
					posten: postEn,
					postkz: postKz,
					email: emailTxt,
					numberPhone: number,
				}).then(function () {
					// loadPartners('#custom-nav-home2');
					// loadCert('#certCard');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}
	else {
		databaseRef.child(key).set({
			fioru: fioRu,
			fioen: fioEn,
			fiokz: fioKz,
			postru: postRu,
			posten: postEn,
			postkz: postKz,
			email: emailTxt,
			numberPhone: number,
		}).then(function () {
			// loadPartners('#custom-nav-home2');
			// loadCert('#certCard');
			alert("File uploaded and saved to database!");
		}).catch(function (error) {
			alert("Error saving to database: " + error.message);
		});
	}
}
function delNews(id) {
	var ref = database.ref("news/" + id);
	// Удаляем запись
	ref.remove()
		.then(function () {
			console.log("Запись успешно удалена.");
		})
		.catch(function (error) {
			console.error("Ошибка при удалении записи:", error);
		});
}

function loadDirector(dv) {
	$(dv).html('');
	database.ref('worker').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			$(dv).append(
				'<div class="card">' +
				'<div class="card-header card-admin" >' +
				'<strong>' + item.fioru + '</strong> ' +
				'<button type="button" class="btn btn-primary" onclick="scrit(\'' + key + 'crd\')"><i class="fa fa-bars"></i>Скрыть</button>' +
				'</div>' +
				'<div id="' + key + 'crd" style="display:none">' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Фотография</label><input type="file" id="' + key + 'imageDirector" accept="image/*">' +
				'</div>' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">ФИО Русский</label><textarea id="' + key + 'fioDirectorRu"' +
				'class="form-control w100">' + item.fioru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">full name English</label><textarea id="' + key + 'fioDirectorEn"' +
				'class="form-control w100">' + item.fioen + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">ТАӘ Қазақша</label><textarea id="' + key + 'fioDirectorKz"' +
				'class="form-control w100">' + item.fiokz + '</textarea>' +
				'</div>' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">должность Русский</label><textarea id="' + key + 'postDirectorRu"' +
				'class="form-control w100">' + item.postru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">post English</label><textarea id="' + key + 'postDirectorEn"' +
				'class="form-control w100">' + item.posten + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">лауазымы Қазақша</label><textarea id="' + key + 'postDirectorKz"' +
				'class="form-control w100">' + item.postkz + '</textarea>' +
				'</div>' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Email</label><textarea id="' + key + 'emailDirector"' +
				'class="form-control w100">' + item.email + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Номер телефона</label><textarea id="' + key + 'numberDirector"' +
				'class="form-control w100">' + item.numberPhone + '</textarea>' +
				'</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateDirector(\'#' + key + 'fioDirectorRu\',\'#' + key + 'fioDirectorEn\',\'#' + key + 'fioDirectorKz\',\'#' + key + 'postDirectorRu\',\'#' + key + 'postDirectorEn\',\'#' + key + 'postDirectorKz\',\'#' + key + 'emailDirector\',\'#' + key + 'numberDirector\',\'' + key + 'imageDirector\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="delDirector(\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Удалить' +
				'</button>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}
function delDirector(id) {
	var infDelDirect = confirm("Вы уверены что хотите удалить запись?");
	if(infDelDirect)
	{
	var ref = database.ref("worker/" + id);
	// Удаляем запись
	ref.remove()
		.then(function () {
			 alert("Запись успешно удалена.");
			loadDirector('#certCard');
		})
		.catch(function (error) {
			console.error("Ошибка при удалении записи:", error);
		});
	}
}
function loadPodType(dv) {
	$(dv).html('');
	nmTp2 = localStorage.getItem("nameType2");
	nmTp = localStorage.getItem("nameType");
	console.log(nmTp2);
	database.ref('typeproduct/' + nmTp2 + '/podtype').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			$(dv).append(
				'<div class="card">' +
				'<div class="card-header">' +
				'<strong>Редактировать под тип продукта: </strong> ' + item.Titleru + ' ' +
				'<button type="button" class="btn btn-primary" onclick="scrit(\'' + key + 'crd\')"><i class="fa fa-bars"></i>Скрыть</button>' +
				'</div>' +
				'<div id="' + key + 'crd" style="display:none">' +
				'<div class="card-body card-block">' +
				'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="row form-group">' +
				'<div class="col col-md-3"><label for="select" class=" form-control-label">Тип продукта</label></div>' +
				'<div class="col-12 col-md-9">' +
				'<div class="dropdown">' +
				'<div class="dropdown-toggle2" onclick="toggleDropdown(\'.dropdown-menu2\')" >Выберите элемент</div>' +
				'<ul class="dropdown-menu2" id="' + key + 'select">' +
				'  ' +
				'</ul>' +
				'  </div>' +
				'</div>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Под тип на русском</label>' +
				'<textarea id="' + key + 'ProductType2Ru" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Под тип на англиском</label>' +
				'<textarea id="' + key + 'ProductType2En" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleen + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Под тип на казахском</label>' +
				'<textarea id="' + key + 'ProductType2Kz" class="form-control w100"' +
				'style="width: 90%;">' + item.Titlekz + '</textarea>' +
				'</div>' +
				'' +
				'</form>' +
				'<br>' +
				'' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateType2Product(\'#' + key + 'ProductType2Ru\',\'#' + key + 'ProductType2En\',\'#' + key + 'ProductType2Kz\',\'#' + key + 'select\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="delType2Product(\'' + nmTp2 + '\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Удалить' +
				'</button>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});

}

function updateType2Product(dv, dv2, dv3, kk, id) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const typeProduct = $(kk).val();
	kl = null, kl2 = null;
	if (localStorage.getItem('typeProductCash') !== null) {
		kl = localStorage.getItem('typeProductCash');
		var databaseRef = firebase.database().ref("typeproduct/" + kl + "/podtype/" + id);
		var randomKey = databaseRef.push().key;
		databaseRef.child(randomKey).set({
			Titleru: titleRu,
			Titleen: titleEn,
			Titlekz: titlekz,

		}).then(function () {
			// loadCert('#certCard');
			alert("File uploaded and saved to database!");
		}).catch(function (error) {
			alert("Error saving to database: " + error.message);
		});
	}
	else {
		alert("Выберите тип продукта");
	}
}

function loadVacans(dv) {
	$(dv).html('');
	database.ref('vacans').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			$(dv).append(
				'<div class="card">' +
				'<div class="card-header">' +
				'<h4>Редактировать вакансию: ' + item.Titleru + '</h4>' +
				'<button type="button" class="btn btn-primary" onclick="scrit(\'' + key + 'crd\')"><i class="fa fa-bars"></i>Скрыть</button>' +
				'</div>' +
				'<div id="' + key + 'crd">' +
				'<div class="card-body">' +
				'<div class="custom-tab">' +
				'<div class="tab-content pl-3 pt-2" id="nav-tabContent">' +
				'<!-- Русский -->' +
				'<div class="tab-pane fade active show" id="custom-nav-home" role="tabpanel"' +
				'aria-labelledby="custom-nav-home-tab">' +
				'<div class="card">' +
				'<div class="card-header">' +
				'<strong>Вакансия компании</strong> ' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на русском</label>' +
				'<textarea id="' + key + 'VacanTitleRu" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на англиском</label>' +
				'<textarea id="' + key + 'VacanTitleEn" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleen + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на казахском</label>' +
				'<textarea id="' + key + 'VacanTitleKz" class="form-control w100"' +
				'style="width: 90%;">' + item.Titlekz + '</textarea>' +
				'</div>' +
				'</form>' +
				'<br>' +
				'<div class="toolbar">' +
				'<a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				'<a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a>' +
				'<a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый"></a>' +
				'<a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				'<a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				'<a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				'<a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				'<a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				'<a href="#" class="toolbar-p" title="Параграф">p</a>' +
				'<a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				'<a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				'<a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				'<a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				'<a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				'<a href="#" class="toolbar-html" title="Вставить html">HTML</a>' +
				'<a href="#" class="toolbar-text" title="Вставить текст">Text</a>' +
				'<br>' +
				'<a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a>' +
				'<a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a>' +
				'<a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a>' +
				'<a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a>' +
				'<select class="toolbar-font">' +
				'<option selected="selected" disabled="disabled">Шрифт</option>' +
				'<option value="arial">Arial</option>' +
				'<option value="Courier New">Courier New</option>' +
				'<option value="georgia">Georgia</option>' +
				'<option value="impact">Impact</option>' +
				'<option value="roboto">Tahoma</option>' +
				'<option value="Times New Roman">Times New Roman</option>' +
				'<option value="verdana">Verdana</option>' +
				'</select>' +
				'<select class="toolbar-size">' +
				'<option selected="selected" disabled="disabled">Размер</option>' +
				'<option value="1">10px</option>' +
				'<option value="2">12px</option>' +
				'<option value="3">14px</option>' +
				'<option value="4">16px</option>' +
				'<option value="5">18px</option>' +
				'<option value="6">21px</option>' +
				'<option value="7">26px</option>' +
				'</select>' +
				'<span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000">' +
				'<span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00">' +
				'<br>' +
				'<a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a>' +
				'<a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a>' +
				'<a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a>' +
				'<a href="#" class="toolbar-selectAll">Выделить всё</a>' +
				'<a href="#" class="toolbar-removeFormat">Очистить стили</a>' +
				'<a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a>' +
				'<a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a>' +
				'</div>' +
				'<div class="editor" contenteditable="true" id="' + key + 'VacanTextRu">' + item.Opisanieru + '</div>' +
				'<div class="editor2" contenteditable="true" id="' + key + 'VacanTextEn">' + item.Opisanieen + '</div>' +
				'<div class="editor3" contenteditable="true" id="' + key + 'VacanTextKz">' + item.Opisaniekz + '</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateVacan(\'#' + key + 'VacanTitleRu\',\'#' + key + 'VacanTitleEn\',\'#' + key + 'VacanTitleKz\',\'#' + key + 'VacanTextRu\',\'#' + key + 'VacanTextEn\',\'#' + key + 'VacanTextKz\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'<button type="reset" class="btn btn-danger btn-sm"' +
				'onclick="delVacans(\'' + key + '\')">' +
				'<i class="fa fa-ban"></i> Удалить' +
				'</button>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}

function updateVacan(dv, dv2, dv3, dv4, dv5, dv6, kk) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");
	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();
	var databaseRef = firebase.database().ref("vacans/" + kk);
	var randomKey = databaseRef.push().key;
	databaseRef.child(randomKey).set({
		Titleru: titleRu,
		Titleen: titleEn,
		Titlekz: titlekz,
		Opisanieru: opisanieRu,
		Opisanieen: opisanieEn,
		Opisaniekz: opisanieKz,

	}).then(function () {
		// loadCert('#certCard');
		alert("File uploaded and saved to database!");
	}).catch(function (error) {
		alert("Error saving to database: " + error.message);
	});
}

function delVacans(id) {
	var ref = database.ref("vacans/" + id);
	// Удаляем запись
	ref.remove()
		.then(function () {
			console.log("Запись успешно удалена.");
			loadVacans('#fullVacan');
		})
		.catch(function (error) {
			console.error("Ошибка при удалении записи:", error);
		});
}
function delType2Product(kl, id) {
	var ref = database.ref("typeproduct/" + kl + "/podtype/" + id);
	// Удаляем запись
	ref.remove()
		.then(function () {
			console.log("Запись успешно удалена.");
			loadVacans('#fullVacan');
		})
		.catch(function (error) {
			console.error("Ошибка при удалении записи:", error);
		});
}
function loadFullProduct(dv) {
	$(dv).html('');
	database.ref('product').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			$(dv).append(
				'<div class="card">' +
				'<div class="card-header">' +
				'<strong>Редактировать продукт:</strong> ' + item.Titleru + ' ' +
				'<button type="button" class="btn btn-primary" onclick="scrit(\'' + key + 'crd\')"><i class="fa fa-bars"></i>Скрыть</button>' +
				'</div>' +
				'<div id="' + key + 'crd" style="display:none">' +
				'<div class="card-body card-block">' +
				'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="row form-group">' +
				'<div class="col col-md-3"><label for="select" class=" form-control-label">Тип' +
				'продукта</label></div>' +
				'<div class="col-12 col-md-9">' +
				'<div class="dropdown">' +
				'<div class="dropdown-toggle2"' +
				'onclick="toggleDropdown(\'.dropdown-menu2' + key.substr(-4, 2) + '\')">Выберите элемент</div>' +
				'<ul class="dropdown-menu2 dropdown-menu2' + key.substr(-4, 2) + '" id="' + key + 'select" style="display: none;">' +
				'</ul>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="row form-group">' +
				'<div class="col col-md-3"><label for="select" class=" form-control-label">Под' +
				'тип продукта</label></div>' +
				'<div class="col-12 col-md-9">' +
				'<div class="dropdown2' + key + '">' +
				'<div class="dropdown-toggle3' + key + '"' +
				'onclick="toggleDropdown(\'.dropdown-menu3' + key + '\')">Выберите элемент</div>' +
				'<ul class="dropdown-menu3 dropdown-menu3' + key + '" id="' + key + 'select2">' +
				'</ul>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<br>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на русском</label>' +
				'<textarea id="' + key + 'ProductTitleRu" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleru + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на англиском</label>' +
				'<textarea id="' + key + 'ProductTitleEn" class="form-control w100"' +
				'style="width: 90%;">' + item.Titleen + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 100%;"><label for="exampleInputName2"' +
				'class="pr-1  form-control-label">Заголовок на казахском</label>' +
				'<textarea id="' + key + 'ProductTitleKz" class="form-control w100"' +
				'style="width: 90%;">' + item.Titlekz + '</textarea>' +
				'</div>' +
				'<div class="form-group" style="width: 50%;">' +
				'<div class="form-group" style="width: 50%;">' +
				'<label for="exampleInputEmail2" class="px-1  form-control-label">Фото' +
				'продукта</label>' +
				'<input type="file" id="' + key + 'imageProduct" accept="image/*">' +
				'</div>' +
				'</div>' +
				'</form>' +
				'<br>' +
				'<div class="toolbar">' +
				'<a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				'<a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a>' +
				'<a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый"></a>' +
				'<a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				'<a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				'<a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				'<a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				'<a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				'<a href="#" class="toolbar-p" title="Параграф">p</a>' +
				'<a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				'<a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				'<a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				'<a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				'<a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				'<a href="#" class="toolbar-html" title="Вставить html">HTML</a>' +
				'<a href="#" class="toolbar-text" title="Вставить текст">Text</a>' +
				'<br>' +
				'<a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a>' +
				'<a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a>' +
				'<a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a>' +
				'<a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a>' +
				'<select class="toolbar-font">' +
				'<option selected="selected" disabled="disabled">Шрифт</option>' +
				'<option value="arial">Arial</option>' +
				'<option value="Courier New">Courier New</option>' +
				'<option value="georgia">Georgia</option>' +
				'<option value="impact">Impact</option>' +
				'<option value="roboto">Tahoma</option>' +
				'<option value="Times New Roman">Times New Roman</option>' +
				'<option value="verdana">Verdana</option>' +
				'</select>' +
				'<select class="toolbar-size">' +
				'<option selected="selected" disabled="disabled">Размер</option>' +
				'<option value="1">10px</option>' +
				'<option value="2">12px</option>' +
				'<option value="3">14px</option>' +
				'<option value="4">16px</option>' +
				'<option value="5">18px</option>' +
				'<option value="6">21px</option>' +
				'<option value="7">26px</option>' +
				'</select>' +
				'<span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000">' +
				'<span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00">' +
				'<br>' +
				'<a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a>' +
				'<a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a>' +
				'<a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a>' +
				'<a href="#" class="toolbar-selectAll">Выделить всё</a>' +
				'<a href="#" class="toolbar-removeFormat">Очистить стили</a>' +
				'<a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a>' +
				'<a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a>' +
				'</div>' +
				'<p> Описание на русском' +
				'<div class="editor" contenteditable="true" id="' + key + 'ProductTextRu">' + item.Opisanieru + '</div>' +
				'<p> Описание на англиском' +
				'<div class="editor2" contenteditable="true" id="' + key + 'ProductTextEn">' + item.Opisanieen + '</div>' +
				'<p> Описание на казахском' +
				'<div class="editor3" contenteditable="true" id="' + key + 'ProductTextKz">' + item.Opisaniekz + '</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="updateProduct(\'#' + key + 'ProductTitleRu\',\'#' + key + 'ProductTitleEn\',\'#' + key + 'ProductTitleKz\',\'#' + key + 'ProductTextRu\',\'#' + key + 'ProductTextEn\',\'#' + key + 'ProductTextKz\',\'#' + key + 'select\',\'' + key + 'imageProduct\',\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Сохранить' +
				'</button>' +
				'<button type="submit" class="btn btn-primary btn-sm"' +
				'onclick="delProduct(\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> Удалить' +
				'</button>' +
				'</div>' +
				'</div>' +
				'</div>');
			loadTypeProductSelect3('#' + key + 'select', '#' + key + 'select2');
		}

	});
}

function loadTypeProductSelect3(dv, dv2) {
	$(dv).html('');
	nameType = [];
	nameType2 = [];
	database.ref('typeproduct').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			nameType[key] = item.Titleru;
			var hasPotType = 'podtype' in item;
			if (hasPotType) {
				nameType2.push(key);
				$(dv).append('<li onclick="loadTypeProductSelect2(\'' + dv2 + '\',\'' + key + '\',\'' + item.Titleru + '\')">' + item.Titleru + '</li>');
			}
			else { $(dv).append('<li onclick="selectItem(\'' + item.Titleru + '\',\'.dropdown-toggle2\',\'.dropdown-menu2\',0,\'' + key + '\')">' + item.Titleru + '</li>'); }
		}
		//console.log(nameType);
		localStorage.setItem('nameType', nameType);
		localStorage.setItem('nameType2', nameType2);
	});

}

function updateProduct(dv, dv2, dv3, dv4, dv5, dv6, kk, ig, id) {
	const titleRu = $(dv).val().replace(/\n/g, "<br>");
	const titleEn = $(dv2).val().replace(/\n/g, "<br>");
	const titlekz = $(dv3).val().replace(/\n/g, "<br>");

	const opisanieRu = $(dv4).html();
	const opisanieEn = $(dv5).html();
	const opisanieKz = $(dv6).html();

	let pottypee =
	{
		pottyperu: $('#ProductType2eRu').html(),
		pottypeen: $('#ProductType2eEn').html(),
		pottypekz: $('#ProductType2eKz').html(),
	};

	var databaseRef = firebase.database().ref("product");
	var storageRef = firebase.storage().ref();
	var fileInput2 = document.getElementById(ig);
	var file2 = fileInput2.files[0];
	kl = null, kl2 = null;
	if (localStorage.getItem('typeProductCash') !== null) { kl = localStorage.getItem('typeProductCash'); }
	if (localStorage.getItem('type2ProductCash') !== null) { kl2 = localStorage.getItem('type2ProductCash'); }
	console.log(kl + ' | ' + kl2);
	if (file2) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("product/" + id + "/" + file2.name);
		// загружаем файл в Storage
		imageRef.put(file2).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// alert(url);
				// сохраняем путь в базе данных
				if (kl2 !== null) {
					databaseRef.child(id).set({
						imageUrl: url,
						Titleru: titleRu,
						Titleen: titleEn,
						Titlekz: titlekz,
						Opisanieru: opisanieRu,
						Opisanieen: opisanieEn,
						Opisaniekz: opisanieKz,
						typeProduct: kl,
						type2Product: kl2,

					}).then(function () {
						// loadCert('#certCard');
						alert("File uploaded and saved to database!");
					}).catch(function (error) {
						alert("Error saving to database: " + error.message);
					});
				}
				else {
					databaseRef.child(id).set({
						imageUrl: url,
						Titleru: titleRu,
						Titleen: titleEn,
						Titlekz: titlekz,
						Opisanieru: opisanieRu,
						Opisanieen: opisanieEn,
						Opisaniekz: opisanieKz,
						typeProduct: kl,

					}).then(function () {
						// loadCert('#certCard');
						alert("File uploaded and saved to database!");
					}).catch(function (error) {
						alert("Error saving to database: " + error.message);
					});
				}

			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}
	else {
		if (kl2 !== null) {
			databaseRef.child(id).set({
				Titleru: titleRu,
				Titleen: titleEn,
				Titlekz: titlekz,
				Opisanieru: opisanieRu,
				Opisanieen: opisanieEn,
				Opisaniekz: opisanieKz,
				typeProduct: kl,
				type2Product: kl2,

			}).then(function () {
				// loadCert('#certCard');
				alert("File uploaded and saved to database!");
			}).catch(function (error) {
				alert("Error saving to database: " + error.message);
			});
		}
		else {
			databaseRef.child(id).set({
				Titleru: titleRu,
				Titleen: titleEn,
				Titlekz: titlekz,
				Opisanieru: opisanieRu,
				Opisanieen: opisanieEn,
				Opisaniekz: opisanieKz,
				typeProduct: kl,

			}).then(function () {
				// loadCert('#certCard');
				alert("File uploaded and saved to database!");
			}).catch(function (error) {
				alert("Error saving to database: " + error.message);
			});
		}
	}
	loadFullProduct('#fullPrd');
}
function delVacans(id) {
	var ref = database.ref("vacans/" + id);
	// Удаляем запись
	ref.remove()
		.then(function () {
			console.log("Запись успешно удалена.");
			loadVacans('#fullVacan');
		})
		.catch(function (error) {
			console.error("Ошибка при удалении записи:", error);
		});
}

function succesAddVacans()
{
	//отчистить заголовкий
	$(VacanTitleRu).val('');
	$(VacanTitleEn).val('');
	$(VacanTitleKz).val('');
	//отчистить поля ввода
	$(VacanTextRu).html('Текст на русском');
	$(VacanTextEn).html('Текст на англиском');
	$(VacanTextKz).html('Текст на казахском');
}

function succesAddDirector()
{
	//отчистить ФИО
	$(fioDirectorRu).val('');
	$(fioDirectorEn).val('');
	$(fioDirectorKz).val('');
	//отчистить поля Должность
	$(postDirectorRu).val('');
	$(postDirectorEn).val('');
	$(postDirectorKz).val('');
	//отчистить поля email и телефон
	$(emailDirector).val('');
	$(fioDirectorEn).val('');
	$(numberDirector).val('');
	
}

