import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Trainer } from '../../../model/trainer';
import { Skill } from '../../../model/skill';
import { TrainerService } from '../../../services/trainer/trainer.service';

@Component({
  selector: 'app-trainers-add',
  templateUrl: './trainers-add.component.html',
  styleUrls: ['./trainers-add.component.css']
})
export class TrainersAddComponent implements OnInit {
  Skillz: Skill[] = [
    {
      skillId: 1,
      name: 'Java',
      active: true
    }
  ];

  trainer: Trainer = {
    trainerId: 0,
    firstName: '',
    lastName: '',
    skills: this.Skillz,
    certifications: '',
    active: true,
    resume: ''
  };

  data = {
    trainer: this.trainer
  };

  constructor(
    public dialogRef: MatDialogRef<TrainersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public dataP: any,
    private trainerService: TrainerService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.trainerService.create(this.trainer).subscribe();
    console.log(this.trainer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
