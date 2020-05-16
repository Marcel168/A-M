import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent } from 'ng-gantt';
import { SemeService } from '../seme.service';
import { Semina } from '../semina';
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  semine: Semina[];
  minDate = new Date(new Date().getFullYear(), 0, 1);
  maxDate = new Date(new Date().getFullYear(), 11, 31);

  public editorOptions: any = {};
  public data: any;
  public data2: any;

  vUseSingleCell = '0';
  vShowRes = '0';
  vShowCost = '0';
  vShowComp = '0';
  vShowDur = '0';
  vShowStartDate = '0';
  vShowEndDate = '0';
  vShowPlanStartDate = '0';
  vShowPlanEndDate = '0';
  vShowEndWeekDate = '0';
  vShowTaskInfoLink = '0';
  vDebug = 'false';
  vEditable = 'false';
  vUseSort = 'false';
  vLang = 'en';
  delay = 150;

  @ViewChild('editor', { static: true }) editor: GanttEditorComponent;
  @ViewChild('editorTwo', { static: true }) editorTwo: GanttEditorComponent;
  @ViewChild('myDatePicker') picker: MatDatepicker<Date>;
  @ViewChild('myDatePicker1') picker1: MatDatepicker<Date>;

  constructor(private semeService: SemeService) { }

  ngOnInit() {
    this.getSemine();



    const vAdditionalHeaders = {
    };

    this.editorOptions = {
      vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 36,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      vLang: this.vLang,
      vUseSingleCell: this.vUseSingleCell,
      vShowRes: parseInt(this.vShowRes, 10),
      vShowCost: parseInt(this.vShowCost, 10),
      vShowComp: parseInt(this.vShowComp, 10),
      vShowDur: parseInt(this.vShowDur, 10),
      vShowStartDate: parseInt(this.vShowStartDate, 10),
      vShowEndDate: parseInt(this.vShowEndDate, 10),
      vShowPlanStartDate: parseInt(this.vShowPlanStartDate, 10),
      vShowPlanEndDate: parseInt(this.vShowPlanEndDate, 10),
      vShowTaskInfoLink: parseInt(this.vShowTaskInfoLink, 10), // Show link in tool tip (0/1)
      // Show/Hide the date for the last day of the week in header for daily view (1/0)
      vShowEndWeekDate: parseInt(this.vShowEndWeekDate, 10),
      vAdditionalHeaders: vAdditionalHeaders,
      vEvents: {
        taskname: console.log,
        res: console.log,
        dur: console.log,
        comp: console.log,
        start: console.log,
        end: console.log,
        planstart: console.log,
        planend: console.log,
        cost: console.log
      },
      vEventsChange: {
        taskname: this.editValue.bind(this, this.data),
        res: this.editValue.bind(this, this.data),
        dur: this.editValue.bind(this, this.data),
        comp: this.editValue.bind(this, this.data),
        start: this.editValue.bind(this, this.data),
        end: this.editValue.bind(this, this.data),
        planstart: this.editValue.bind(this, this.data),
        planend: this.editValue.bind(this, this.data),
        cost: this.editValue.bind(this, this.data)
      },
      vEventClickRow: console.log,
      vTooltipDelay: this.delay,
      vDebug: this.vDebug === 'true',
      vEditable: this.vEditable === 'true',
      vUseSort: this.vUseSort === 'true',
      vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      vFormat: 'day'
    };
    this.editor.setOptions(this.editorOptions);
    // this.editorOptions.onChange = this.change.bind(this);
  }

  showPicker(): void {
    this.picker.open();
  }

  showPicker1(): void {
    this.picker1.open();
  }

  getSemine() {
    this.semeService.getSemine()
      .subscribe(semine => this.setMinMax(semine));
  }

  /*this.semeService.getSemine()
  .subscribe(semine => { this.data = this.initialData(semine) });*/

  editValue(list, task, event, cell, column) {
    // tslint:disable-next-line:triple-equals
    const found = list.find(item => item.pID == task.getOriginalID());
    if (!found) {
      return;
    } else {
      found[column] = event ? event.target.value : '';
    }
    console.log(found);
  }

  change() {
    console.log('change:', this.editor);
    console.log('change2:', this.editorTwo);
  }

  setLanguage(lang) {
    this.editorOptions.vLang = lang;
    this.editor.setOptions(this.editorOptions);
  }

  customLanguage() {
    // this.editorOptions.languages = {
    //   'pt-BR': {
    //     'auto': 'Automático testing'
    //   },
    //   'en': {
    //     'auto': 'Auto testing'
    //   }
    // };
    this.editor.setOptions(this.editorOptions);
  }

  changeObject() {
    this.data.randomNumber = Math.random() * 100;
  }

  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.random() * 100 });
  }

  /**
   * Example on how get the json changed from the jsgantt
   */
  getData() {
    // const changedGantt = this.editor.get();
    // console.log(changedGantt);
  }

  clear() {
    const g = this.editor.getEditor();
    g.ClearTasks();
    g.Draw()
  }

  setMinMax(semine) {
    var appoMin, appoMax, dataInizio, dataFine;
    for (var i = 0; i < semine.length; i++) {
      dataInizio = new Date(semine[i].inizio);
      dataFine = new Date(semine[i].fine);
      if (i == 0) {
        appoMin = new Date(dataInizio);
        appoMax = new Date(dataFine);
      } else {
        if (dataInizio < appoMin)
          appoMin = new Date(dataInizio);
        if (dataFine > appoMax)
          appoMax = new Date(dataFine);
      }
    }
    this.minDate = new Date(appoMin);
    this.maxDate = new Date(appoMax);
  }

  createGantt(dataInizio: any, dataFine: any){
    if (!dataInizio || !dataFine) { alert('Operazione fallita: Dati mancanti'); return; }
    var date: string[] = [dataInizio, dataFine];
    this.semeService.getSemineCon(date).subscribe(semine => this.initialData(semine));
  }

  showAll(){
    if (!this.minDate || !this.maxDate) { alert('Operazione fallita: Semine non presenti'); return; }
    var date: string[] = [this.minDate+'', this.maxDate+''];
    this.semeService.getSemineCon(date).subscribe(semine => this.initialData(semine));
  }

  initialData(semine) {
    console.log(semine);
    var appo = [];
    var pID = 0;
    var maxId = semine.length - 1;
    var entered = 0;
    var parent = [];
    var pComp;
    for (var i = 1; i < 7; i++) {
      if (semine.length == 0)
        pComp = i;
      else
        pComp = i;
        semine[pID - i + 1].appezzamento
      if (!entered) {
        appo[pID] = {
          'pID': pID + 1,
          'pName': 'Appezzamento n°' + i,
          'pStart': '',
          'pEnd': '',
          'pClass': 'ggroupblack',
          'pLink': '',
          'pMile': 0,
          'pGroup': 1,
          'pParent': 0,
          'pOpen': 0,
          'pDepend': '',
          'pCaption': '',
          'pNotes': 'Cliccando sul + a fianco potrete vedere tutte le pianificazioni di un seme riferite al periodo selezionato per questo appezzamento'
        }
      } else {
        appo[pID + 1] = {
          'pID': pID + 2,
          'pName': 'Appezzamento n°' + i,
          'pStart': '',
          'pEnd': '',
          'pClass': 'ggroupblack',
          'pLink': '',
          'pMile': 0,
          'pGroup': 1,
          'pParent': 0,
          'pOpen': 0,
          'pDepend': '',
          'pCaption': '',
          'pNotes': 'Cliccando sul + a fianco potrete vedere tutte le pianificazioni di un seme riferite al periodo selezionato per questo appezzamento'
        }
      }
      parent[i - 1] = pID;
      pID++;
      maxId++;
      if (semine.length > 0) {
        while ((i == semine[pID - i].appezzamento && pID < maxId) || (i == semine[pID - i].appezzamento && entered == 0)) {
          var dateAppo = new Date(semine[pID - i].inizio);
          var date1 = dateAppo.getFullYear() + '-';
          if (dateAppo.getMonth() < 9) {
            date1 += '0';
          }
          date1 += (dateAppo.getMonth() + 1) + '-';
          if (dateAppo.getDate() < 10) {
            date1 += '0';
          }
          date1 += dateAppo.getDate();
          var dateAppo = new Date(semine[pID - i].fine);
          var date2 = dateAppo.getFullYear() + '-';
          if (dateAppo.getMonth() < 9) {
            date2 += '0';
          }
          date2 += (dateAppo.getMonth() + 1) + '-';
          if (dateAppo.getDate() < 10) {
            date2 += '0';
          }
          date2 += dateAppo.getDate();
          console.log('entro');
          appo[pID] = {
            'pID': pID + 1,
            'pName': 'Semina di: ' + semine[pID - i].seme,
            'pStart': date1,
            'pEnd': date2,
            'pClass': 'gtaskpurple',
            'pLink': '',
            'pMile': 0,
            'pGroup': 0,
            'pParent': parent[(semine[pID - i].appezzamento - 1)] + 1,
            'pOpen': 1,
            'pDepend': '',
            'pCaption': '',
            'pNotes': ''
          }
          if (pID < maxId) {
            pID++;
          } else {
            entered = 1;
          }
        }
      }
    }

    console.log(appo);
    this.data = appo;
  }
}