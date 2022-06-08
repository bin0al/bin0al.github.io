var baseCard = {};

var emptyCard = {"accentColor":"#000000","name":"","subname":"","stats":{"move":"0","march":"0","ap":"0","hp":"0"},"bloc":"","faction":"","armor":{"type":"Infantry","class":"1"},"abilities":[],"weapons":[]};

function generateJSON() {
	baseCard = {};
	baseCard.accentColor = document.getElementById("accentColor").value;
	baseCard.name = document.getElementById("unitName").value;
	baseCard.subname = document.getElementById("unitSubname").value;
	baseCard.stats = {};
	baseCard.stats.move = document.getElementById("unitMove").value;
	baseCard.stats.march = document.getElementById("unitMarch").value;
	baseCard.stats.ap = document.getElementById("unitAP").value;
	baseCard.stats.hp = document.getElementById("unitHP").value;
	baseCard.bloc = document.getElementById("unitBloc").value;
	baseCard.faction = document.getElementById("unitFaction").value;
	baseCard.armor = {};
	baseCard.armor.type = document.getElementById("unitArmorType").value;
	baseCard.armor.class = document.getElementById("unitArmorClass").value;
	baseCard.abilities = [];
	for (i=1;i<7;i++) {
		if (document.getElementById("ability"+i+"Enable").checked) {
			let tempAbility = {};
			tempAbility.name = document.getElementById("ability"+i+"Name").value;
			tempAbility.text = [];
			for (j=1;j<5;j++) {
				if (document.getElementById("ability"+i+"Line"+j).value) {
					console.log(document.getElementById("ability"+i+"Line"+j).value.length);
					tempAbility.text.push(document.getElementById("ability"+i+"Line"+j).value)
				}
			}
			baseCard.abilities.push(tempAbility);
		}
	};
	baseCard.weapons = [];
	for (k=1;k<8;k++) {
		if (document.getElementById("weapon"+k+"Enable").checked) {
			let tempWeapon = {};
			tempWeapon.count = document.getElementById("weapon"+k+"Count").value;
			tempWeapon.name = document.getElementById("weapon"+k+"Name").value;
			tempWeapon.range = document.getElementById("weapon"+k+"Range").value;
			tempWeapon.ammo = document.getElementById("weapon"+k+"Ammo").value;
			tempWeapon.direction = document.getElementById("weapon"+k+"Direction").value;
			tempWeapon.damage = {};
			tempWeapon.damage.infantry1 = document.getElementById("weapon"+k+"I1").value;
			tempWeapon.damage.infantry2 = document.getElementById("weapon"+k+"I2").value;
			tempWeapon.damage.infantry3 = document.getElementById("weapon"+k+"I3").value;
			tempWeapon.damage.infantry4 = document.getElementById("weapon"+k+"I4").value;
			tempWeapon.damage.vehicle1 = document.getElementById("weapon"+k+"V1").value;
			tempWeapon.damage.vehicle2 = document.getElementById("weapon"+k+"V2").value;
			tempWeapon.damage.vehicle3 = document.getElementById("weapon"+k+"V3").value;
			tempWeapon.damage.vehicle4 = document.getElementById("weapon"+k+"V4").value;
			tempWeapon.damage.vehicle5 = document.getElementById("weapon"+k+"V5").value;
			tempWeapon.damage.vehicle6 = document.getElementById("weapon"+k+"V6").value;
			tempWeapon.damage.vehicle7 = document.getElementById("weapon"+k+"V7").value;
			tempWeapon.damage.aircraft1 = document.getElementById("weapon"+k+"A1").value;
			tempWeapon.damage.aircraft2 = document.getElementById("weapon"+k+"A2").value;
			tempWeapon.damage.aircraft3 = document.getElementById("weapon"+k+"A3").value;
			baseCard.weapons.push(tempWeapon);
		}
	};
};

