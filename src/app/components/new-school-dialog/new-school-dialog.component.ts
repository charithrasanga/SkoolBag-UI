import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddOrEditSchoolModal } from 'src/app/DataModals/ShoolModal';

@Component({
  selector: 'app-new-school-dialog',
  templateUrl: './new-school-dialog.component.html',
  styleUrls: ['./new-school-dialog.component.css']
})
export class NewSchoolDialogComponent implements OnInit {

    form: FormGroup;

    title: string;
    name: string;
    public street: string;
    suburb: string;
    postcode: string;
    state: string;
    student_count: number;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<NewSchoolDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddOrEditSchoolModal) {

        this.title = data.title;
        this.name = data.name;
        this.street = data.street;
        this.suburb = data.suburb;
        this.postcode = data.postcode;
        this.state = data.state;
        this.student_count = data.student_count;

    }

    ngOnInit() {
        this.form = this.fb.group({
          name: [this.name, []],
          street: [this.street, []],
          suburb: [this.suburb, []],
          state: [this.state, []],
          postcode: [this.postcode, []],
          student_count: [this.student_count, []],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
