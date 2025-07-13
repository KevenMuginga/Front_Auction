import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { Item, newItem } from '../model/item';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { newUser, User } from '../model/user';
import { NewOffer } from '../model/offer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  
  title = 'front';
  itens: Item[] = [];
  item!:Item;

  newOffer!:NewOffer;

  visibleOffer = false;
  visibleUser = false;
  visibleItem = false;

  selectedItem!: File;

  formOffer = new FormGroup({
    value: new FormControl(0, [Validators.required]),
    pass: new FormControl('', [Validators.required]),
    userId: new FormControl(0, [Validators.required])
  })

  formUser = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  })

  formItem = new FormGroup({
    name: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
    ownerId: new FormControl(0, [Validators.required]),
    untilAt: new FormControl(''),
  })

  errorUser = false;
  errorItem = false;
  errorOffer = false;

  user!: User;
  
  constructor(
    private services: ServicesService, private fBuilder: FormBuilder
  ){}

  ngAfterViewInit(): void {
    this.getItens();

    // this.formOffer = this.fBuilder.group({
    //   value: new FormControl('', [Validators.required]),
    //   pass: new FormControl('', [Validators.required]),
    // })

    // this.formUser = this.fBuilder.group({
    //   userName: new FormControl('', [Validators.required]),
    //   pass: new FormControl('', [Validators.required]),
    // })

    // this.formItem = this.fBuilder.group({
    //   name: new FormControl('', [Validators.required]),
    //   pass: new FormControl('', [Validators.required]),
    //   until: new FormControl('', [Validators.required]),
    // })
  }

  getItens(){
    this.services.getAllItens().subscribe({
      next:(res)=>{
        this.itens = res;
      },
      error:()=>{
        
      }
    })
  }

  verifyDate(item: Date){
    var dateToday = new Date();
    item = new Date(item);
    let anos =item.getFullYear() - dateToday.getFullYear();
    let months =item.getMonth() - dateToday.getMonth();
    let days =item.getDay() - dateToday.getDay();
    let hours =item.getHours() - dateToday.getHours();
    let minutes =item.getMinutes() - dateToday.getMinutes();
    let seconds =item.getSeconds() - dateToday.getSeconds();
    
    if(anos>=1){
      return anos + " years left";
    }else if(months>1 && months<12 ){
      return months + " months left";
    }else if(days<31 && days>1){
      return days + " days left";
    }else if(hours<24 && hours>1){
      return hours + " hours left";
    }else if(minutes < 60 && minutes>1){
      return minutes + " minutes left";
    }else{
      return seconds + " seconds left";
    }
  }

  showModalOffer(item: Item){
    this.visibleOffer = true;
    this.item = item;
  }

  showModalUser(){
    this.visibleUser = true;
  }

  showModalItem(){
    this.visibleItem = true;
  }

  postItem(){
    let item = new FormData();
    let form = this.formItem.value as newItem;
    item.append('name', form.name);
    item.append('pass', form.pass);
    item.append('untilAt', String(form.untilAt));
    item.append('file', this.selectedItem);
    item.append('ownerId', String(form.ownerId));

    this.services.postItem(item).subscribe({
      next:(res)=>{
        this.getItens();
        this.formItem.reset();
      },
      error:()=>{
        this.errorItem = true;
      }
    })
  }

  postUser(){
    let user = this.formUser.value as newUser;

    this.services.postUser(user).subscribe({
      next:(res)=>{
        this.user = res;
        this.formUser.reset();
      },
      error:()=>{
        this.errorUser = true;
      }
    })
  }

  postOffer(){
    let offer = this.formOffer.value as NewOffer

    offer.itemId = this.item.id;

    this.services.postOffer(offer).subscribe({
      next:(res)=>{
        this.item = Object.create(null);
        this.formOffer.reset();
        this.getItens();
      },
      error:()=>{
        this.errorOffer = true;
      }
    })
  }

  selectFile(e:any){
    if(e.target.files.length>0){
      this.selectedItem = e.target.files[0] as File;
    }
  }
}
