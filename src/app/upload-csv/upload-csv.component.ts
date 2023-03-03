import { Component } from '@angular/core';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload-csv.component.html'
})
export class UploadCsvComponent {
  file: File | null = null;
  myJson: any[] = [];
  constructor(private requestService: RequestService) { }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  async onUpload() {
    if (this.file) {
      try {

        const response = await this.requestService.uploadFile(this.file).toPromise()
        console.log(response.body.registrosImportados)
        // this.requestService.uploadFile(this.file).subscribe(
          //   event => {
            //     console.log(event)
                this.myJson = response.body.registrosImportados;
            //   },
            //   error => {
              //     console.log(error);
              //   }
              // );
            } catch (error) {

            }
    }
  }

  downloadCsvModel(){
    this.requestService.downloadModelCsv()
  }
}
