import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subject } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { UploadService } from 'src/app/services/upload.service';
import { DataStoreService } from '../../services/data-store.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  addLocationForm!: FormGroup;
  isMapOpen = false;
  successfullyAdded = false;
  successfullyEdited = false;
  location: Location = {
    id: 0,
    name: '',
    type: 'store',
    location: [0, 0],
    image: { name: '', base64: '' }
  };
  
  itemInEditId?: number = 0;

  constructor(private ds: DataStoreService, 
              private us: UploadService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }
              
  ngOnInit(): void {
    this.addLocationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      onMap: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      logo: new FormControl('')
    });


    this.activatedRoute.params.subscribe( params => {
      this.itemInEditId = Number(params['id']) || undefined;
      this.setupForm();      
    });
  }

  get name() { return this.addLocationForm?.get('name') }
  get onMap() { return this.addLocationForm?.get('onMap') }
  get type() { return this.addLocationForm?.get('type') }
  get logo() { return this.addLocationForm?.get('logo') }

  async parseFile(e: any) {
    this.location.image.name = e.target.files[0].name;
    let original = await this.us.toBase64(e.target.files[0]);
    this.location.image.base64 = await this.us.resizeDataURL(original);
  }

  mapOpened() {
    this.isMapOpen = true;
  }

  onEdit(id: number) {
    this.router.navigate([`/locations/${id}/edit`]);
    // this.setupForm();
  }

  clearForm() {
    this.addLocationForm.reset();
  }
  
  setupForm() { // if user was on EditMode we execute this function
    if(this.itemInEditId) {
      
      const foundItem = this.ds.allLocations.find(item => item.id === this.itemInEditId);
      
      this.addLocationForm.get('name')?.setValue(foundItem?.name);
      this.addLocationForm.get('onMap')?.setValue(foundItem?.location);
      this.addLocationForm.get('type')?.setValue(foundItem?.type);
      this.addLocationForm.get('logo')?.setValue(foundItem?.image);
      this.location = foundItem!;
    }
  }

  setMarker(currentPosition: number[]) {
    this.location!.location = currentPosition;
    this.addLocationForm.get('onMap')?.setValue(this.location.location)
  }

  onSubmit(form: any) {
    const data: Omit<Location, 'id'> = {
      name: form.value.name,
      location: form.value.onMap,
      type: form.value.type,
      image: {
        name: this.location?.image.name!,
        base64: this.location?.image.base64!
      }
    };

    if(this.itemInEditId) {
      this.successfullyEdited = true;
      setTimeout(() => {
        this.successfullyEdited = false;
      }, 4000); 
      this.ds.update(data, this.itemInEditId)
    } else {
      this.ds.create(data);
      this.successfullyAdded = true;
      setTimeout(() => {
        this.successfullyAdded = false;
      }, 4000); 
      this.location.image.name = '';
      this.location.image.base64 = '';
      this.clearForm();
    }
  }

}
