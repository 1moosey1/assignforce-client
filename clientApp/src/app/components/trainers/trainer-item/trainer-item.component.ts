import { Component, OnInit, Input } from '@angular/core';
import { Trainer } from '../../../model/Trainer';

@Component({
  selector: 'app-trainer-item',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.css']
})
export class TrainerItemComponent implements OnInit {
  @Input() trainer: Trainer = new Trainer(0, '', '', [], [], null, '', []);
  isManager: boolean;

  constructor() {}

  ngOnInit() {
    this.isManager = true;
  }

  removeTrainer(trainer: Trainer) {
    trainer.active = false;
  }

  activateTrainer(trainer: Trainer) {
    trainer.active = true;
  }
}
