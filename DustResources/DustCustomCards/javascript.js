const imageInput = document.getElementById("inImageSubmission");

function updateImage () {
	const curImage = imageInput.files[0];
	const imgElem = document.getElementById("miniPic");
	imgElem.src = URL.createObjectURL(curImage);
}

function updateText() {
	const titleInput = document.getElementById("cardTitleInput");
	const subtitleInput = document.getElementById("cardSubtitleInput");
	const ability1TitleInput = document.getElementById("ability1TitleInput");
	const ability1TextInput = document.getElementById("ability1TextInput");
	const ability2TitleInput = document.getElementById("ability2TitleInput");
	const ability2TextInput = document.getElementById("ability2TextInput");
	const ability3TitleInput = document.getElementById("ability3TitleInput");
	const ability3TextInput = document.getElementById("ability3TextInput");
	const ability4TitleInput = document.getElementById("ability4TitleInput");
	const ability4TextInput = document.getElementById("ability4TextInput");
	
	document.getElementById("cardTitle").innerHTML = titleInput.value;
	document.getElementById("cardSubtitle").innerHTML = subtitleInput.value;
	document.getElementById("ability1Title").innerHTML = ability1TitleInput.value;
	document.getElementById("ability1Text").innerHTML = ability1TextInput.value;
	document.getElementById("ability2Title").innerHTML = ability2TitleInput.value;
	document.getElementById("ability2Text").innerHTML = ability2TextInput.value;
	document.getElementById("ability3Title").innerHTML = ability3TitleInput.value;
	document.getElementById("ability3Text").innerHTML = ability3TextInput.value;
	document.getElementById("ability4Title").innerHTML = ability4TitleInput.value;
	document.getElementById("ability4Text").innerHTML = ability4TextInput.value;
}