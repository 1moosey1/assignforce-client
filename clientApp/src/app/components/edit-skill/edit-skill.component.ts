import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Skill } from '../../model/Skill';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skill: Skill;

  constructor(
    private dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Skill,
    private skillControllerService: SkillControllerService
  ) {}

  ngOnInit() {
    this.newSkill();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  newSkill(): void {
    this.skill = new Skill(0, '', true);
  }

  editSkill(): void {
    console.log('We are Editing a skill ' + this.data.name);
    this.skillControllerService.updateSkillCaliber(this.skill);
    this.newSkill();
    this.closeDialog();
  }
}
