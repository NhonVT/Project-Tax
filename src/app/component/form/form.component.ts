import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { KeyValueViewModel } from '../../models/common-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})

export class FormComponent implements OnInit {

  isShowSelectDay = false;
  isShowSelectMonth = false;
  isShowSelectYear = false;
  isShowError = true;
  dayArr: KeyValueViewModel[] = [];
  monthArr: KeyValueViewModel[] = [];
  yearArr: KeyValueViewModel[] = [];
  selectedDay: KeyValueViewModel;
  selectedMonth: KeyValueViewModel;
  selectedYear: KeyValueViewModel;
  constructor() {
  }

  ngOnInit() {
    // Day
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        this.dayArr.push(new KeyValueViewModel(i, '0' + i));
      } else {
        this.dayArr.push(new KeyValueViewModel(i, '' + i));
      }
    }
    this.selectedDay = new KeyValueViewModel(0, 'Ngày*');

    // Month
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        this.monthArr.push(new KeyValueViewModel(i, '0' + i));
      } else {
        this.monthArr.push(new KeyValueViewModel(i, '' + i));
      }
    }
    this.selectedMonth = new KeyValueViewModel(0, 'Tháng*');

    // Year
    for (let i = 2015; i >= 1920; i--) {
      this.yearArr.push(new KeyValueViewModel(i, '' + i));
    }
    this.selectedYear = new KeyValueViewModel(0, 'Năm*');
  }

  showSelectBox(id) {
    switch (id) {
      case 'selectDay':
        this.isShowSelectDay = !this.isShowSelectDay;
        this.isShowError = false;
        this.isShowSelectMonth = false;
        this.isShowSelectYear = false;
        break;
      case 'selectMonth':
        this.isShowSelectMonth = !this.isShowSelectMonth;
        this.isShowError = false;
        this.isShowSelectDay = false;
        this.isShowSelectYear = false;
        break;
      case 'selectYear':
        this.isShowSelectYear = !this.isShowSelectYear;
        this.isShowError = false;
        this.isShowSelectDay = false;
        this.isShowSelectMonth = false;
        break;
      default:
        break;
    }
  }

  selectDay(dayId: number, idHeader: string) {
    if (dayId !== this.selectedDay.Key) {
      this.selectedDay = this.dayArr.filter(x => x.Key === dayId)[0];
      this.isShowSelectDay = false;
    }
  }

  selectMonth(monthId: number, idHeader: string) {
    if (monthId !== this.selectedMonth.Key) {
      this.selectedMonth = this.monthArr.filter(x => x.Key === monthId)[0];
      this.isShowSelectMonth = false;
    }
  }

  selectYear(yearId: number, idHeader: string) {
    if (yearId !== this.selectedYear.Key) {
      this.selectedYear = this.yearArr.filter(x => x.Key === yearId)[0];
      this.isShowSelectYear = false;
    }
  }

  focusInput(id) {
    switch (id) {
      case 'fs_txt_username':
        this.isShowError = false;
        break;
    }
  }

  @HostListener('click', ['$event.target'])
  clickout(element) {
    if (!element.classList.contains('fs-select-header')) {
      if (this.isShowSelectDay === true) {
        this.isShowSelectDay = false;
      } else if (this.isShowSelectMonth === true) {
        this.isShowSelectMonth = false;
      } else if (this.isShowSelectYear === true) {
        this.isShowSelectYear = false;
      }
    }
  }


}