function populateFields (jsonData) {
	document.getElementById("accentColor").value = jsonData.accentColor;
	document.getElementById("unitName").value = jsonData.name;
	document.getElementById("unitSubname").value = jsonData.subname;
	document.getElementById("unitMove").value = jsonData.stats.move;
	document.getElementById("unitMarch").value = jsonData.stats.march;
	document.getElementById("unitAP").value = jsonData.stats.ap;
	document.getElementById("unitHP").value = jsonData.stats.hp;
	document.getElementById("unitBloc").value = jsonData.bloc;
	document.getElementById("unitFaction").value = jsonData.faction;
	document.getElementById("unitArmorType").value = jsonData.armor.type;
	document.getElementById("unitArmorClass").value = jsonData.armor.class;
	for (i=1;i<7;i++) {
		if (jsonData.abilities[i-1]) {
			document.getElementById("ability"+i+"Name").value = jsonData.abilities[i-1].name;
			document.getElementById("ability"+i+"Enable").checked = true;
			for (j=1;j<5;j++) {
				if (jsonData.abilities[i-1].text[j-1]) {
					document.getElementById("ability"+i+"Line"+j).value = jsonData.abilities[i-1].text[j-1];
				} else {
					document.getElementById("ability"+i+"Line"+j).value = "";
				}
			};
		} else {
			document.getElementById("ability"+i+"Name").value = "";
			document.getElementById("ability"+i+"Enable").checked = false;
			document.getElementById("ability"+i+"Line"+1).value = "";
			document.getElementById("ability"+i+"Line"+2).value = "";
			document.getElementById("ability"+i+"Line"+3).value = "";
			document.getElementById("ability"+i+"Line"+4).value = "";
		};
	};
	for (k=1;k<8;k++) {
		if (jsonData.weapons[k-1]) {
			document.getElementById("weapon"+k+"Enable").checked = true;
			document.getElementById("weapon"+k+"Count").value = jsonData.weapons[k-1].count;
			document.getElementById("weapon"+k+"Name").value = jsonData.weapons[k-1].name;
			document.getElementById("weapon"+k+"Range").value = jsonData.weapons[k-1].range;
			document.getElementById("weapon"+k+"Ammo").value = jsonData.weapons[k-1].ammo;
			document.getElementById("weapon"+k+"Direction").value = jsonData.weapons[k-1].direction;
			document.getElementById("weapon"+k+"I1").value = jsonData.weapons[k-1].damage.infantry1;
			document.getElementById("weapon"+k+"I2").value = jsonData.weapons[k-1].damage.infantry2;
			document.getElementById("weapon"+k+"I3").value = jsonData.weapons[k-1].damage.infantry3;
			document.getElementById("weapon"+k+"I4").value = jsonData.weapons[k-1].damage.infantry4;
			document.getElementById("weapon"+k+"V1").value = jsonData.weapons[k-1].damage.vehicle1;
			document.getElementById("weapon"+k+"V2").value = jsonData.weapons[k-1].damage.vehicle2;
			document.getElementById("weapon"+k+"V3").value = jsonData.weapons[k-1].damage.vehicle3;
			document.getElementById("weapon"+k+"V4").value = jsonData.weapons[k-1].damage.vehicle4;
			document.getElementById("weapon"+k+"V5").value = jsonData.weapons[k-1].damage.vehicle5;
			document.getElementById("weapon"+k+"V6").value = jsonData.weapons[k-1].damage.vehicle6;
			document.getElementById("weapon"+k+"V7").value = jsonData.weapons[k-1].damage.vehicle7;
			document.getElementById("weapon"+k+"A1").value = jsonData.weapons[k-1].damage.aircraft1;
			document.getElementById("weapon"+k+"A2").value = jsonData.weapons[k-1].damage.aircraft2;
			document.getElementById("weapon"+k+"A3").value = jsonData.weapons[k-1].damage.aircraft3;
		} else {
			document.getElementById("weapon"+k+"Enable").checked = false;
			document.getElementById("weapon"+k+"Count").value = "";
			document.getElementById("weapon"+k+"Name").value = "";
			document.getElementById("weapon"+k+"Range").value = "";
			document.getElementById("weapon"+k+"Ammo").value = "";
			document.getElementById("weapon"+k+"Direction").value = "";
			document.getElementById("weapon"+k+"I1").value = "";
			document.getElementById("weapon"+k+"I2").value = "";
			document.getElementById("weapon"+k+"I3").value = "";
			document.getElementById("weapon"+k+"I4").value = "";
			document.getElementById("weapon"+k+"V1").value = "";
			document.getElementById("weapon"+k+"V2").value = "";
			document.getElementById("weapon"+k+"V3").value = "";
			document.getElementById("weapon"+k+"V4").value = "";
			document.getElementById("weapon"+k+"V5").value = "";
			document.getElementById("weapon"+k+"V6").value = "";
			document.getElementById("weapon"+k+"V7").value = "";
			document.getElementById("weapon"+k+"A1").value = "";
			document.getElementById("weapon"+k+"A2").value = "";
			document.getElementById("weapon"+k+"A3").value = "";
		};
	};
};

