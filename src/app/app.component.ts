import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Primera vez que se configura
  private initial = true;
  // Controla el nivel de agua alto
  // Genera alarmas de nivel alto de agua.
  public alarmHighLevelConfig = 90;
  public maxHighLevel = 100;
  public showAlertHigh = true;
  // Controla el nivel de agua bajo
  // Genera alarmas de nivel bajo de agua.
  public alarmLowLevelConfig = 10;
  public maxLowLevel = 1;
  public showAlertLow = true;


  public lts: number = 55;
  public ltsWater: string = '55%';
  public fldPoint: number = 0;

  ngOnInit() {
    //this.configControls();
  }

  // Agrega un litro de agua al tanque
  increment() {
    if (this.lts + 1 == this.maxHighLevel + 1) {
      return;
    }
    this.lts ++;
    this.ltsWater = (this.lts * 100) / this.maxHighLevel + '%';
    //this.systemDetect();
  }

  // Resta un Litro de agua al tanque
  decrement() {
    if (this.lts - 1 == this.maxLowLevel - 1) {
      return;
    }
    this.lts --;
    this.ltsWater = (this.lts * 100 ) / this.maxHighLevel + '%';
    //this.systemDetect();
  }

  // Llena el tanque de agua al valor de listros indicado
  setLts() {
    if (!/^([0-9])*$/.test(this.fldPoint + '')) {
      alert("Debe ingresar un Valor numerico");
      return;
    }
    if (this.fldPoint < this.maxLowLevel || this.fldPoint > this.maxHighLevel) {
      this.fldPoint = this.maxLowLevel;
      return;
    }
    if (this.fldPoint == undefined || this.fldPoint == null) {
      this.drain();
      this.fldPoint = this.maxLowLevel;
      return;
    }
    this.lts = this.fldPoint;
    this.ltsWater = (this.fldPoint * 100 ) / this.maxHighLevel + '%';
    this.fldPoint = this.maxLowLevel;
    //this.systemDetect();
  }

  // Drena el tanque de agua totalmente
  drain() {
    let x = confirm("¿ Seguro que Desea Drenar el Tanque?");
    if (x == false) {
      return;
    } else {
      this.lts = this.maxLowLevel;
      this.ltsWater = this.maxLowLevel + '%';
    }
    //this.systemDetect();
  }

  // // Sistema de detección de alarmas
  // systemDetect() {
  //   if (parseInt(lbl_lts.innerHTML) >= alarmHighLevelConfig) {
  //     this.alarmHighLevel();
  //   }
  //   if (parseInt(lbl_lts.innerHTML) < alarmHighLevelConfig &&
  //   parseInt(lbl_lts.innerHTML) > alarmLowLevelConfig) {
  //     this.alarmNormalLevel();
  //   }
  //   if (parseInt(lbl_lts.innerHTML) <= alarmLowLevelConfig) {
  //     this.alarmLowLevel();
  //   }
  // }

  // // Cambia el color del liquido a rojo cuando esta muy alto
  // alarmHighLevel() {
  //   val_levelWater.style.backgroundColor = '#ff3600'
  //   if (showAlertHigh) {
  //     alert("El nivel de Agua es muy alto!!");
  //     showAlertHigh = false;
  //     showAlertLow = true;
  //   }
  
  // }

  // // Cambia el color del liquido a azul cuando esta normal
  // alarmNormalLevel() {
  //   val_levelWater.style.backgroundColor = '#0000ff'
  //   showAlertLow = true;
  //   showAlertHigh = true;
  // }

  // // cambia el color del liquido a amarillo cuando esta muy bajo
  // alarmLowLevel() {
  //   val_levelWater.style.backgroundColor = '#f4ff00'
  //   if (showAlertLow) {
  //     alert("El nivel de Agua es muy bajo!!");
  //     showAlertHigh = true;
  //     showAlertLow = false;
  //   }
  // }

  // // Permite configurar el sistema
  // configControls() {
  //   if (initial) {
  //     fld_max_level.value = maxHighLevel;
  //     fld_min_level.value = maxLowLevel;
  //     fld_high_level.value = alarmHighLevelConfig;
  //     fld_low_level.value = alarmLowLevelConfig;
  //     initial = false;
  //   } else {
  //     maxHighLevel = parseInt(fld_max_level.value);
  //     maxLowLevel = parseInt(fld_min_level.value);
  //     alarmHighLevelConfig = fld_high_level.value;
  //     alarmLowLevelConfig = fld_low_level.value;
  //   }
  //   fld_point.setAttribute('max', maxHighLevel);
  //   this.systemDetect();
  // }
}
