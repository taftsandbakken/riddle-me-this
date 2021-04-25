import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RiddleService } from './riddle.service';
import { RiddleDataType, RiddleType, Riddle } from '../types/riddle';

export enum PageState {
  Loading = 'Loading',
  Ready = 'Ready',
  Error = 'Error'
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  // Make enums into public params for html to use
  RiddleType = RiddleType;
  RiddleDataType = RiddleDataType;
  PageState = PageState;

  pageState = PageState.Loading;
  riddleList: Riddle[] = [];
  riddleTypeSelected: RiddleType = RiddleType.All;
  riddleTypeSelectedForAdd: RiddleType = RiddleType.Logic;
  selectedFile: File;
  isAddRiddleLoading = false;
  searchInput = '';

  public readonly VALID_FILE_TYPES = 'image/png, image/jpeg, image/jpg, video/mp4';
  private readonly VALID_VIDEO_TYPES = [ 'video/mp4' ];
  private readonly debug = true;

  constructor(
    private riddleService: RiddleService) {}

  // Get and sort riddles
  ngOnInit() {
    this.riddleService.getRiddles().then(result => {
      this.riddleList = result;
      this.pageState = PageState.Ready;
    })
    .catch(e => {
      this.log('Error fetching riddles', e);
      this.pageState = PageState.Error;
    });
  }

  // Add and upload the new riddle
  addRiddle(modal, form: HTMLFormElement) {
    this.isAddRiddleLoading = true;
    const newRiddle = this.createRiddleObject(form);

    this.riddleService.addRiddle(newRiddle, this.selectedFile).then(() => {
      this.riddleList.push(newRiddle);
      this.selectedFile = null;
      form.reset();
      modal.click();
      this.isAddRiddleLoading = false;
    })
    .catch(e => {
      this.log('error adding riddle', e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
      this.isAddRiddleLoading = false;
    });
  }

  // After confirming, delete the riddle
  deleteRiddle(id: string) {
    Swal.fire({
      title: 'Do you want to delete this riddle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        this.riddleService.deleteRiddle(id).then(() => {
          this.riddleList = this.riddleList.filter(r => r.id !== id);
          Swal.fire(
            'Deleted!',
            'Your riddle has been deleted.',
            'success'
          );
        })
        .catch(e => {
          this.log('Error deleting riddle', e);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
      }
    });
  }

  // Only return riddles of the selected type
  filterRiddles(): Riddle[] {
    return this.riddleList
      .sort((r1, r2) => r1.title > r2.title ? 1 : -1)
      .filter(r => (this.riddleTypeSelected === RiddleType.All || r.type === this.riddleTypeSelected) &&
        this.filterBySearch(r));
  }

  filterBySearch(r: Riddle): boolean {
    const searchText = this.searchInput.trim().toLocaleLowerCase();
    return !this.searchInput ||
      r.author.toLocaleLowerCase().includes(searchText) ||
      r.data.toLocaleLowerCase().includes(searchText) ||
      r.title.toLocaleLowerCase().includes(searchText);
  }

  // Select file from explorer
  onFileSelected(files: any[]) {
    this.selectedFile = !files || files.length === 0 ? null : files[0];
  }

  // Create a new Riddle object
  private createRiddleObject(form: HTMLFormElement): Riddle {
    return {
      id: '' + Math.floor(Math.random() * (10000000 - 100) + 100),
      title: form['riddleTitle'].value,
      author: form['riddleAuthor'].value,
      date: new Date().toLocaleString(),
      type: this.riddleTypeSelectedForAdd,
      data: this.selectedFile ? this.selectedFile.name : form['riddleText'].value,
      dataType: !this.selectedFile ?
        RiddleDataType.Text :
        this.VALID_VIDEO_TYPES.includes(this.selectedFile.type.toLocaleLowerCase()) ?
          RiddleDataType.MP4 :
          RiddleDataType.Img
    };
  }

  // If in debug mode, console log the parameters
  private log(title: string, obj?: any) {
    if (this.debug) {
      console.log(title, obj);
    }
  }
}
