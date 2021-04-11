import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AdvancedPlayerPreview, FullPlayer, Gametype } from '../interfaces';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet, Color} from 'ng2-charts';
import { query } from '@angular/animations';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  playerColoredName: string;
  playerData: FullPlayer;
  playerData2: AdvancedPlayerPreview;

  selectedGametype = 'all'; // by default, 'all' is selected

  lineChartData: ChartDataSets[];
  lineChartOptions = {
    responsive: false,
    elements: {
      point: {
        radius: 3
      }
    },
    scales: {
      xAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Game'
        },
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Accuracy (%)'
        },
        gridLines: {
          color: 'gray'
        },
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }
  }

  WEAPON_NAMES = ['RL', 'LG', 'EB', 'GL', 'MG', 'RG', 'PG'];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paramsChanged(params);
    });
    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams);
      if(queryParams.gametype) {
        this.selectedGametype = queryParams.gametype;
      }
      this.fetchFullPlayer();
    });
  }

  paramsChanged(params) {
    this.playerColoredName = params.playerName;
    console.log(this.playerColoredName);
    this.fetchFullPlayer();
  }

  async fetchFullPlayer() {
    if(this.selectedGametype != 'all') {
      console.log('fetching data for ' + this.selectedGametype);
      this.playerData = await this.api.getFullPlayer(this.playerColoredName, this.selectedGametype);
    }else {
      console.log('fetching data for every gametype');
      this.playerData = await this.api.getFullPlayer(this.playerColoredName);
    }
    
    // sum up the gametypes
    let total = this.playerData.gametypes.reduce((a, b) => {
      return {
        name: 'all',
        count: a.count + b.count,
      }
    });
    this.playerData.gametypes.unshift(total); // add it to the beginning of the array
    console.log(this.playerData);
    this.playerData2 = await this.api.getPlayerInfo(this.playerColoredName);
    this.setUpChart();
  }

  setUpChart() {
    console.log('testing setup of chart');  
    let testData = {
      RL: [],
      LG: [],
      EB: [],
      GL: [],
      MG: [],
      PG: [],
      RG: [],
    }
    let game_counter = this.playerData.games.length;
    this.playerData.games.forEach(game => {
      game.weapon_stats.forEach(weapon => {
        let accuracy = (weapon.shots_hit / weapon.shots_fired * 100).toFixed(2);
        if(this.WEAPON_NAMES.includes(weapon.name)) {
          testData[weapon.name].push({x: game_counter, y: accuracy});
        }
      });
      game_counter--;
    });

    this.lineChartData = [
      {
        label: 'RL',
        data: testData.RL,
        fill: false,
        borderColor: 'red',
        pointBackgroundColor: 'red',
        lineTension: 0.1,
      },
      {
        label: 'LG',
        data: testData.LG,
        fill: false,
        borderColor: 'yellow',
        pointBackgroundColor: 'yellow',
        lineTension: 0.1,
      },
      {
        label: 'EB',
        data: testData.EB,
        fill: false,
        borderColor: 'cyan',
        pointBackgroundColor: 'cyan',
        lineTension: 0.1,
      },
      {
        label: 'GL',
        data: testData.GL,
        fill: false,
        borderColor: 'rgb(8, 8, 214)',
        pointBackgroundColor: 'rgb(8, 8, 214)',
        lineTension: 0.1,
        hidden: true,
      },
      {
        label: 'MG',
        data: testData.MG,
        fill: false,
        borderColor: 'gray',
        pointBackgroundColor: 'gray',
        lineTension: 0.1,
        hidden: true,
      },
      {
        label: 'PG',
        data: testData.PG,
        fill: false,
        borderColor: 'rgb(17, 221, 17)',
        pointBackgroundColor: 'rgb(17, 221, 17)',
        lineTension: 0.1,
        hidden: true,
      },
      {
        label: 'RG',
        data: testData.RG,
        fill: false,
        borderColor: 'rgb(255, 153, 0)',
        pointBackgroundColor: 'rgb(255, 153, 0)',
        lineTension: 0.1,
        hidden: true,
      }
    ]
  }

  selectGametype(g: Gametype) {
    this.selectedGametype = g.name;
    if(this.selectedGametype != 'all') {
      this.router.navigate([],
        {
          queryParams: {gametype: this.selectedGametype}
        }
        );
    }else {
      this.router.navigate([],
        {
          queryParams: {gametype: null}
        }
        );
    }
  }

  
}