function importJSON() {
	var files = document.getElementById('jsonFile').files;
	console.log(files);
	if (files.length <= 0) {return false;}
	var fr = new FileReader();
	fr.onload = function(e) {
		console.log(e);
		var result = JSON.parse(e.target.result);
		console.log(result);
		populateFields(result);
	}
	fr.readAsText(files.item(0));
}

function replaceToSymbol(inString) {
	let workingString = inString;
	workingString = workingString.replaceAll('[K]', 'ſ');
	workingString = workingString.replaceAll('[B]', 'ƀ');
	workingString = workingString.replaceAll('[F]', 'Ɓ');
	workingString = workingString.replaceAll('[C]', 'Ƃ');
	workingString = workingString.replaceAll('[S]', 'ƃ');
	workingString = workingString.replaceAll('[D]', 'Ƅ');
	workingString = workingString.replaceAll('[T]', 'ƅ');
	workingString = workingString.replaceAll('[Q]', 'Ɔ');
	return workingString;
};

function replaceToChar(inString) {
	let workingString = inString;
	workingString = workingString.replaceAll('ſ', '[K]');
	workingString = workingString.replaceAll('ƀ', '[B]');
	workingString = workingString.replaceAll('Ɓ', '[F]');
	workingString = workingString.replaceAll('Ƃ', '[C]');
	workingString = workingString.replaceAll('ƃ', '[S]');
	workingString = workingString.replaceAll('Ƅ', '[D]');
	workingString = workingString.replaceAll('ƅ', '[T]');
	workingString = workingString.replaceAll('Ɔ', '[Q]');
	return workingString;
};

function imageSuccess() {
	alert("Image Loaded!");
}

function imageFail() {
	alert("Image Upload Failed!");
}

var modelImg = new Image();
document.getElementById('imageUpload').onchange = function (e) {
	modelImg.onload = imageSuccess;
	modelImg.onerror = imageFail;
	modelImg.src = URL.createObjectURL(this.files[0]);
}

