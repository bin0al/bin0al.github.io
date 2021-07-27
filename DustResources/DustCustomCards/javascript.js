var baseCard = {};

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

function importJSON () {

};

function replaceToSymbol(inString) {
	let workingString = inString;
	workingString = workingString.replaceAll('[K]', 'ſ');
	workingString = workingString.replaceAll('[B]', 'ƀ');
	workingString = workingString.replaceAll('[F]', 'Ɓ');
	workingString = workingString.replaceAll('[C]', 'Ƃ');
	workingString = workingString.replaceAll('[S]', 'ƃ');
	return workingString;
};

function replaceToChar(inString) {
	let workingString = inString;
	workingString = workingString.replaceAll('ſ', '[K]');
	workingString = workingString.replaceAll('ƀ', '[B]');
	workingString = workingString.replaceAll('Ɓ', '[F]');
	workingString = workingString.replaceAll('Ƃ', '[C]');
	workingString = workingString.replaceAll('ƃ', '[S]');
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
		ctx.textAlign = "left";
		ctx.font = "bold 20px HelveticaCustom";
		ctx.fillText(element.count + "x " + element.name, 90, weaponHeight);
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
		const imgCanvas = document.getElementById("imageCanvas");
		const imgCtx = imgCanvas.getContext("2d");
		var imageMask = document.getElementById("imageMask");
		imgCtx.drawImage(imageMask, 0, 0);
		imgCtx.globalCompositeOperation = 'source-in';
		imgCtx.drawImage(modelImg, 0, 0);
		ctx.drawImage(imgCanvas, 41, 44);
	})
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