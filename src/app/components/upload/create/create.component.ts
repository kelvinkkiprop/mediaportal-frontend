// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
// import { UploadService } from '../../services/upload.service';
import { lastValueFrom } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { UploadService } from '../../../services/upload.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  // imports: [],
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {


  selectedFile: any | null = null;
  title:any = '';
  description = '';
  progress = 0;
  isDragging = false;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  @HostListener('dragover', ['$event']) onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) { e.preventDefault(); this.isDragging = false; }
  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files.length) {
      this.selectedFile = e.dataTransfer.files[0];
    }
  }

  async upload() {
    if (!this.selectedFile) return;

    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(this.selectedFile.size / chunkSize);

    const initRes = await lastValueFrom(this.uploadService.initUpload(this.selectedFile.name, this.title));
    const uploadId = initRes.uploadId;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, this.selectedFile.size);
      const chunk = this.selectedFile.slice(start, end);

      await lastValueFrom(this.uploadService.uploadChunk(uploadId, i, chunk).pipe(
        // update progress during chunk transfer
      ));

      this.progress = Math.round(((i + 1) / totalChunks) * 100);
    }

    await lastValueFrom(this.uploadService.completeUpload(uploadId, totalChunks, this.title, this.description));
    alert('Upload complete!');
  }

}
