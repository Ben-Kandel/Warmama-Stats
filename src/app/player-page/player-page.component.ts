import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AdvancedPlayerPreview, FullPlayer, Gametype, Stats } from '../interfaces';
import { ChartDataSets } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

let chartLegendToggles = {
  RL: true,
  LG: false,
  EB: false,
  GL: true,
  MG: true,
  PG: true,
  RG: true,
}

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {

  playerColoredName: string;
  playerData: FullPlayer;
  playerData2: AdvancedPlayerPreview;
  weaponData: Stats;

  selectedGametype = 'all'; // by default, 'all' is selected
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  lineChartData: ChartDataSets[];
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      onClick: this.legendClicked,
      labels: {
        fontSize: 16,
        fontColor: 'rgb(201, 206, 189)',
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
    },
    tooltips: {
      // backgroundColor: 'rgb(225, 232, 245)',
      callbacks: {  
        label: function(toolTip, data) {
          let datasetIndex = toolTip.datasetIndex;
          let indexInto = toolTip.index;
          let shots_hit = data.datasets[datasetIndex].data[indexInto].shots_hit;
          let shots_fired = data.datasets[datasetIndex].data[indexInto].shots_fired;
          let game_id = data.datasets[datasetIndex].data[indexInto].game_id;
          return `Accuracy: ${toolTip.yLabel}% (${shots_hit} / ${shots_fired}, game_id: ${game_id}))`;
        },
        // labelTextColor: function(context) {
        //   return 'black';
        // }
      }
    }
  };

  WEAPON_NAMES = ['RL', 'LG', 'EB', 'GL', 'MG', 'RG', 'PG'];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  legendClicked(e, legendItem) {
    let index = legendItem.datasetIndex;
    // @ts-expect-error because chartjs is stupid
    let meta = this.chart.getDatasetMeta(index);
    meta.hidden = !chartLegendToggles[legendItem.text];
    chartLegendToggles[legendItem.text] = meta.hidden;
    this.chart.update();    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerChanged(params);
    });
    this.route.queryParams.subscribe(queryParams => {
      this.gametypeChanged(queryParams);
    });
  }

  playerChanged(params) {
    this.playerColoredName = params.playerName;
    this.fetchPlayerData();
  }

  gametypeChanged(params) {
    this.selectedGametype = (params.gametype) ? params.gametype : 'all';
    this.fetchWeaponData();
  }

  async fetchPlayerData() {
    this.playerData = await this.api.getFullPlayer(this.playerColoredName);
    let total = this.playerData.gametypes.reduce((a, b) => {
      return {
        name: 'all',
        count: a.count + b.count,
      }
    });
    this.playerData.gametypes.unshift(total); // add it to the beginning of the array
    this.playerData2 = await this.api.getPlayerInfo(this.playerColoredName);
  }

  async fetchWeaponData() {
    if(this.selectedGametype == 'all') {
      this.weaponData = await this.api.getWeaponStats(this.playerColoredName);
    }else {
      this.weaponData = await this.api.getWeaponStats(this.playerColoredName, this.selectedGametype);
    }
    this.setUpChart();
  }

  setUpChart() {
    let testData = {
      RL: [],
      LG: [],
      EB: [],
      GL: [],
      MG: [],
      PG: [],
      RG: [],
    }

    let game_counter = this.weaponData.weapon_stats.length;
    this.weaponData.weapon_stats.forEach(stats => {
      stats.weapons.forEach(weapon => {
        let accuracy = (weapon.shots_hit / weapon.shots_fired * 100).toFixed(2);
        if(this.WEAPON_NAMES.includes(weapon.name)) {
          testData[weapon.name].push({
            x: game_counter,
            y: accuracy,
            shots_hit: weapon.shots_hit,
            shots_fired: weapon.shots_fired,
            game_id: stats.game_id,
          });
        }
      });
      game_counter--;
    });
    
    this.lineChartData = [
      {
        label: 'RL',
        data: testData.RL,
        fill: false,
        borderColor: 'rgb(227, 60, 9)',
        pointBackgroundColor: 'rgb(227, 60, 9)',
        lineTension: 0.1,
        hidden: chartLegendToggles.RL,
        pointHitRadius: 20,
      },
      {
        label: 'LG',
        data: testData.LG,
        fill: false,
        borderColor: 'rgb(255, 255, 176)',
        pointBackgroundColor: 'rgb(255, 255, 176)',
        lineTension: 0.1,
        hidden: chartLegendToggles.LG,
        pointHitRadius: 20,
      },
      {
        label: 'EB',
        data: testData.EB,
        fill: false,
        borderColor: 'rgb(9, 237, 230)',
        pointBackgroundColor: 'rgb(9, 237, 230)',
        lineTension: 0.1,
        hidden: chartLegendToggles.EB,
        pointHitRadius: 20,
      },
      {
        label: 'GL',
        data: testData.GL,
        fill: false,
        borderColor: 'rgb(109, 134, 207)',
        pointBackgroundColor: 'rgb(109, 134, 207)',
        lineTension: 0.1,
        hidden: chartLegendToggles.GL,
        pointHitRadius: 20,
      },
      {
        label: 'MG',
        data: testData.MG,
        fill: false,
        borderColor: 'rgb(123, 127, 138)',
        pointBackgroundColor: 'rgb(123, 127, 138)',
        lineTension: 0.1,
        hidden: chartLegendToggles.MG,
        pointHitRadius: 20,
      },
      {
        label: 'PG',
        data: testData.PG,
        fill: false,
        borderColor: 'rgb(17, 221, 17)',
        pointBackgroundColor: 'rgb(17, 221, 17)',
        lineTension: 0.1,
        hidden: chartLegendToggles.PG,
        pointHitRadius: 20,
      },
      {
        label: 'RG',
        data: testData.RG,
        fill: false,
        borderColor: 'rgb(255, 153, 0)',
        pointBackgroundColor: 'rgb(255, 153, 0)',
        lineTension: 0.1,
        hidden: chartLegendToggles.RG,
        pointHitRadius: 20,
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
