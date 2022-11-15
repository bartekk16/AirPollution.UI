import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  test: number = 2;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getInt();
  }

  getInt(){
    this.homeService.getInt().subscribe({
      next: (data)=>{
        this.test = data;
      },
      error: (response) =>{
        console.log(response);
      }
    }
    )
  }

  postInt(): void {
    this.homeService.postInt(5).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }

}
