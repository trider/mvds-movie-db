import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpService } from '../services/http-service/http-service.service';
import { DetailsTableComponent } from "../components/details-table/details-table.component";


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    DetailsTableComponent
],
  providers: [
    HttpService
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  movie:any=null
  pageId: any
  page:number=1
  constructor(
    public httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
   ) { 
    
    this.pageId = this.route.snapshot.paramMap.get('id')?.toString();
   }
 
   ngOnInit(): void {
    this.httpService.getServiceData(`https://api.themoviedb.org/3/movie/${this.pageId}?api_key=219ae9c1f26dc420ddfece3dc15f7428`).subscribe((data: any) => {
      this.movie = data
   })
  }

  



}
