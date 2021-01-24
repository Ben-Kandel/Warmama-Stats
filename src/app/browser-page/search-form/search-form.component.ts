import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchForm = this.formBuilder.group({
    gametype: '',
    player: '',
    map: '',
    limit: 10,
    offset: 0,
  });

  @Output() searchClicked = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.searchClicked.emit(this.searchForm.value);
  }

  keyPressed(event) {
    if(event.keyCode == 13) { // if they pressed the enter key
      this.onSubmit();
    }
  }

}
