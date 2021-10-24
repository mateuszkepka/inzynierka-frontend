import { Component, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Component({
  selector: `app-tournament-ladder`,
  templateUrl: `./tournament-ladder.component.html`,
  styleUrls: [`./tournament-ladder.component.scss`]
})
export class TournamentLadderComponent implements OnInit {
  nodesData: TreeNode[];

  constructor() { }

  ngOnInit(): void {
    this.nodesData = [{
      label: `F.C Barcelona`,
      expanded: true,
      children: [
          {
              label: `F.C Barcelona`,
              expanded: true,
              children: [
                  {
                      label: `Chelsea FC`
                  },
                  {
                      label: `F.C. Barcelona`
                  }
              ]
          },
          {
              label: `Real Madrid`,
              expanded: true,
              children: [
                  {
                      label: `Bayern Munich`
                  },
                  {
                      label: `Real Madrid`
                  }
              ]
          }
      ]
  }];
  }

}
