import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

interface option {
  label: string;
  value: string | null;
}

@Component({
  selector: 'ng-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements AfterViewInit, OnInit {
  name = 'Angular';

  @Output() change: EventEmitter<option> = new EventEmitter();
  @Input() value: string = '';
  @Input() uniqueId: string = '';

  private optionMenu: HTMLDivElement = document.querySelector(
    '.select-menu'
  ) as HTMLDivElement;
  private selectBtn: HTMLDivElement = document.querySelector(
    '.select-btn'
  ) as HTMLDivElement;
  private options: any = document.querySelectorAll('.option');
  private sbtn_text: HTMLSpanElement = document.querySelector(
    '.sBtn-text'
  ) as HTMLSpanElement;
  private allOptionMenu: any = document.querySelectorAll('.select-menu');

  constructor() {}

  ngOnInit() {
    // console.log(this.uniqueId + ' .select-menu');
  }

  ngAfterViewInit() {
    this.optionMenu = document.querySelector(
      '#' + this.uniqueId + ' .select-menu'
    ) as HTMLDivElement;

    this.selectBtn = document.querySelector(
      '#' + this.uniqueId + ' .select-btn'
    ) as HTMLDivElement;
    (this.options = document.querySelectorAll(
      '#' + this.uniqueId + ' .option'
    )),
      (this.sbtn_text = document.querySelector(
        '#' + this.uniqueId + ' .sBtn-text'
      ) as HTMLSpanElement);

    this.allOptionMenu = document.querySelectorAll('.select-menu');

    //prepare dropdown event
    this.selectBtn?.addEventListener('click', () => {
      this.toggleSelectDropDown();
      this.closeRestSelectDropDown();
    });

    //prepare click event for individual options
    this.options.forEach((option: any) => {
      option.addEventListener('click', () => {
        this.onSelectItem(option);
      });
    });

    //exhibiting default behaviour of select element
    window.addEventListener('click', (data: any) => {
      data.preventDefault();
      if (data.target instanceof HTMLHtmlElement) {
        this.closeSelectDropDown(this.optionMenu);
      }
    });
  }

  toggleSelectDropDown() {
    this.optionMenu?.classList.toggle('active');
  }

  closeSelectDropDown(ele: HTMLElement) {
    ele?.classList.remove('active');
  }

  closeRestSelectDropDown() {
    for (let p = 0; p < this.allOptionMenu.length; p++) {
      if (this.allOptionMenu[p] != this.optionMenu) {
        this.closeSelectDropDown(this.allOptionMenu[p]);
      }
    }
  }

  onSelectItem(option: any) {
    let selectedOption = (
      option.querySelector('.option-text') as HTMLSpanElement
    ).innerHTML;
    this.sbtn_text.innerHTML = selectedOption;
    this.toggleSelectDropDown();
    this.change.emit({
      label: selectedOption,
      value: (
        option.querySelector('.option-text') as HTMLSpanElement
      ).getAttribute('data-value'),
    });
  }

  setValue() {}
}
