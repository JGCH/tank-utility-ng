console.log("TANK UTILITIES APPLICATION");

// Primera vez que se configura
let initial = true;

// Controla el nivel de agua alto
// Genera alarmas de nivel alto de agua.
let alarmHighLevelConfig = 90;
let maxHighLevel = 100;
let showAlertHigh = true;

// Controla el nivel de agua bajo
// Genera alarmas de nivel bajo de agua.
let alarmLowLevelConfig = 10;
let maxLowLevel = 1;
let showAlertLow = true;

// Controles de la interfaz de usuario
let lbl_lts = window.document.getElementById('lbl_lts');
let fld_point = window.document.getElementById('fld_point');
let fld_max_level = window.document.getElementById('fld_max_level');
let fld_min_level = window.document.getElementById('fld_min_level');
let fld_high_level = window.document.getElementById('fld_high_level');
let fld_low_level = window.document.getElementById('fld_low_level');
let val_levelWater = window.document.getElementById('level_water');
let btn_increment = window.document.getElementById('btn_increment');
let btn_decrement = window.document.getElementById('btn_decrement');
let btn_point = window.document.getElementById('btn_point');
let btn_drain = window.document.getElementById('btn_drain');
let btn_config = window.document.getElementById('btn_config');

// Creación de eventos
this.btn_point.addEventListener('click', setLts);
this.btn_drain.addEventListener('click', drain);
this.btn_increment.addEventListener('click', increment);
this.btn_decrement.addEventListener('click', decrement);
this.btn_config.addEventListener('click', configControls);

// Agrega un litro de agua al tanque
function increment() {
  if (parseInt(lbl_lts.innerHTML) + 1 == maxHighLevel + 1) {
    return;
  }
  lbl_lts.innerHTML = parseInt(lbl_lts.innerHTML) + 1;
  val_levelWater.style.height = ((parseInt(lbl_lts.innerHTML) + 1) * 100) / maxHighLevel + '%';
  systemDetect();
}

// Resta un Litro de agua al tanque
function decrement() {
  if (parseInt(lbl_lts.innerHTML) - 1 == maxLowLevel - 1) {
    return;
  }
  lbl_lts.innerHTML = parseInt(lbl_lts.innerHTML) - 1;
  val_levelWater.style.height = ((parseInt(lbl_lts.innerHTML) - 1) * 100 ) / maxHighLevel + '%';
  systemDetect();
}

// Llena el tanque de agua al valor de listros indicado
function setLts() {
  if (!/^([0-9])*$/.test(parseInt(fld_point.value))) {
    alert("Debe ingresar un Valor numerico");
    return;
  }
  if (parseInt(fld_point.value) < maxLowLevel || parseInt(fld_point.value) > maxHighLevel) {
    fld_point.value = maxLowLevel;
    return;
  }
  if (parseInt(fld_point.value) == undefined || parseInt(fld_point.value) == null || fld_point.value == '') {
    drain();
    fld_point.value = maxLowLevel;
    return;
  }
  lbl_lts.innerHTML = fld_point.value;
  val_levelWater.style.height = (fld_point.value * 100 ) / maxHighLevel + '%';
  fld_point.value = maxLowLevel;
  systemDetect();
}

// Drena el tanque de agua totalmente
function drain() {
  var x = confirm("¿ Seguro que Desea Drenar el Tanque?");
  if (x == false) {
    return;
  } else {
    lbl_lts.innerHTML = maxLowLevel;
    val_levelWater.style.height = maxLowLevel + '%';
  }
  systemDetect();
}

// Sistema de detección de alarmas
function systemDetect() {
  if (parseInt(lbl_lts.innerHTML) >= alarmHighLevelConfig) {
    alarmHighLevel();
  }
  if (parseInt(lbl_lts.innerHTML) < alarmHighLevelConfig &&
  parseInt(lbl_lts.innerHTML) > alarmLowLevelConfig) {
    alarmNormalLevel();
  }
  if (parseInt(lbl_lts.innerHTML) <= alarmLowLevelConfig) {
    alarmLowLevel();
  }
}

// Cambia el color del liquido a rojo cuando esta muy alto
function alarmHighLevel() {
  val_levelWater.style.backgroundColor = '#ff3600'
  if (showAlertHigh) {
    alert("El nivel de Agua es muy alto!!");
    showAlertHigh = false;
    showAlertLow = true;
  }
 
}

// Cambia el color del liquido a azul cuando esta normal
function alarmNormalLevel() {
  val_levelWater.style.backgroundColor = '#0000ff'
  showAlertLow = true;
  showAlertHigh = true;
}

// cambia el color del liquido a amarillo cuando esta muy bajo
function alarmLowLevel() {
  val_levelWater.style.backgroundColor = '#f4ff00'
  if (showAlertLow) {
    alert("El nivel de Agua es muy bajo!!");
    showAlertHigh = true;
    showAlertLow = false;
  }
}

// Permite configurar el sistema
function configControls() {
  if (initial) {
    fld_max_level.value = maxHighLevel;
    fld_min_level.value = maxLowLevel;
    fld_high_level.value = alarmHighLevelConfig;
    fld_low_level.value = alarmLowLevelConfig;
    initial = false;
  } else {
    maxHighLevel = parseInt(fld_max_level.value);
    maxLowLevel = parseInt(fld_min_level.value);
    alarmHighLevelConfig = fld_high_level.value;
    alarmLowLevelConfig = fld_low_level.value;
  }
  fld_point.setAttribute('max', maxHighLevel);
  systemDetect();
}

configControls();