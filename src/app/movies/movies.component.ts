import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
// import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpService } from '../services/http-service/http-service.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    HttpService
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {

  movies:any =null
  page:number=1

  constructor(
    public httpService: HttpService
   ) { }
 
   ngOnInit(): void {
     this.httpService.getServiceData(`https://api.themoviedb.org/3/movie/popular?api_key=219ae9c1f26dc420ddfece3dc15f7428&page=${this.page}&adult=false`).subscribe((data: any) => {
       this.movies= data.results.filter((item:any, index:any) =>  data.results.indexOf(item) === index);
     });
 
   }

}
