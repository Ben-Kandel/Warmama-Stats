import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';

interface Gametype {
  selected: boolean;
  name: string;
};

@Component({
  selector: 'app-gb-form',
  templateUrl: './gb-form.component.html',
  styleUrls: ['./gb-form.component.scss']
})
export class GbFormComponent implements OnInit {

  searchForm = this.formBuilder.group({
    map: '',
    player: '',
    // match: 'exact',
    offset: 0,
  });

  gametypes: Gametype[];
  @Output() searchClicked = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let selectedGt = this.route.snapshot.queryParams.gametype;
    if(selectedGt) {
      this.fetchGametypes(selectedGt);
    }else {
      this.fetchGametypes();
    }
    // let map = this.route.snapshot.queryParams.map;
    // if(map) {
    //   document.getElementById('map').innerText = map;
    // }
  }

  async fetchGametypes(selectedName='') {
    let gts = await this.api.getGametypes();
    let answer: Gametype[] = gts.map((gametype: string) => {
      if(gametype === selectedName) { 
        return { selected: true, name: gametype } 
    }else { 
        return { selected: false, name: gametype } 
      }
    });
    this.gametypes = answer;
  }

  keyPressed(event) {
    if(event.keyCode == 13) { // if they pressed the enter key
      this.onSubmit();
    }
  }

  onSubmit() {
    let x = this.searchForm.value;
    let gametype = this.getSelectedGametype();
    x.gametype = gametype;
    this.searchClicked.emit(x);
  }
  
  getSelectedGametype(): string {
    for(let i = 0; i < this.gametypes.length; i++) {
      if(this.gametypes[i].selected) return this.gametypes[i].name;
    }
    return '';
  }

  toggleChip(gt: Gametype) {
    if(gt.selected) { // if we are clicking on one already selected,
      gt.selected = false; // turn it off
    }else { // otherwise, we need to turn this one on and turn all the others off
      this.gametypes.forEach(c => { gt.name !== c.name ? c.selected = false : c.selected = true; });
    }
  }

}
