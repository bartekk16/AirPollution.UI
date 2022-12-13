import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weather } from '../models/Weather';

@Component({
  selector: 'app-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  progress: number = 0;
  message: string= " ";
  enterCity: boolean = false;
  @Input() airPollutionArray: Array<Weather> | undefined;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:7013/api/Files', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Wczytywanie zakończone.';
          this.enterCity = true;
          this.onUploadFinished.emit();
          this.airPollutionArray = new Array<Weather>();
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

}
