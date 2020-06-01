import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoolDataService } from '../services/shool-data.service';
import { SchoolModal, AddOrEditSchoolModal } from '../DataModals/ShoolModal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NewSchoolDialogComponent } from '../components/new-school-dialog/new-school-dialog.component';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-school-data',
  templateUrl: './school-data.component.html',
  styleUrls: ['./school-data.component.css'],
})
export class SchoolDataComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'id',
    'name',
    'street',
    'suburb',
    'postcode',
    'state',
    'student_count',
    'actions',
  ];
  // store all schools
  schoolCollection: SchoolModal[];

  // reusble modal object
  school: SchoolModal;

  // Datashource for the school table
  dataSource = new MatTableDataSource<SchoolModal>(this.schoolCollection);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataService: ShoolDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // set up pagination for the mat-table component
    this.dataSource.paginator = this.paginator;
    this.LoadSchools();
  }

  // Shows a model popup to  create a new shool. then process the API call and notifies the UI.
  openNewSchoolDialog(): void {
    const dialogConfig = new MatDialogConfig<AddOrEditSchoolModal>();

    const currentData = {} as AddOrEditSchoolModal;
    currentData.name = '';
    currentData.postcode = '';
    currentData.state = '';
    currentData.street = '';
    currentData.student_count = 0;
    currentData.suburb = '';
    currentData.title = 'Create New School';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'formFieldWidth400';
    dialogConfig.data = currentData;

    const dialogRef = this.dialog.open(NewSchoolDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {

        this.school = {} as SchoolModal;
        this.school.name = data.name;
        this.school.postcode = data.postcode;
        this.school.state = data.state;
        this.school.street = data.street;
        this.school.student_count = data.student_count;
        this.school.suburb = data.suburb;

        // let's call the api and try to create the school entry
        this.dataService.CreateSchool(this.school).subscribe(
          (resp: any[]) => {
           // Ok
            this.ShowSnackBar('School has been added', 'OK');
            this.LoadSchools();
          },
          (error) => {
            // notify the user about the error
            this.ShowSnackBar(
              'Error-' + error.error.details[0].message,
              'DISMISS',
              true
            );
          }
        );
      } else {
        console.log('Exit without saving');
      }
    });
  }

  // Shows a model popup to  Edit a given shool. then process the API call and notifies the UI.
  openEditSchoolDialog(element: SchoolModal): void {
    const dialogConfig = new MatDialogConfig<AddOrEditSchoolModal>();

    const currentData = {} as AddOrEditSchoolModal;
    currentData.name = element.name;
    currentData.postcode = element.postcode;
    currentData.state = element.postcode;
    currentData.street = element.street;
    currentData.student_count = element.student_count;
    currentData.suburb = element.suburb;
    currentData.title = 'Update School';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'formFieldWidth400';
    dialogConfig.data = currentData;

    const dialogRef = this.dialog.open(NewSchoolDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.school = {} as SchoolModal;
        this.school.id = element.id;
        this.school.name = data.name;
        this.school.postcode = data.postcode;
        this.school.state = data.state;
        this.school.street = data.street;
        this.school.student_count = data.student_count;
        this.school.suburb = data.suburb;

        this.dataService.UpdateSchool(this.school).subscribe(
          (resp: any[]) => {
            this.ShowSnackBar('School has been updated', 'OK');
            // refresh active school list
            this.LoadSchools();
          },
          (error) => {
             // notify the user about the error
             this.ShowSnackBar(
              'Error-' + error.error.details[0].message,
              'DISMISS',
              true
            );
          }
        );
      } else {
        // handles the "user exit dialog without saving" event
        // let's do nothing about it for the moment.
      }
    });
  }

  // Delete  a school
  openDeleteSchoolDialog(element: SchoolModal): void {
    const message = 'Are you sure you want to delete ' + element.name + ' ?';

    const dialogData = new ConfirmDialogModel(
      'Please confirm your action',
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      const result = dialogResult;

      // check if the user has confirmed that he wants to remove the entry.
      if (result) {
        this.dataService.DeleteSchool(element.id).subscribe(
          (resp: any[]) => {
            console.log(resp);
            this.ShowSnackBar('School has been deleted', 'OK');
            this.LoadSchools();
          },
          (error) => {
            this.ShowSnackBar(
              'Error occured while deleting school',
              'DISMISS',
              true
            );
          }
        );
      }
    });
  }

  // Filter text change event handler for the search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Get all active schools from API
  LoadSchools() {
    // call the api service and fetch all active schools.
    this.dataService.GetAllSchools().subscribe((data: any[]) => {
      this.schoolCollection = data;

      // setup datasource
      this.dataSource = new MatTableDataSource<SchoolModal>(
        this.schoolCollection
      );
      // wire-up paginator
      this.dataSource.paginator = this.paginator;
    });
  }

  // Shows a given magessage
  ShowSnackBar(message: string, action: string, isError: boolean = false) {
    // make it green by default
    let cssClass = 'green-snackbar';
    if (isError) {
      // let's show an error with a red colour background
      cssClass = 'red-snackbar';
    }
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [cssClass],
    });
  }
}
