import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
// import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http-service/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartComponent } from '../components/chart/chart.component';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        FooterComponent,
        NgbAccordionModule,
        ChartComponent
    ],
    providers: [
        HttpService
    ],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {

    movies: any = null
    page: number = 1
    total: number = 0
    chartVals: any = []
    chartData: any = [
        { "date": "2024-11-07", "value": 1 }, { "date": "2024-07-31", "value": 1 }, { "date": "2024-09-08", "value": 1 }, 
        { "date": "2024-10-14", "value": 1 }, { "date": "2023-06-08", "value": 1 }, { "date": "2024-09-07", "value": 1 }, 
        { "date": "2024-07-24", "value": 1 }, { "date": "2024-10-09", "value": 1 }, { "date": "2024-11-27", "value": 1 }
    ];

    constructor(
        private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getMovies()

    }

    getMovies() {
        this.httpService.getServiceData(`https://api.themoviedb.org/3/movie/popular?api_key=219ae9c1f26dc420ddfece3dc15f7428&page=${this.page}&adult=false&language=en-US&sort_by=popularity.desc`).subscribe((data: any) => {
            this.movies = data.results.filter((item: any, index: any) => data.results.indexOf(item) === index);
            this.total = data.total_pages
            let dateList = new Set()
            this.movies.map((movie: any) => {
                dateList.add(movie.release_date.toString())
            })
            this.chartData = []

            dateList.forEach((date) => {
                this.chartVals.push({
                    date: date,
                    value: this.movies.filter((res: any) => res.release_date === date).length,
                    opacity: 10
                })
            })

            this.chartData = [...this.chartVals]


          

        });
    }

    openPage(movie: any) {
        this.router.navigate(['/movie', movie.id])

    }

    setPrev() {
        if (this.page >= 2) {
            this.page--
            this.getMovies()
        }

    }

    setNext() {
        if (this.page < this.total) {
            this.page++
            this.getMovies()
        }


    }

}
