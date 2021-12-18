import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/model/advertisement/advertisement.model';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  @Input()
  advertisements!: Advertisement[];

  constructor() {}

  ngOnInit(): void {}
}
