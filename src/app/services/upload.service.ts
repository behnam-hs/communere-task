import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = () => reject(fileReader.error);
    });
  }
  
  async resizeDataURL(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      var img = document.createElement('img');
  
      img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d')!;
  
        canvas.width = 80;
        canvas.height = 80;
  
        ctx.drawImage(img, 0, 0, 80, 80);
  
        resolve(canvas.toDataURL());
      };
  
      img.src = data;
    });
  }
}