const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "bold 40px ImpactCustom";
ctx.fillText("Loading Font", 0, 0);
ctx.font = "bold 40px HelveticaCustom";
ctx.fillText("Loading Font", 0, 0);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 1000)
function generateCard() {
	generateJSON();
	baseCard = JSON.parse(replaceToSymbol(JSON.stringify(baseCard)));
	switch (baseCard.armor.type) {
		case 'Infantry':
			var combinedBase = document.getElementById("combinedBaseInfantry");
			break;
		case 'Vehicle':
			var combinedBase = document.getElementById("combinedBaseVehicle");
			break;
		case 'Aircraft':
			var combinedBase = document.getElementById("combinedBaseAircraft");
			break;
		default:
			var combinedBase = document.getElementById("combinedBaseInfantry");
	}
	ctx.fillStyle = baseCard.accentColor;
	ctx.fillRect(0, 0, 1000, 1000);
	ctx.fillStyle = "#984d40";
	ctx.fillRect(601, 891, 374, 53);
	ctx.fillRect(45, 126, 42, 32);
	ctx.fillRect(58, 897, 42, 44);
	ctx.fillStyle = baseCard.accentColor;
	ctx.drawImage(combinedBase, 0, 0);
	if (baseCard.stats.hp == 0) { ctx.fillRect(40, 880, 144, 76) }
	else {
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.font = "bold 40px ImpactCustom";
		ctx.fillText(baseCard.stats.hp, 125, 935);
	}
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.font = "bold 40px ImpactCustom";
	ctx.fillText(baseCard.stats.ap, 67, 120);
	ctx.font = "bold 30px ImpactCustom";
	ctx.fillText(baseCard.name, 210, 415);
	ctx.font = "bold 20px HelveticaCustom";
	ctx.fillText(baseCard.subname, 210, 460);
	ctx.font = "bold 40px ImpactCustom";
	ctx.fillText(baseCard.stats.move, 676, 935);
	ctx.font = "bold 40px ImpactCustom";
	ctx.fillText(baseCard.stats.march, 813, 935);
	ctx.font = "bold 40px ImpactCustom";
	ctx.fillText(baseCard.armor.class, 950, 935);
	let abilityY = 70;
	let abilityInc = 20;
	let abilityIncLg = 10;
	ctx.textAlign = "left";
	baseCard.abilities.forEach(element => {
		abilityY = abilityY + abilityIncLg;
		ctx.font = "20px ImpactCustom";
		ctx.fillText("- " + element.name + " -", 530, abilityY);
		abilityY = abilityY + abilityInc;
		element.text.forEach(element => {
			ctx.font = "bold 16px HelveticaCustom";
			ctx.fillText(element, 530, abilityY);
			abilityY = abilityY + abilityInc;
		})
	})

	let weaponInc = 37;
	let weaponHeight = 641;
	let lineCount = 0;
	baseCard.weapons.forEach(element => {
		if (lineCount % 2 == 0) {
			ctx.fillStyle = baseCard.accentColor;
			ctx.globalAlpha = 0.4;
			ctx.fillRect(18, weaponHeight - weaponInc + 10, 965, weaponInc);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "black";
		}
		lineCount++;
		switch (element.direction) {
			case "N/A":
				break;
			case "Forward":
				ctx.drawImage(document.getElementById("ArcFront"), 925, weaponHeight-26);
				break;
			case "Left":
				ctx.drawImage(document.getElementById("ArcLeft"), 925, weaponHeight-26);
				break;
			case "Right":
				ctx.drawImage(document.getElementById("ArcRight"), 925, weaponHeight-26);
				break;
			case "Backward":
				ctx.drawImage(document.getElementById("ArcRear"), 925, weaponHeight-26);
				break;
			case "Turret":
				ctx.drawImage(document.getElementById("ArcTurret"), 925, weaponHeight-26);
				break;
		}
		for (l = 0; l<element.ammo; l++) {
			if (l%2) {
				ctx.drawImage(document.getElementById("AmmoIcon"), 305 - (l*4), weaponHeight-7)
			} else {
				ctx.drawImage(document.getElementById("AmmoIcon"), 305 - (l*4), weaponHeight-22)
			}
		}
		ctx.textAlign = "left";
		ctx.font = "bold 20px HelveticaCustom";
		ctx.fillText(element.count + "x " + element.name, 30, weaponHeight);
		ctx.textAlign = "center";
		ctx.fillText(element.range, 336, weaponHeight);
		ctx.fillText(element.damage.infantry1, 377, weaponHeight);
		ctx.fillText(element.damage.infantry2, 416, weaponHeight);
		ctx.fillText(element.damage.infantry3, 454, weaponHeight);
		ctx.fillText(element.damage.infantry4, 494, weaponHeight);
		ctx.fillText(element.damage.vehicle1, 533, weaponHeight);
		ctx.fillText(element.damage.vehicle2, 572, weaponHeight);
		ctx.fillText(element.damage.vehicle3, 610, weaponHeight);
		ctx.fillText(element.damage.vehicle4, 649, weaponHeight);
		ctx.fillText(element.damage.vehicle5, 688, weaponHeight);
		ctx.fillText(element.damage.vehicle6, 727, weaponHeight);
		ctx.fillText(element.damage.vehicle7, 764, weaponHeight);
		ctx.fillText(element.damage.aircraft1, 805, weaponHeight);
		ctx.fillText(element.damage.aircraft2, 845, weaponHeight);
		ctx.fillText(element.damage.aircraft3, 884, weaponHeight);
		weaponHeight = weaponHeight + weaponInc;
	})
	const imgCanvas = document.getElementById("imageCanvas");
	const imgCtx = imgCanvas.getContext("2d");
	var imageMask = document.getElementById("imageMask");
	imgCtx.drawImage(imageMask, 0, 0);
	imgCtx.globalCompositeOperation = 'source-in';
	imgCtx.drawImage(modelImg, 0, 0);
	ctx.drawImage(imgCanvas, 41, 44);
	baseCard = JSON.parse(replaceToChar(JSON.stringify(baseCard)));
};

function exportJsonFile () {
	generateJSON();
	var fileToSave = new Blob([JSON.stringify(baseCard)], {
		type: 'application/json',
		name: baseCard.name
	});
	saveAs(fileToSave, baseCard.name);
	console.log("Hopefully data was saved?");
}